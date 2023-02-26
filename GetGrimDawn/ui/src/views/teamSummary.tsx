import {getDominantBuffs, getDominantDebuffs} from '../calculators/AllCharsBuffs';
import {downloadTeamSummary} from '../helpers/downloadAllChars';
import {Character, OverviewSkill, Skill} from '../types/types';
import {BenefitsAndSkills} from './benefitsAndSkillsView';

type TeamSummaryProps = {
  chars: Character[];
};

export const TeamSummary: React.FC<TeamSummaryProps> = ({chars}) => {
  const buffs = getDominantBuffs(chars);
  const debuffs = getDominantDebuffs(chars);

  function mapSkills(skills: OverviewSkill[] | Skill[], i: number) {
    return skills.map((sk) => {
      return (
        <div key={sk.name + i} style={{marginBottom: '4px'}}>
          {sk.name}
        </div>
      );
    });
  }

  function createCharColumns() {
    return (
      <>
        {chars.map((char, i) => {
          return (
            <div key={'char' + i} className='column textLeft' style={{maxWidth: '24%', minWidth: '20%'}}>
              <br />
              <strong>{char.classNames[0] + ' ' + char.classNames[1]}</strong>
              <br />
              <div>
                <strong>Buffs:</strong>
                {[...buffs]
                  .filter((buff) => buff.charIndex === i)
                  .map((buff) => {
                    return (
                      <div>
                        <div key={buff.name + i} style={{marginBottom: '4px'}}>
                          {buff.name}
                        </div>
                        {/* {buff.children ? mapSkills(buff.children, i) : ''} */}
                      </div>
                    );
                  })}
                <br />
                <strong>Debuffs:</strong>
                {[...debuffs]
                  .filter((debuff) => debuff.charIndex === i)
                  .map((debuff) => {
                    return (
                      <div>
                        <div key={debuff.name + i} style={{marginBottom: '4px'}}>
                          {debuff.name}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          );
        })}
      </>
    );
  }

  return (
    <div>
      <hr />
      <h2>Team Summary</h2>
      <h3>Unique Skills Per Character</h3>
      <p>
        The skills listed per character here are chosen based on which skill is dominant. In the case where two
        characters bring the same skill, then the dominant skill is determined by it's buffed level (or it's parent
        skill's buffed level if it has one). For example, if two characters bring Haven, the version of Haven that
        benefits the team is chosen based on the rank of its parent skill, Presence of Virtue. In the case where a skill
        of equal rank (or equal parent rank), it is arbitrarily assigned to one of the skill-bearing characters.
      </p>
      <div className='row wrap spaceAround fadeInOnLoad'>{createCharColumns()}</div>
      <br />
      <button onClick={() => downloadTeamSummary(chars)}>Download Team Summary Data</button>
      <h2>Combined Team Benefits</h2>
      <BenefitsAndSkills skills={buffs} paragraph={''} debuffsAsWell={debuffs} />
    </div>
  );
};
