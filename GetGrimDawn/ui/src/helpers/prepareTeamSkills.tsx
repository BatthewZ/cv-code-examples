import {Character, Item, Skill, TeamSkills} from '../types/types';
import {convertDetailsToSkillBenefits} from '../skillBenefits/convertDetailsToSkillBenefits';
import {findSkill} from './findSkill';
import {info} from 'console';
import {getDebuffs} from '../calculators/CalcDebuff';

export function prepareTeamSkills(character: Character) {
  const teamSkills: Skill[] = [];
  const healingSkills: Skill[] = [];
  const debuffSkills: Skill[] = [];

  getTeamSkills(character.skills);
  getTeamSkills(character.devotions);
  getTeamSkillsFromItems(character.items);

  function getTeamSkills(skillsArray: Skill[]) {
    // A skill can be both a 'team skill' and a 'healing skill'.
    for (const skill of skillsArray) {
      if (!skill.details) skill.details = '';

      // Prevent "damage to enemies" from being considered "damage buff to allies"
      // from these skills:
      if (skill.name === 'Inquisitor Seal') {
        skill.details = skill.details.split('Rebuke\n')[0];
      }
      if (skill.name === 'Wendigo Totem') {
        skill.details = skill.details.split('Life Tap')[0];
        skill.details = skill.details.replaceAll('Vitality Damage', 'Vitality Dmg');

        // Handle Dark One's set bonus (extra wendigo totem):
        const modifiers = skill.details.split('Item skill modifiers\n')[1];
        if (modifiers) {
          if (modifiers.includes('1 Summon Limit')) {
            skill.details = doubleHealthRestoredValues(skill);
          }
        }
      }
      if (skill.name === `Olexra's Flash Freeze` || skill.name === 'Absolute Zero') {
        skill.details = skill.details.replaceAll('Cold Damage', 'Cold Dmg');
      }

      if (skill.name === 'Hungering Void') skill.details = skill.details.split('\nBonus to All Pets')[0];

      // Handle Bysmiel's Set bonus: Double healing values if there are two familiars.
      if (skill.name === 'Mend Flesh') {
        const summonFamiliar = findSkill('Summon Familiar', character.skills);
        if (summonFamiliar) {
          const modifiers = summonFamiliar.details.split('Item skill modifiers\n')[1];
          if (modifiers) {
            if (modifiers.includes('1 Summon Limit')) {
              skill.details = doubleHealthRestoredValues(skill);
            }
          }
        }
      }

      // Pet auras
      if (skill.name === 'Emboldening Presence') teamSkills.push(skill);
      if (skill.name === 'Hellfire') teamSkills.push(skill);
      if (skill.name === 'Storm Spirit') teamSkills.push(skill);

      // Determine healing skills:
      if (
        skill.details.includes('Meter Radius') &&
        (skill.details.includes('Health Restored') || skill.details.includes('Health Regen'))
      ) {
        healingSkills.push(skill);
        if (skill.children !== undefined && skill.children.length) {
          healingSkills.push(...skill.children);
        }
      }
      // Determine other team buffs:
      if (skill.details.includes('Meter Radius') && isTeamBuff(skill)) {
        teamSkills.push(skill);
        if (skill.children !== undefined && skill.children.length) {
          teamSkills.push(...skill.children);
        }
      }

      // Determine debuffs.
      if (getDebuffs(skill).debuffs.length) {
        debuffSkills.push(skill);
      }

      // Recurse for children
      if (skill.children !== undefined)
        if (skill.children.length) {
          getTeamSkills(skill.children);
        }
    }
  }

  function getTeamSkillsFromItems(itemsArray: Item[]) {
    // ------ Handle Augur Set pt1
    const augurSetIsPresent = {
      gun: false,
      ring: false,
      gloves: false,
      medal: false,
    };

    for (const item of itemsArray) {
      if (!item.name) {
        console.log('Continuing...');
        continue;
      }

      if (!item.name.includes("Apothecary's ")) {
        // For all non-Augur items...
        getTeamSkills(item.grantedSkills ?? []);
      } else {
        // ---- Handle augur set pt2
        switch (item.name) {
          case "Mythical Apothecary's Touch":
            augurSetIsPresent.gloves = true;
            const skill = item.grantedSkills?.find((skill) => skill.name === `Apothecary's Touch`);
            if (skill) {
              getTeamSkills([skill]);
            }
            break;
          case "Mythical Apothecary's Wisdom":
            augurSetIsPresent.ring = true;
            break;
          case "Mythical Apothecary's Injector":
            augurSetIsPresent.gun = true;
            break;
          case "Mythical Apothecary's Sign":
            augurSetIsPresent.medal = true;
            break;
        }
        let setBonusIsActive: boolean = true;
        for (const [key, value] of Object.entries(augurSetIsPresent)) {
          if (!value) setBonusIsActive = false;
        }
        if (setBonusIsActive) {
          getTeamSkills([getApothecarySetBuff()]);
        }
      }
    }
  }

  // ------ Prepare Skill Benefits
  for (const skill of healingSkills) {
    skill.benefits = [...convertDetailsToSkillBenefits(skill.details)];
  }
  for (const skill of teamSkills) {
    skill.benefits = [...convertDetailsToSkillBenefits(skill.details)];
  }

  const allTeamSkills: TeamSkills = {
    teamSkills: teamSkills,
    healingSkills: healingSkills,
    debuffs: debuffSkills,
    allSkills: Array.from(new Set([...teamSkills, ...healingSkills])),
  };

  character.teamSkills = allTeamSkills;
  return character;
}

function isTeamBuff(skill: Skill): boolean {
  if (skill.name === `Olexra's Flash Freeze`) return false;
  if (skill.details.includes('Meter Radius')) {
    const chopInfo = skill.details.split('Meter Radius')[0];
    const infoRows = chopInfo.split('\n');
    const meterRadiusNum = Number(infoRows[infoRows.length - 1].trim());
    return meterRadiusNum > 10;
  }
  return false;
}

function getApothecarySetBuff(): Skill {
  return {
    name: "Empyrion's Touch",
    details: '5 Second Skill Recharge\n12 Meter Radius\n5%+750 Health Restored\n+210 Health Regenerated per second',
    level: 0,
    buffedLevel: 0,
    benefits: [],
    debuffs: [],
  };
}

function doubleHealthRestoredValues(skill: Skill) {
  const infoRows = skill.details.split('\n');
  let details = '';
  for (const row of infoRows) {
    if (row.includes('Health Restored')) {
      // --- Double values in row, examples:

      // "12% + 465 Health Restored"
      // "3% Health Restored"

      const val1 = +row.split('%')[0] * 2 + '%';
      // const val2 = +row.split('% + ')[1].split(' ')[0] * 2;
      const val2 = row.includes('% + ') ? ' + ' + +row.split('% + ')[1].split(' ')[0] * 2 : '';
      details += `${val1}${val2} Health Restored\n`;
    } else details += row + '\n';
  }

  return details.trim();
}
