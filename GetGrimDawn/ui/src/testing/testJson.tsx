export const thing = {
  classes: [
    {
      id: 'sk2124',
      childSkillIds: [],
      parentSkillIds: null,
      name: 'Necromancer',
      level: 50,
      details:
        'Necromancer\nMastery of the cruel fate that awaits all living beings.\n\nCurrent Level : 50\n+200 Physique\n+100 Cunning\n+200 Spirit\n+950 Health\n+950 Energy',
    },
    {
      id: 'sk1180',
      childSkillIds: [],
      parentSkillIds: null,
      name: 'Occultist',
      level: 32,
      details:
        'Occultist\nAn in-depth study on the manipulation and control of the occult.\n\nCurrent Level : 32\n+80 Physique\n+96 Cunning\n+144 Spirit\n+640 Health\n+576 Energy\n\nNext Level : 33\n+83 Physique\n+99 Cunning\n+149 Spirit\n+660 Health\n+594 Energy\n\nNo skill points to add.',
    },
  ],
  attributes: {physique: 794, cunning: 50, spirit: 162},
  skills: [
    {
      id: 'sk2145',
      childSkillIds: ['sk2146'],
      parentSkillIds: null,
      name: 'Spectral Binding',
      level: 6,
      details:
        'Spectral Binding\nBinding spirits is a dangerous practice, but one that can be vastly rewarding with forgotten knowledge or even protection. By forcing the spirits of the fallen to serve, you become infused with their essence, granting you vitality and further control over your necrotic powers. This ability must be toggled to maintain its effect.\n\nCurrent Level : 12\n1.4 Active Energy Cost per Second\n37 Aether Damage\n+85% Aether Damage\n+1175 Health\n+88 Offensive Ability\n80 Energy Reserved',
      children: [
        {
          id: 'sk2146',
          childSkillIds: [],
          parentSkillIds: ['sk2145'],
          name: 'Spectral Wrath',
          level: 10,
          details:
            'Spectral Wrath\nThe spectres empowering you lash out at anything that dares strike you, cursing it with a debilitating spell from beyond the grave.\n\nCurrent Level : 14\n1.1 Second Skill Recharge\n5.4 Second Duration\n4.4 Meter Radius\n68 Vitality Damage\n92 Aether Damage\n-22% Attack Speed\n-29% Physical Resistance\n-29% Vitality Resistance\n-29% Aether Resistance',
          children: [],
          buffedLevel: 14,
          debuffs: [
            {numType: '%', value: -22, benefitType: 'Attack Speed'},
            {numType: '%', value: -29, benefitType: 'Resistance', damageType: 'Physical'},
            {numType: '%', value: -29, benefitType: 'Resistance', damageType: 'Vitality'},
            {numType: '%', value: -29, benefitType: 'Resistance', damageType: 'Aether'},
          ],
        },
      ],
      buffedLevel: 12,
      debuffs: [],
    },
    {
      id: 'sk2131',
      childSkillIds: [],
      parentSkillIds: null,
      name: 'Master of Death',
      level: 12,
      details:
        'Master of Death\nA fully trained Necromancer is a terrifying thing to behold, their arrival heralded by the endless legions of the dead, forever bound to the will of their master. This ability must be toggled to maintain its effect.\nExclusive Skill - Only one Exclusive Skill can be active at any one time.\n\nCurrent Level : 20\n+16% Offensive Ability\n+216 Defensive Ability\n33% Vitality Resistance\n\nBonus to All Pets\n+58% to All Damage\n+100% Acid Damage\n+100% Vitality Damage\n+100% Poison Damage\n58% Physical Damage converted to Vitality Damage\n+14% Offensive Ability\n33% Vitality Resistance',
      children: [],
      buffedLevel: 20,
      debuffs: [],
    },
    {
      id: 'sk2136',
      childSkillIds: [],
      parentSkillIds: null,
      name: 'Reap Spirit',
      level: 16,
      details:
        "Reap Spirit\nOne of the most powerful techniques bestowed upon his followers by Uroboruuk. By ripping apart the very being of a foe, one can not only inflict grievous harm, but also conjure forth a fragment of their soul to serve you. The resulting spirit is unstable and highly aggressive, which makes it all the more useful in battle. The Wraiths scale with Pet Bonuses.\n\nCurrent Level : 24\n216 Energy Cost\n3.5 Second Skill Recharge\n290% Weapon Damage\n893-1108 Aether Damage\n4555 Vitality Decay Damage over 5 Seconds\n+1 Summon\n3 Summon Limit\nLives for 18 Seconds\n\nSundered Wraith Attributes:\nLives for 18 Seconds\n17726 Health\n2737 Energy\n\nSundered Wraith Abilities:\n+303% to All Damage\n+41% Crit Damage\n+138% Health\nIncreases Energy Regeneration by 230%\n\nWraith's Touch\n338 Cold Damage\n262-390 Vitality Damage",
      autoCastSkill: 'Hungering Void',
      children: [],
      buffedLevel: 24,
      debuffs: [],
    },
    {
      id: 'sk2125',
      childSkillIds: [],
      parentSkillIds: null,
      name: 'Call of the Grave',
      level: 10,
      details:
        'Call of the Grave\nCall upon the rot and decay of the grave to fuel your vile magic and throw your undying minions into a vicious frenzy.\n\nCurrent Level : 16\n96 Energy Cost\n24 Second Skill Recharge\n10 Second Duration\n+21% Crit Damage\n+189% Acid Damage\n+189% Vitality Damage\n+189% Poison Damage\n+189% Vitality Decay\n\nItem skill modifiers\n+10% Offensive Ability\n\nBonus to All Pets\n+286% to All Damage\n+34% Crit Damage',
      children: [],
      buffedLevel: 16,
      debuffs: [],
    },
    {
      id: 'sk2144',
      childSkillIds: [],
      parentSkillIds: null,
      name: 'Mark of Torment',
      level: 1,
      details:
        'Mark of Torment\nThough all must ultimately answer to that final fate, your mastery of death has allowed you to delay the inevitable. By linking your soul to a nearby foe, you transfer some of the harm intended for you into them instead. Only one enemy can be Marked at any one time.\n\nCurrent Level : 5\n66 Energy Cost\n20 Second Skill Recharge\n4.4 Second Duration\n43% Damage Absorption\n244% Damage Absorbed Reflected',
      children: [],
      buffedLevel: 5,
      debuffs: [],
    },
    {
      id: 'sk2151',
      childSkillIds: ['sk2152', 'sk2153'],
      parentSkillIds: null,
      name: 'Raise Skeletons',
      level: 16,
      details:
        'Raise Skeletons\nThe art of reanimating skeletal remains is among the first rites of aspiring Necromancers, but also one of the most rudimentary. Through sheer will, a Necromancer may call upon the spirits beyond the veil and draw them into the bones of the deceased. Should the ritual succeed, skeletal minions, loyal only to the summoner, shall rise. Skeletons scale with Pet Bonuses. More powerful minions may be raised with higher skill rank.\n\nCurrent Level : 24\n280 Energy Cost\n18 Second Skill Recharge\n+3 Summon\n3 Summon Limit\nSpawn weight: 20%\n\nItem skill modifiers\n-5 Second Skill Recharge\n+4 Summon\n4 Summon Limit\n-100% Skill Energy Cost\n\nSkeletal Warrior Attributes:\n11158 Health\n2737 Energy\n\nSkeletal Warrior Abilities:\n+303% to All Damage\n+161% Health\nIncreases Energy Regeneration by 230%\n\nAncient Weapons\n100-118 Physical Damage\n40 Vitality Damage',
      autoCastSkill: "Wendigo's Mark",
      children: [
        {
          id: 'sk2152',
          childSkillIds: [],
          parentSkillIds: ['sk2151'],
          name: 'Undead Legion',
          level: 12,
          details:
            'Undead Legion\nMastery of the resurrection ritual reduces the mental strain upon the caster, enabling you to maintain additional minions.\n\nCurrent Level : 22\n-8 Second Skill Recharge\n7 Summon Limit\n-60% Skill Energy Cost',
          children: [],
          buffedLevel: 22,
          debuffs: [],
        },
        {
          id: 'sk2153',
          childSkillIds: [],
          parentSkillIds: ['sk2151'],
          name: 'Will of the Crypt',
          level: 12,
          details:
            'Will of the Crypt\nInfuse your skeletal minions with necrotic energies, strengthening their bones against physical blows.\n\nCurrent Level : 16\n31 Vitality Damage\n+158% Vitality Damage\n+190% Elemental Damage\n62% Vitality Resistance\nIncreases Armor by 138%',
          children: [],
          buffedLevel: 16,
          debuffs: [],
        },
      ],
      buffedLevel: 24,
      debuffs: [],
    },
    {
      id: 'sk2137',
      childSkillIds: ['sk2138', 'sk2139', 'sk2140'],
      parentSkillIds: null,
      name: 'Bone Harvest',
      level: 1,
      details:
        'Bone Harvest\nThrough a force of necrotic energies, a Necromancer can force the bones of the long forgotten to burst forth from the earth like jagged spines and impale unwary foes.\n\nCurrent Level : 5\n42 Energy Cost\n3 Second Skill Recharge\n7 Meter Range\n168% Weapon Damage\n38 Piercing Damage\n70 Cold Damage\n70 Vitality Damage\n26% Slower target Movement for 3 Seconds',
      autoCastSkill: "Shepherd's Call",
      children: [
        {
          id: 'sk2140',
          childSkillIds: [],
          parentSkillIds: ['sk2137'],
          name: 'Soul Harvest',
          level: 12,
          details:
            'Soul Harvest\nThe bones of the dead fragment and absorb the souls of your foes, empowering you and your minions with the power of death. Soul Harvest affects all attacks and pets while active.\n\nCurrent Level : 16\n5 Second Duration\n86 Cold Damage\n104 Vitality Damage\n+85% Cold Damage\n+85% Vitality Damage\n+85% Frostburn Damage\n+85% Vitality Decay\n\nBonus to All Pets\n40 Vitality Damage\n+85% to All Damage',
          children: [],
          buffedLevel: 16,
          debuffs: [],
        },
        {
          id: 'sk2139',
          childSkillIds: [],
          parentSkillIds: ['sk2137'],
          name: 'Dread',
          level: 1,
          details:
            'Dread\nThe necrotic bone spires pierce into the very essence of your enemies, ripping the life from their bodies and sending weaker foes fleeing, if their lives are not already claimed.\n\nCurrent Level : 5\n5 Energy Cost\n2 Meter Range\n357 Vitality Decay Damage over 3 Seconds\n+40% Pierce Damage\n+40% Cold Damage\n+40% Vitality Damage\n23% Chance to Confuse target for 2 Seconds',
          children: [],
          buffedLevel: 5,
          debuffs: [],
        },
      ],
      buffedLevel: 5,
      debuffs: [{numType: 'Reduced%', value: 26, benefitType: 'Total Speed'}],
    },
    {
      id: 'sk2147',
      childSkillIds: ['sk2148', 'sk2149', 'sk2150'],
      parentSkillIds: null,
      name: 'Summon Blight Fiend',
      level: 10,
      details:
        'Summon Blight Fiend\nUnmoved by the noxious fumes of decay, conjure forth an abomination made of corpses and rotting filth to rise up from the earth and subdue your enemies. Only one blight fiend can be summoned at any one time. The blight fiend scales with Pet Bonuses.\n\nCurrent Level : 16\n225 Energy Cost\n18 Second Skill Recharge\n1 Summon Limit\n\nBlight Beast Attributes:\n41312 Health\n2737 Energy\n\nBlight Beast Abilities:\n+180% to All Damage\n+33% Crit Damage\n+90% Health\nIncreases Energy Regeneration by 150%\n\nBlighted Claws\n202-286 Physical Damage\n750 Poison Damage over 5 Seconds\n\nVirulent Death\n5 Second Duration\n3.2 Meter Radius\n230 Acid Damage\n1140 Poison Damage over 5 Seconds',
      children: [
        {
          id: 'sk2150',
          childSkillIds: [],
          parentSkillIds: ['sk2147'],
          name: 'Blight Burst',
          level: 1,
          details:
            'Blight Burst\nToxic gases build up within the rotting bulk of the blight fiend, which it can then release upon unsuspecting foes in a toxic eruption of decay.\n\nCurrent Level : 5\n39 Energy Cost\n10 Meter Target Area\n45% Weapon Damage\n182-227 Acid Damage\n99 Vitality Damage\n320 Poison Damage over 5 Seconds\nConfuse target for 2 Seconds\nGenerate Additional Threat',
          children: [],
          buffedLevel: 5,
          debuffs: [],
        },
        {
          id: 'sk2149',
          childSkillIds: [],
          parentSkillIds: ['sk2147'],
          name: 'Rotting Fumes',
          level: 2,
          details:
            "Rotting Fumes\nThe stench emanating from the blight fiend becomes impossible to withstand, with the very air around the creature inducing vomiting and blurring vision.\n\nCurrent Level : 6\n3 Meter Target Area\n236 Poison Damage over 2 Seconds\nGenerate Additional Threat\n110 Reduced target's Defensive Ability for 2 Seconds\n15% Chance for target to Fumble attacks for 2 Seconds\n15% Chance of Impaired Aim to target for 2 Seconds",
          children: [],
          buffedLevel: 6,
          debuffs: [
            {numType: 'Reduced', value: 110, benefitType: 'DA'},
            {numType: 'Reduced%', value: 15, benefitType: 'Fumble'},
            {numType: 'Reduced%', value: 15, benefitType: 'Impaired Aim'},
          ],
        },
      ],
      buffedLevel: 16,
      debuffs: [],
    },
    {
      id: 'sk2155',
      childSkillIds: [],
      parentSkillIds: null,
      name: 'Necrotic Edge',
      level: 1,
      details:
        'Necrotic Edge\nBy striking with the chill of the grave, your attacks inflict instant necrosis upon the afflicted wound, the sight of which can cause even the most resolute foes to falter. Can activate with all default weapon attacks. When used with a melee weapon, the attack strikes multiple nearby targets.\n\nCurrent Level : 5\n21% Chance to be Used\n100% Chance to pass through Enemies\n180 Degree Attack Arc\n3 Target Maximum\n122% Weapon Damage\n41 Cold Damage\n174 Vitality Decay Damage over 3 Seconds\n63% Chance to Confuse target for 1.5 Seconds',
      children: [],
      buffedLevel: 5,
      debuffs: [],
    },
    {
      id: 'sk2154',
      childSkillIds: [],
      parentSkillIds: null,
      name: 'Reaping Strike',
      level: 1,
      details:
        'Reaping Strike\nBy infusing their weapons with deadly necrotic energies, Necromancers can inflict physical wounds that cut deeper than just the flesh. Can activate with all default weapon attacks.\n\nCurrent Level : 5\n21% Chance to be Used\n122% Weapon Damage\n41 Vitality Damage\n35 Aether Damage\n26% of Attack Damage converted to Health\n24 Energy Leech over 2 Seconds',
      children: [],
      buffedLevel: 5,
      debuffs: [],
    },
    {
      id: 'sk2126',
      childSkillIds: [],
      parentSkillIds: null,
      name: 'Ill Omen',
      level: 6,
      details:
        "Ill Omen\nThe mere presence of a Necromancer is often enough to inspire terror within their enemies. You unleash a ghostly wail upon your target that shatters the confidence of lesser foes and rapidly spreads confusion and fear amongst your enemies.\n\nCurrent Level : 10\n75 Energy Cost\n5 Second Skill Recharge\n5 Second Duration\n2 Meter Radius\n41 Cold Damage\n61 Vitality Decay Damage per Second\nConfuse target for 2 Seconds\n25% Reduced target's Damage for 1 Second\n-30% Movement Speed",
      autoCastSkill: 'Twin Fangs',
      children: [],
      buffedLevel: 10,
      debuffs: [
        {numType: 'Reduced%', value: 25, benefitType: 'Damage', damageType: 'All'},
        {numType: '%', value: -30, benefitType: 'Movement Speed'},
      ],
    },
    {
      id: 'sk1183',
      childSkillIds: ['sk1184'],
      parentSkillIds: null,
      name: 'Bonds of Bysmiel',
      level: 1,
      details:
        'Bonds of Bysmiel\nStrengthens the bonds of control with your minions causing them to fight with greater vigor and determination. This ability must be toggled to maintain its effect.\n\nCurrent Level : 7\n1 Active Energy Cost per Second\n105 Energy Reserved\n\nBonus to All Pets\n+60% Health\nIncreases Energy Regeneration by 60%',
      children: [],
      buffedLevel: 7,
      debuffs: [],
    },
    {
      id: 'sk1185',
      childSkillIds: ['sk1186'],
      parentSkillIds: null,
      name: 'Curse of Frailty',
      level: 5,
      details:
        'Curse of Frailty\nA cruel word of power that robs enemies of their fortitude, making them slow and fragile.\n\nCurrent Level : 5\n21 Energy Cost\n8.2 Second Duration\n6.1 Meter Radius\n-38% Movement Speed\n-15% Physical Resistance\n-25% Bleeding Resistance',
      autoCastSkill: 'Will of Rattosh',
      children: [
        {
          id: 'sk1186',
          childSkillIds: [],
          parentSkillIds: ['sk1185'],
          name: 'Vulnerability',
          level: 10,
          details:
            "Vulnerability\nEmpowers the curse's vile potency so that it also weakens the constitution of your enemies, making them more susceptible to witchcraft and poisons.\n\nCurrent Level : 10\n12 Energy Cost\n-75 Defensive Ability\n-25% Poison & Acid Resistance\n-25% Vitality Resistance\n-25% Elemental Resistance",
          children: [],
          buffedLevel: 10,
          debuffs: [
            {numType: 'Flat', value: -75, benefitType: 'DA'},
            {numType: '%', value: -25, benefitType: 'Resistance', damageType: 'Poison & Acid'},
            {numType: '%', value: -25, benefitType: 'Resistance', damageType: 'Vitality'},
            {numType: '%', value: -25, benefitType: 'Resistance', damageType: 'Elemental'},
          ],
        },
      ],
      buffedLevel: 5,
      debuffs: [
        {numType: '%', value: -38, benefitType: 'Movement Speed'},
        {numType: '%', value: -15, benefitType: 'Resistance', damageType: 'Physical'},
        {numType: '%', value: -25, benefitType: 'Resistance', damageType: 'Bleeding'},
      ],
    },
    {
      id: 'sk1181',
      childSkillIds: ['sk1182'],
      parentSkillIds: null,
      name: 'Blood of Dreeg',
      level: 8,
      details:
        "Blood of Dreeg\nA binding with the great guardian confers some of Dreeg's regenerative ability, while wounds inflicted by enemies will spray caustic blood as though inflicted upon Dreeg himself. This effect is also applied to nearby allies.\n\nCurrent Level : 8\n52 Energy Cost\n15 Second Skill Recharge\n30 Second Duration\n20 Meter Radius\n20% Health Restored\n23 Acid Damage\n+66 Offensive Ability\n+50 Health Regenerated per second\n84 Acid Retaliation",
      children: [
        {
          id: 'sk1182',
          childSkillIds: [],
          parentSkillIds: ['sk1181'],
          name: 'Aspect of the Guardian',
          level: 12,
          details:
            'Aspect of the Guardian\nDeepening the connection to Dreeg causes enemy attacks on the occultist to impact as though they were striking the quilled scales of the guardian.\n\nCurrent Level : 12\n16 Energy Cost\n+72% Acid Damage\n+72% Vitality Damage\n+72% Poison Damage\n+72% Vitality Decay\n14% Physical Resistance\n100% Poison & Acid Resistance\n+100% to All Retaliation Damage',
          children: [],
          buffedLevel: 12,
          debuffs: [],
          benefits: [
            {numType: '%', value: 72, benefitType: 'Damage', damageType: 'Acid'},
            {numType: '%', value: 72, benefitType: 'Damage', damageType: 'Vitality'},
            {numType: '%', value: 72, benefitType: 'Damage', damageType: 'Poison'},
            {numType: '%', value: 72, benefitType: 'Damage', damageType: 'Vitality Decay'},
            {numType: '%', value: 14, benefitType: 'Resistance', damageType: 'Physical'},
            {numType: '%', value: 100, benefitType: 'Resistance', damageType: 'Poison & Acid'},
            {numType: '%', value: 100, benefitType: 'Damage', damageType: 'All Retaliation'},
          ],
        },
      ],
      buffedLevel: 8,
      debuffs: [],
      benefits: [
        {numType: '%', value: 20, benefitType: 'Health Restored'},
        {numType: 'Flat', value: 23, benefitType: 'Damage', damageType: 'Acid'},
        {numType: 'Flat', value: 66, benefitType: 'OA'},
        {numType: 'Flat', value: 50, benefitType: 'Health Regen'},
        {numType: 'Flat', value: 84, benefitType: 'Damage', damageType: 'Acid Retaliation'},
      ],
    },
  ],
  devotions: [
    {
      id: 'sk682',
      name: 'Twin Fangs',
      details:
        'Twin Fangs (20% Chance on Attack)\nVampiric fangs assault your foes and sap them of vitality.\n\nBound To:\nIll Omen\n\nCurrent Level : 25\n0.6 Second Skill Recharge\n2 Projectile(s)\n100% Chance to pass through Enemies\n22% Weapon Damage\n165 Piercing Damage\n128-221 Vitality Damage\n40% of Attack Damage converted to Health\n\nAffinity Requirement:\n1\nComplete Constellation Bonus:2\n3\n\n',
      isSkill: true,
      debuffs: [],
    },
    {
      id: 'sk704',
      name: "Shepherd's Call",
      details:
        "Shepherd's Call (25% Chance on Attack)\nCall upon your minions to join you in battle.\n\nBound To:\nBone Harvest\n\nCurrent Level : 25\n6 Second Skill Recharge\n4 Second Duration\n+85 Offensive Ability\n\nBonus to All Pets\n+210% to All Damage\n+28% Crit Damage\n+300% to All Retaliation Damage\n\nAffinity Requirement:\n1\nComplete Constellation Bonus:5\n\n",
      isSkill: true,
      debuffs: [],
    },
    {
      id: 'sk857',
      name: "Wendigo's Mark",
      details:
        "Wendigo's Mark (15% Chance on Attack)\nYou mark your foes with the sign of the wendigo, sapping them of what little there is left of their vitality and transferring it to you.\n\nBound To:\nRaise Skeletons\n\nCurrent Level : 20\n10 Second Duration\n210 Vitality Damage\n65% of Attack Damage converted to Health\n\nAffinity Requirement:\n6\n4\nComplete Constellation Bonus:2\n\n",
      isSkill: true,
      debuffs: [],
    },
    {
      id: 'sk1082',
      name: 'Hungering Void',
      details:
        'Hungering Void (33% Chance on Attack)\nThe hungering void empowers you, your allies and your minions, but the power gained comes at a heavy toll to the body.\n\nBound To:\nReap Spirit\n\nCurrent Level : 15\n308 Active Health Cost per Second\n30 Second Skill Recharge\n20 Second Duration\n12 Meter Radius\n+18% Crit Damage\n+370% Vitality Damage\n+370% Chaos Damage\n+370% Vitality Decay\n+10% Total Speed\n720 Chaos Retaliation\n70% Chance of 3 Seconds of Terrify Retaliation\n\nBonus to All Pets\n+200% to All Damage\n+20% Crit Damage\n10% Chance to Stun target for 1 Second\n56% Chance of 30% Slow target for 3 Seconds\n\nAffinity Requirement:\n8\n15\n',
      isSkill: true,
      debuffs: [{numType: 'Reduced%', value: 56, benefitType: 'Total Speed'}],
      benefits: [
        {numType: '%', value: 18, benefitType: 'Damage', damageType: 'Crit'},
        {numType: '%', value: 370, benefitType: 'Damage', damageType: 'Vitality'},
        {numType: '%', value: 370, benefitType: 'Damage', damageType: 'Chaos'},
        {numType: '%', value: 370, benefitType: 'Damage', damageType: 'Vitality Decay'},
        {numType: '%', value: 10, benefitType: 'Total Speed'},
        {numType: 'Flat', value: 720, benefitType: 'Damage', damageType: 'Chaos Retaliation'},
        {numType: '%', value: 200, benefitType: 'Damage', damageType: 'All'},
        {numType: '%', value: 20, benefitType: 'Damage', damageType: 'Crit'},
      ],
    },
    {
      id: 'sk2090',
      name: 'Will of Rattosh',
      details:
        "Will of Rattosh (15% Chance on Attack)\nMark the souls of your foes with the symbol of Rattosh. Their lives and fates sealed, left at the mercy of Rattosh's servant, Typhos.\n\nBound To:\nCurse of Frailty\n\nCurrent Level : 15\n8 Second Duration\n160 Vitality Damage\n185 Aether Damage\n-25% Vitality Resistance\n-8% Life Leech Resistance\n\nAffinity Requirement:\n10\n6\n6\n",
      isSkill: true,
      debuffs: [
        {numType: '%', value: -25, benefitType: 'Resistance', damageType: 'Vitality'},
        {numType: '%', value: -8, benefitType: 'Resistance', damageType: 'Life Leech'},
      ],
    },
  ],
  devotionNodes: [
    {
      id: 'sk678',
      name: 'Bat',
      details:
        'Bat\n+15% Vitality Damage\n+15% Bleeding Damage\n\nAffinity Requirement:\n1\nComplete Constellation Bonus:2\n3\n\n',
      isSkill: false,
      constellationNumber: 1,
      devotionButton: 1,
    },
    {
      id: 'sk679',
      name: 'Bat',
      details:
        'Bat\n+30% Vitality Decay\n+10 Offensive Ability\n\nAffinity Requirement:\n1\nComplete Constellation Bonus:2\n3\n\n',
      isSkill: false,
      constellationNumber: 1,
      devotionButton: 2,
    },
    {
      id: 'sk680',
      name: 'Bat',
      details:
        'Bat\n+24% Vitality Damage\n+30% Bleeding Damage\n\nAffinity Requirement:\n1\nComplete Constellation Bonus:2\n3\n\n',
      isSkill: false,
      constellationNumber: 1,
      devotionButton: 3,
    },
    {
      id: 'sk681',
      name: 'Bat',
      details:
        'Bat\n6 Vitality Damage\n3% of Attack Damage converted to Health\n\nAffinity Requirement:\n1\nComplete Constellation Bonus:2\n3\n\n',
      isSkill: false,
      constellationNumber: 1,
      devotionButton: 4,
    },
    {
      id: 'sk682',
      name: 'Twin Fangs',
      details:
        'Twin Fangs (20% Chance on Attack)\nVampiric fangs assault your foes and sap them of vitality.\n\nBound To:\nIll Omen\n\nCurrent Level : 25\n0.6 Second Skill Recharge\n2 Projectile(s)\n100% Chance to pass through Enemies\n22% Weapon Damage\n165 Piercing Damage\n128-221 Vitality Damage\n40% of Attack Damage converted to Health\n\nAffinity Requirement:\n1\nComplete Constellation Bonus:2\n3\n\n',
      isSkill: true,
      constellationNumber: 1,
      devotionButton: 5,
    },
    {
      id: 'sk700',
      name: "Shepherd's Crook",
      details:
        "Shepherd's Crook\n+40 Health\n\nBonus to All Pets\n+8% Health\n\nAffinity Requirement:\n1\nComplete Constellation Bonus:5\n\n",
      isSkill: false,
      constellationNumber: 6,
      devotionButton: 1,
    },
    {
      id: 'sk701',
      name: "Shepherd's Crook",
      details:
        "Shepherd's Crook\n+15 Cunning\n+40 Health\n\nAffinity Requirement:\n1\nComplete Constellation Bonus:5\n\n",
      isSkill: false,
      constellationNumber: 6,
      devotionButton: 2,
    },
    {
      id: 'sk702',
      name: "Shepherd's Crook",
      details:
        "Shepherd's Crook\n10% Elemental Resistance\n\nBonus to All Pets\n15% Elemental Resistance\n\nAffinity Requirement:\n1\nComplete Constellation Bonus:5\n\n",
      isSkill: false,
      constellationNumber: 6,
      devotionButton: 3,
    },
    {
      id: 'sk703',
      name: "Shepherd's Crook",
      details:
        "Shepherd's Crook\n+3% Health\n\nBonus to All Pets\n+5% Health\n+5% Defensive Ability\n\nAffinity Requirement:\n1\nComplete Constellation Bonus:5\n\n",
      isSkill: false,
      constellationNumber: 6,
      devotionButton: 4,
    },
    {
      id: 'sk704',
      name: "Shepherd's Call",
      details:
        "Shepherd's Call (25% Chance on Attack)\nCall upon your minions to join you in battle.\n\nBound To:\nBone Harvest\n\nCurrent Level : 25\n6 Second Skill Recharge\n4 Second Duration\n+85 Offensive Ability\n\nBonus to All Pets\n+210% to All Damage\n+28% Crit Damage\n+300% to All Retaliation Damage\n\nAffinity Requirement:\n1\nComplete Constellation Bonus:5\n\n",
      isSkill: true,
      constellationNumber: 6,
      devotionButton: 5,
    },
    {
      id: 'sk724',
      name: 'Eel',
      details:
        'Eel\n+12 Defensive Ability\n2% Chance to Avoid Melee Attacks\n\nAffinity Requirement:\n1\nComplete Constellation Bonus:5\n\n',
      isSkill: false,
      constellationNumber: 11,
      devotionButton: 1,
    },
    {
      id: 'sk725',
      name: 'Eel',
      details:
        'Eel\n+15 Defensive Ability\n2% Chance to Avoid Projectiles\n\nAffinity Requirement:\n1\nComplete Constellation Bonus:5\n\n',
      isSkill: false,
      constellationNumber: 11,
      devotionButton: 2,
    },
    {
      id: 'sk726',
      name: 'Eel',
      details:
        'Eel\n+20 Defensive Ability\n+6% Movement Speed\n10% Pierce Resistance\n\nAffinity Requirement:\n1\nComplete Constellation Bonus:5\n\n',
      isSkill: false,
      constellationNumber: 11,
      devotionButton: 3,
    },
    {
      id: 'sk731',
      name: 'Viper',
      details: 'Viper\n+15 Cunning\n+15 Spirit\n\nAffinity Requirement:\n1\nComplete Constellation Bonus:3\n2\n\n',
      isSkill: false,
      constellationNumber: 13,
      devotionButton: 1,
    },
    {
      id: 'sk732',
      name: 'Viper',
      details:
        'Viper\n15% Chance of 36 Energy Leech over 2 Seconds\n+10% Energy Absorbed from Enemy Spells\n\nAffinity Requirement:\n1\nComplete Constellation Bonus:3\n2\n\n',
      isSkill: false,
      constellationNumber: 13,
      devotionButton: 2,
    },
    {
      id: 'sk733',
      name: 'Viper',
      details: 'Viper\n10% Vitality Resistance\n\nAffinity Requirement:\n1\nComplete Constellation Bonus:3\n2\n\n',
      isSkill: false,
      constellationNumber: 13,
      devotionButton: 3,
    },
    {
      id: 'sk734',
      name: 'Viper',
      details:
        "Viper\n20% Reduced target's Elemental Resistances for 3 Seconds\n+3% Offensive Ability\n\nAffinity Requirement:\n1\nComplete Constellation Bonus:3\n2\n\n",
      isSkill: false,
      constellationNumber: 13,
      devotionButton: 4,
    },
    {
      id: 'sk811',
      name: 'Crane',
      details: 'Crane\n+15 Physique\n+15 Spirit\n\nAffinity Requirement:\n1\nComplete Constellation Bonus:5\n\n',
      isSkill: false,
      constellationNumber: 31,
      devotionButton: 1,
    },
    {
      id: 'sk812',
      name: 'Crane',
      details:
        'Crane\n12% Poison & Acid Resistance\n\nBonus to All Pets\n12% Poison & Acid Resistance\n\nAffinity Requirement:\n1\nComplete Constellation Bonus:5\n\n',
      isSkill: false,
      constellationNumber: 31,
      devotionButton: 2,
    },
    {
      id: 'sk813',
      name: 'Crane',
      details:
        'Crane\n+15% to All Damage\n-10% Spirit Requirement for all Weapons\n\nAffinity Requirement:\n1\nComplete Constellation Bonus:5\n\n',
      isSkill: false,
      constellationNumber: 31,
      devotionButton: 3,
    },
    {
      id: 'sk814',
      name: 'Crane',
      details:
        'Crane\n12% Vitality Resistance\n\nBonus to All Pets\n12% Vitality Resistance\n\nAffinity Requirement:\n1\nComplete Constellation Bonus:5\n\n',
      isSkill: false,
      constellationNumber: 31,
      devotionButton: 4,
    },
    {
      id: 'sk815',
      name: 'Crane',
      details:
        'Crane\n16% Elemental Resistance\n16% Bleeding Resistance\n22% Reflected Damage Reduction\n\nAffinity Requirement:\n1\nComplete Constellation Bonus:5\n\n',
      isSkill: false,
      constellationNumber: 31,
      devotionButton: 5,
    },
    {
      id: 'sk824',
      name: 'Spider',
      details: 'Spider\n+15 Cunning\n+15 Spirit\n\nAffinity Requirement:\n1\nComplete Constellation Bonus:6\n\n',
      isSkill: false,
      constellationNumber: 34,
      devotionButton: 1,
    },
    {
      id: 'sk825',
      name: 'Spider',
      details:
        'Spider\n+3% Spirit\n+20 Offensive Ability\n\nAffinity Requirement:\n1\nComplete Constellation Bonus:6\n\n',
      isSkill: false,
      constellationNumber: 34,
      devotionButton: 2,
    },
    {
      id: 'sk826',
      name: 'Spider',
      details:
        'Spider\n+20 Offensive Ability\n+5% Casting Speed\n\nAffinity Requirement:\n1\nComplete Constellation Bonus:6\n\n',
      isSkill: false,
      constellationNumber: 34,
      devotionButton: 3,
    },
    {
      id: 'sk827',
      name: 'Spider',
      details:
        'Spider\n+20 Defensive Ability\n+5% Attack Speed\n\nAffinity Requirement:\n1\nComplete Constellation Bonus:6\n\n',
      isSkill: false,
      constellationNumber: 34,
      devotionButton: 4,
    },
    {
      id: 'sk828',
      name: 'Spider',
      details:
        'Spider\n+3% Cunning\n+20 Defensive Ability\n\nAffinity Requirement:\n1\nComplete Constellation Bonus:6\n\n',
      isSkill: false,
      constellationNumber: 34,
      devotionButton: 5,
    },
    {
      id: 'sk829',
      name: 'Lizard',
      details:
        'Lizard\n+6 Health Regenerated per second\n+15% Constitution\n\nAffinity Requirement:\n1\nComplete Constellation Bonus:4\n\n',
      isSkill: false,
      constellationNumber: 35,
      devotionButton: 1,
    },
    {
      id: 'sk830',
      name: 'Lizard',
      details:
        'Lizard\n+50 Health\n+10 Health Regenerated per second\n+3% Movement Speed\n\nAffinity Requirement:\n1\nComplete Constellation Bonus:4\n\n',
      isSkill: false,
      constellationNumber: 35,
      devotionButton: 2,
    },
    {
      id: 'sk831',
      name: 'Lizard',
      details:
        'Lizard\n+50 Health\nIncreases Health Regeneration by 25%\nHealing Effects Increased by 6%\n\nAffinity Requirement:\n1\nComplete Constellation Bonus:4\n\n',
      isSkill: false,
      constellationNumber: 35,
      devotionButton: 3,
    },
    {
      id: 'sk852',
      name: 'Wendigo',
      details:
        'Wendigo\n+40% Vitality Damage\n+40% Vitality Decay\n\nAffinity Requirement:\n6\n4\nComplete Constellation Bonus:2\n\n',
      isSkill: false,
      constellationNumber: 38,
      devotionButton: 1,
    },
    {
      id: 'sk853',
      name: 'Wendigo',
      details: 'Wendigo\n+20 Spirit\n+150 Health\n\nAffinity Requirement:\n6\n4\nComplete Constellation Bonus:2\n\n',
      isSkill: false,
      constellationNumber: 38,
      devotionButton: 2,
    },
    {
      id: 'sk854',
      name: 'Wendigo',
      details:
        'Wendigo\n+5% Attack Speed\n+5% Casting Speed\n4% Physical Resistance\n\nAffinity Requirement:\n6\n4\nComplete Constellation Bonus:2\n\n',
      isSkill: false,
      constellationNumber: 38,
      devotionButton: 3,
    },
    {
      id: 'sk855',
      name: 'Wendigo',
      details:
        'Wendigo\n10% Less Damage from Beasts\n+5% Health\n\nAffinity Requirement:\n6\n4\nComplete Constellation Bonus:2\n\n',
      isSkill: false,
      constellationNumber: 38,
      devotionButton: 4,
    },
    {
      id: 'sk856',
      name: 'Wendigo',
      details:
        'Wendigo\n36 Vitality Decay Damage over 3 Seconds\n+50% Vitality Damage\n+50% Vitality Decay\n\nAffinity Requirement:\n6\n4\nComplete Constellation Bonus:2\n\n',
      isSkill: false,
      constellationNumber: 38,
      devotionButton: 5,
    },
    {
      id: 'sk857',
      name: "Wendigo's Mark",
      details:
        "Wendigo's Mark (15% Chance on Attack)\nYou mark your foes with the sign of the wendigo, sapping them of what little there is left of their vitality and transferring it to you.\n\nBound To:\nRaise Skeletons\n\nCurrent Level : 20\n10 Second Duration\n210 Vitality Damage\n65% of Attack Damage converted to Health\n\nAffinity Requirement:\n6\n4\nComplete Constellation Bonus:2\n\n",
      isSkill: true,
      constellationNumber: 38,
      devotionButton: 6,
    },
    {
      id: 'sk1076',
      name: 'Dying God',
      details: 'Dying God\n+80% Vitality Damage\n+20 Offensive Ability\n\nAffinity Requirement:\n8\n15\n',
      isSkill: false,
      constellationNumber: 73,
      devotionButton: 1,
    },
    {
      id: 'sk1077',
      name: 'Dying God',
      details: 'Dying God\n+80% Chaos Damage\n+20 Offensive Ability\n\nAffinity Requirement:\n8\n15\n',
      isSkill: false,
      constellationNumber: 73,
      devotionButton: 2,
    },
    {
      id: 'sk1078',
      name: 'Dying God',
      details:
        'Dying God\n+35 Spirit\n+3% Offensive Ability\n\nBonus to All Pets\n+30% to All Damage\n+8% Attack Speed\n\nAffinity Requirement:\n8\n15\n',
      isSkill: false,
      constellationNumber: 73,
      devotionButton: 3,
    },
    {
      id: 'sk1079',
      name: 'Dying God',
      details:
        'Dying God\n+45 Offensive Ability\n+25 Defensive Ability\n15% Chaos Resistance\n\nAffinity Requirement:\n8\n15\n',
      isSkill: false,
      constellationNumber: 73,
      devotionButton: 4,
    },
    {
      id: 'sk1080',
      name: 'Dying God',
      details: 'Dying God\n+100% Vitality Damage\n+100% Chaos Damage\n\nAffinity Requirement:\n8\n15\n',
      isSkill: false,
      constellationNumber: 73,
      devotionButton: 5,
    },
    {
      id: 'sk1082',
      name: 'Hungering Void',
      details:
        'Hungering Void (33% Chance on Attack)\nThe hungering void empowers you, your allies and your minions, but the power gained comes at a heavy toll to the body.\n\nBound To:\nReap Spirit\n\nCurrent Level : 15\n308 Active Health Cost per Second\n30 Second Skill Recharge\n20 Second Duration\n12 Meter Radius\n+18% Crit Damage\n+370% Vitality Damage\n+370% Chaos Damage\n+370% Vitality Decay\n+10% Total Speed\n720 Chaos Retaliation\n70% Chance of 3 Seconds of Terrify Retaliation\n\nBonus to All Pets\n+200% to All Damage\n+20% Crit Damage\n10% Chance to Stun target for 1 Second\n56% Chance of 30% Slow target for 3 Seconds\n\nAffinity Requirement:\n8\n15\n',
      isSkill: true,
      constellationNumber: 73,
      devotionButton: 7,
    },
    {
      id: 'sk1081',
      name: 'Dying God',
      details:
        'Dying God\n5-18 Chaos Damage\n+4% Crit Damage\n\nBonus to All Pets\n+60% to All Damage\n+10% Crit Damage\n\nAffinity Requirement:\n8\n15\n',
      isSkill: false,
      constellationNumber: 73,
      devotionButton: 6,
    },
    {
      id: 'sk741',
      name: 'Crossroads',
      details: 'Crossroads\n+5% Health\n\nComplete Constellation Bonus:1\n\n',
      isSkill: false,
    },
    {
      id: 'sk742',
      name: 'Crossroads',
      details: 'Crossroads\n+18 Offensive Ability\n\nComplete Constellation Bonus:1\n\n',
      isSkill: false,
    },
    {
      id: 'sk2020',
      name: 'Wretch',
      details:
        'Wretch\n+15% Acid Damage\n+15% Chaos Damage\n\nAffinity Requirement:\n1\nComplete Constellation Bonus:2\n3\n\n',
      isSkill: false,
      constellationNumber: 89,
      devotionButton: 1,
    },
    {
      id: 'sk2021',
      name: 'Wretch',
      details:
        'Wretch\n+15 Physique\n12% Bleeding Resistance\n\nAffinity Requirement:\n1\nComplete Constellation Bonus:2\n3\n\n',
      isSkill: false,
      constellationNumber: 89,
      devotionButton: 2,
    },
    {
      id: 'sk2022',
      name: 'Wretch',
      details:
        'Wretch\n+140 Health\n+15 Defensive Ability\n44 Acid Retaliation\n\nAffinity Requirement:\n1\nComplete Constellation Bonus:2\n3\n\n',
      isSkill: false,
      constellationNumber: 89,
      devotionButton: 3,
    },
    {
      id: 'sk2023',
      name: 'Wretch',
      details:
        'Wretch\n+24% Acid Damage\n+24% Chaos Damage\n+6% Damage to Undead\n\nAffinity Requirement:\n1\nComplete Constellation Bonus:2\n3\n\n',
      isSkill: false,
      constellationNumber: 89,
      devotionButton: 4,
    },
    {
      id: 'sk2085',
      name: 'Rattosh, the Veilwarden',
      details: 'Rattosh, the Veilwarden\n+250 Health\n+30 Offensive Ability\n\nAffinity Requirement:\n10\n6\n6\n',
      isSkill: false,
      constellationNumber: 101,
      devotionButton: 1,
    },
    {
      id: 'sk2086',
      name: 'Rattosh, the Veilwarden',
      details: 'Rattosh, the Veilwarden\n+80% Vitality Damage\n+80% Aether Damage\n\nAffinity Requirement:\n10\n6\n6\n',
      isSkill: false,
      constellationNumber: 101,
      devotionButton: 2,
    },
    {
      id: 'sk2087',
      name: 'Rattosh, the Veilwarden',
      details:
        'Rattosh, the Veilwarden\n+150% Vitality Decay with +50% Increased Duration\n+45 Offensive Ability\n\nAffinity Requirement:\n10\n6\n6\n',
      isSkill: false,
      constellationNumber: 101,
      devotionButton: 3,
    },
    {
      id: 'sk2088',
      name: 'Rattosh, the Veilwarden',
      details:
        'Rattosh, the Veilwarden\n54 Vitality Decay Damage over 3 Seconds\n+100% Vitality Damage\n+100% Aether Damage\n\nAffinity Requirement:\n10\n6\n6\n',
      isSkill: false,
      constellationNumber: 101,
      devotionButton: 4,
    },
    {
      id: 'sk2089',
      name: 'Rattosh, the Veilwarden',
      details:
        'Rattosh, the Veilwarden\n10 Vitality Damage\n15% Pierce Resistance\n15% Bleeding Resistance\n\nAffinity Requirement:\n10\n6\n6\n',
      isSkill: false,
      constellationNumber: 101,
      devotionButton: 5,
    },
    {
      id: 'sk2090',
      name: 'Will of Rattosh',
      details:
        "Will of Rattosh (15% Chance on Attack)\nMark the souls of your foes with the symbol of Rattosh. Their lives and fates sealed, left at the mercy of Rattosh's servant, Typhos.\n\nBound To:\nCurse of Frailty\n\nCurrent Level : 15\n8 Second Duration\n160 Vitality Damage\n185 Aether Damage\n-25% Vitality Resistance\n-8% Life Leech Resistance\n\nAffinity Requirement:\n10\n6\n6\n",
      isSkill: true,
      constellationNumber: 101,
      devotionButton: 6,
    },
  ],
  items: [
    {
      slot: 'weapon1',
      details:
        "Mythical Guardian of Death's Gates\n\"Rumored to have once been wielded by Uroboruuk himself, this weapon's edge traps souls with the slightest touch.\"\nLegendary Two-Handed Axe\n202-532 Vitality Damage\n1.48 Attacks per Second\n\n8/12% of Attack Damage converted to Health\n+252/+378% to All Damage\n20/30 Reduced target's Resistances for 3 Seconds\n36/54% Physical Damage converted to Vitality Damage\n+707/+1061 Health\n+2 to Call of the Grave\n+4 to Bonds of Bysmiel\n+4 to Field Command\n+2 to all skills in Necromancer\n+10% Offensive Ability to Call of the Grave\n-3 Second Skill Recharge to Raise Skeletons\n3 Summon Limit to Raise Skeletons\n36 Vitality Damage to Field Command\n+180% Vitality Damage to Field Command\n+180% Vitality Decay to Field Command\n\nBonus to All Pets\n+132/+198% to All Damage\n80/120% Physical Damage converted to Vitality Damage\n+19/+29% Total Speed\n6/10% Physical Resistance\n\n[Components]\nSeal of Might\nMagic Component\n13 Physical Damage\n+50% Physical Damage\n+50% Internal Trauma Damage\n+50% Bleeding Damage\n25% Aether Damage converted to Physical Damage\n+160 Health\n\n[Granted Skills]\nPresence of Might (Granted by Item)\nYou shrug off the blows of your opponents with ease. This ability must be toggled to maintain its effect.\n300 Energy Reserved\n4% Physical Resistance\n12% Pierce Resistance\n12% Vitality Resistance\n12% Bleeding Resistance\nBonus to All Pets\n4% Physical Resistance\n12% Pierce Resistance\n12% Vitality Resistance\n12% Bleeding Resistance\n\n[Augments]\nPotent Ravager's Eye\nRare Augment\n+8% Health\n+6% Defensive Ability\n\nBonus to All Pets\n+55% to All Damage\n+6% Offensive Ability\n\nRequired Player Level: 94\nRequired Physique: 627\nItem Level: 94\n\nAshes of Malmouth\n\n",
      name: "Mythical Guardian of Death's Gates",
      grantedSkills: [
        {
          name: 'Presence of Might',
          details:
            'Presence of Might (Granted by Item)\nYou shrug off the blows of your opponents with ease. This ability must be toggled to maintain its effect.\n300 Energy Reserved\n4% Physical Resistance\n12% Pierce Resistance\n12% Vitality Resistance\n12% Bleeding Resistance\nBonus to All Pets\n4% Physical Resistance\n12% Pierce Resistance\n12% Vitality Resistance\n12% Bleeding Resistance',
          debuffs: [],
        },
      ],
      component: {
        name: 'Seal of Might',
        details:
          'Magic Component\n13 Physical Damage\n+50% Physical Damage\n+50% Internal Trauma Damage\n+50% Bleeding Damage\n25% Aether Damage converted to Physical Damage\n+160 Health',
      },
      augment: {name: "Potent Ravager's Eye", details: 'Rare Augment\n+8% Health\n+6% Defensive Ability'},
    },
    {
      slot: 'medal',
      details:
        "Ritualist's Wendigo Gaze of Caged Souls\n\"The bloodshot eye bewilders any lesser creature that gazes upon it.\"\nRare Medal\n\n+24/+32% Vitality Damage\n+24/+32% Vitality Decay\n+42/+62 Defensive Ability\n35/53% Pierce Resistance\n26/34% Bleeding Resistance\n+3 to Emboldening Presence\n+3 to Undead Legion\n+4 to Raise Skeletons\n+2 to Summon Briarthorn\n+25% Attack Speed to Summon Briarthorn\n1 Summon Limit to Raise Skeletons\n\nBonus to All Pets\n+21/+29% to All Damage\n+5/+7% Crit Damage\n+3/+5% Offensive Ability\n+5/+7% Total Speed\n+6/+8% Attack Speed\n26/34% Reduced Freeze Duration\n\n[Components]\nAether Soul\nComponent\n+10% Aether Damage\n6% Less Damage from Aetherials\n6% Less Damage from Aether Corruptions\n+30 Defensive Ability\n16% Aether Resistance\n\n[Augments]\nRune of Dreeg's Wounds\nLegendary Augment\n\n[Granted Skills]\nDreeg's Wounds (Granted by Item)\nLeap through the air towards a target destination and deliver grievous wounds reminiscent of the suffering of the Great Guardian upon your foes.\n70 Energy Cost\n3.5 Second Skill Recharge\n5 Meter Target Area\n16 Meter Range\n260% Weapon Damage\n40% of Retaliation Damage added to Attack\n300 Acid Damage\n300 Vitality Damage\n16% Chance for target to Fumble attacks for 2 Seconds\n16% Chance of Impaired Aim to target for 2 Seconds\n\nRequired Player Level: 94\nItem Level: 94\n\nAshes of Malmouth\nMI\n\n",
      name: "Ritualist's Wendigo Gaze of Caged Souls",
      grantedSkills: [
        {
          name: "Dreeg's Wounds",
          details:
            "Dreeg's Wounds (Granted by Item)\nLeap through the air towards a target destination and deliver grievous wounds reminiscent of the suffering of the Great Guardian upon your foes.\n70 Energy Cost\n3.5 Second Skill Recharge\n5 Meter Target Area\n16 Meter Range\n260% Weapon Damage\n40% of Retaliation Damage added to Attack\n300 Acid Damage\n300 Vitality Damage\n16% Chance for target to Fumble attacks for 2 Seconds\n16% Chance of Impaired Aim to target for 2 Seconds",
          debuffs: [
            {numType: 'Reduced%', value: 16, benefitType: 'Fumble'},
            {numType: 'Reduced%', value: 16, benefitType: 'Impaired Aim'},
          ],
        },
      ],
      component: {
        name: 'Aether Soul',
        details:
          'Component\n+10% Aether Damage\n6% Less Damage from Aetherials\n6% Less Damage from Aether Corruptions\n+30 Defensive Ability\n16% Aether Resistance',
      },
      augment: {name: "Rune of Dreeg's Wounds", details: 'Legendary Augment'},
    },
    {
      slot: 'head',
      details:
        'Stonehide Ascendant Cowl of the Wild\nRare Caster Helm\n1107 Armor\n\n+40/+60% Aether Damage\n+24/+30 Defensive Ability\n+3.6 Energy Regenerated per second\n23/29% Pierce Resistance\n35/45% Poison & Acid Resistance\n43/61% Elemental Resistance\n35/45% Bleeding Resistance\nIncreases Armor by 6/8%\n+3 to Undead Legion\n+3 to Summon Briarthorn\n+2 to Emboldening Presence\n+4 Summon to Raise Skeletons\n-100% Skill Energy Cost to Raise Skeletons\n-4 Second Skill Recharge to Summon Briarthorn\n\nBonus to All Pets\n14/22 Aether Damage\n+50/+70% to All Damage\n+4/+4% Attack Speed\n55/75% Elemental Resistance\n\n[Components]\nSacred Plating\nRare Component\n+210 Health\n14% Vitality Resistance\n18% Aether Resistance\nIncreases Armor Absorption by 12%\n\n[Augments]\nCoven Black Ash\nEpic Augment\n10% Pierce Resistance\n10% Chaos Resistance\n\nRequired Player Level: 94\nRequired Physique: 356\nRequired Spirit: 572\nItem Level: 94\n\nAshes of Malmouth\nMI\n\n',
      name: 'Stonehide Ascendant Cowl of the Wild',
      grantedSkills: [],
      component: {
        name: 'Sacred Plating',
        details:
          'Rare Component\n+210 Health\n14% Vitality Resistance\n18% Aether Resistance\nIncreases Armor Absorption by 12%',
      },
      augment: {name: 'Coven Black Ash', details: 'Epic Augment\n10% Pierce Resistance\n10% Chaos Resistance'},
    },
    {
      slot: 'amulet',
      details:
        'Mythical Sovereign Ruby of Domination\nLegendary Amulet\n\n+344/+516 Health\n28/42% Elemental Resistance\n16/24% Reduced Stun Duration\n+5/7% Skill Cooldown Reduction\n+3 to Infernal Breath\n+3 to Ember Claw\n+3 to Summon Briarthorn\n+2 to Master of Death\n100% Chaos Damage converted to Fire Damage to Summon Hellhound\n15% Physical Resistance to Summon Hellhound\n-2 Second Skill Recharge to Raise Skeletons\n\nBonus to All Pets\n+64/+96% to All Damage\n+14/+22% Crit Damage\n\n[Granted Skills]\nSovereign (Granted by Item)\nImpose your supreme will upon your minions, granting them unstoppable strength.\n90 Energy Cost\n30 Second Skill Recharge\n15 Second Duration\n+15% Crit Damage\n+100 Offensive Ability\nBonus to All Pets\n+300% to All Damage\n+22% Crit Damage\n+70 Offensive Ability\n30% Reduced Stun Duration\n30% Reduced Freeze Duration\n30% Reduced Petrify Duration\n30% Reduced Entrapment Duration\n30% Reduced Mind Control Duration\n30% Slow Resistance\n\n[Components]\nArcane Spark\nRare Component\n45 Energy Leech over 3 Seconds\n+50 Offensive Ability\nIncreases Energy Regeneration by 20%\n30% Skill Disruption Protection\n\n[Augments]\nArcanum Dust\nRare Augment\n+35% to All Damage\n+70 Defensive Ability\n+2.5 Energy Regenerated per second\n10% Elemental Resistance\n\nRequired Player Level: 90\nRequired Spirit: 360\nItem Level: 84\n\nAshes of Malmouth\n\n',
      name: 'Mythical Sovereign Ruby of Domination',
      grantedSkills: [
        {
          name: 'Sovereign',
          details:
            'Sovereign (Granted by Item)\nImpose your supreme will upon your minions, granting them unstoppable strength.\n90 Energy Cost\n30 Second Skill Recharge\n15 Second Duration\n+15% Crit Damage\n+100 Offensive Ability\nBonus to All Pets\n+300% to All Damage\n+22% Crit Damage\n+70 Offensive Ability\n30% Reduced Stun Duration\n30% Reduced Freeze Duration\n30% Reduced Petrify Duration\n30% Reduced Entrapment Duration\n30% Reduced Mind Control Duration\n30% Slow Resistance',
          debuffs: [{numType: 'Reduced%', value: 30, benefitType: 'Total Speed'}],
        },
      ],
      component: {
        name: 'Arcane Spark',
        details:
          'Rare Component\n45 Energy Leech over 3 Seconds\n+50 Offensive Ability\nIncreases Energy Regeneration by 20%\n30% Skill Disruption Protection',
      },
      augment: {
        name: 'Arcanum Dust',
        details:
          'Rare Augment\n+35% to All Damage\n+70 Defensive Ability\n+2.5 Energy Regenerated per second\n10% Elemental Resistance',
      },
    },
    {
      slot: 'waist',
      details:
        "Wraithbound Lunal'Valgoth's Waistguard of the Untamed\nRare Belt\n90 Armor\n\n40/60% Chaos Damage converted to Vitality Damage\n+440/+560 Health\n+4/+6% Health\n+74/+94 Offensive Ability\n18/22% Pierce Resistance\n24/36% Chaos Resistance\n50/70% Reduced Stun Duration\n+2 to Summon Familiar\n+1 to all skills in Necromancer\n\nBonus to All Pets\n+32/+40% to All Damage\n+21/+27% Health\n+4/+6% Offensive Ability\n+4/+4% Total Speed\n4/4% Physical Resistance\n\n[Components]\nUgdenbog Leather\nComponent\n+30 Defensive Ability\n20% Poison & Acid Resistance\n20% Bleeding Resistance\n\n[Augments]\nMankind's Vigil\nEpic Augment\n9% Aether Resistance\n9% Chaos Resistance\n\nRequired Player Level: 94\nRequired Physique: 630\nItem Level: 94\n\nAshes of Malmouth\nMI\n\n",
      name: "Wraithbound Lunal'Valgoth's Waistguard of the Untamed",
      grantedSkills: [],
      component: {
        name: 'Ugdenbog Leather',
        details: 'Component\n+30 Defensive Ability\n20% Poison & Acid Resistance\n20% Bleeding Resistance',
      },
      augment: {name: "Mankind's Vigil", details: 'Epic Augment\n9% Aether Resistance\n9% Chaos Resistance'},
    },
    {
      slot: 'relic',
      details:
        'Dirge of Arkovia\n"A terrifying song emanates from this stone."\nMythical Relic\n\n22/34% Vitality Resistance\n14/22% Elemental Resistance\n33% Chance of 1.6/2.4 Seconds of Terrify Retaliation\n+1 to all skills in Necromancer\n\nBonus to All Pets\n+40/+60% to All Damage\n+20/+30% Health\n+8/+12% Total Speed\n\n[Granted Skills]\nSummon Skeletal Servant (Granted by Item)\nBind the remains of a hundred tormented souls to serve you. This terrifying being cleaves through foes and traps them within cages of bone. Only one Skeletal Servant can be summoned at any one time. The servant scales with Pet Bonuses.\n200 Energy Cost\n30 Second Skill Recharge\n1 Summon Limit\nSkeletal Servant Attributes:\n43424 Health\n2737 Energy\n\nSkeletal Servant Abilities:\nSkeletal Claws\n220-343 Physical Damage\n244 Vitality Damage\n\nRequired Player Level: 70\nItem Level: 70\n\nBlueprint: Relic - Dirge of Arkovia\nAshes of Malmouth\n\n',
      name: 'Dirge of Arkovia',
      grantedSkills: [
        {
          name: 'Summon Skeletal Servant',
          details:
            'Summon Skeletal Servant (Granted by Item)\nBind the remains of a hundred tormented souls to serve you. This terrifying being cleaves through foes and traps them within cages of bone. Only one Skeletal Servant can be summoned at any one time. The servant scales with Pet Bonuses.\n200 Energy Cost\n30 Second Skill Recharge\n1 Summon Limit\nSkeletal Servant Attributes:\n43424 Health\n2737 Energy',
          debuffs: [],
        },
      ],
      component: [],
      augment: [],
    },
    {
      slot: 'chest',
      details:
        'Mythical Heart of Yugol\n"Darkness made manifest, the vile heart beats in tune with the celestial tapestry."\nLegendary Heavy Chest Armor\n1908 Armor\n\n+69/+104% Vitality Damage\n+69/+104% Bleeding Damage\n+69/+104% Vitality Decay\n20/30% Aether Damage converted to Vitality Damage\n+944/+1416 Health\n+3.5 Energy Regenerated per second\n3/5% Physical Resistance\n24/36% Elemental Resistance\n20/30% Reduced Freeze Duration\n+2 to Drain Essence\n+2 to Storm Totem\n+4 to Anatomy of Murder\n+3 to Devouring Blades\n\n[Granted Skills]\nDevouring Darkness (Granted by Item)\nThe endless hunger of Yugol empowers you and nearby allies. This ability must be toggled to maintain its effect.\n5 Active Energy Cost per Second\n15 Meter Radius\n5% of Attack Damage converted to Health\n42 Vitality Decay Damage over 2 Seconds\n+75% Vitality Damage\n+75% Bleeding Damage\n+75% Vitality Decay\n250 Energy Reserved\n15% Resistance to Life Reduction\n\n[Components]\nHallowed Ground\nRare Component\n+25 Defensive Ability\n+2% Defensive Ability\n+30 Health Regenerated per second\n12% Elemental Resistance\n\n[Augments]\nCoven Black Ash\nEpic Augment\n10% Pierce Resistance\n10% Chaos Resistance\n\nRequired Player Level: 94\nRequired Physique: 1035\nItem Level: 94\n\nForgotten Gods\n\n',
      name: 'Mythical Heart of Yugol',
      grantedSkills: [
        {
          name: 'Devouring Darkness',
          details:
            'Devouring Darkness (Granted by Item)\nThe endless hunger of Yugol empowers you and nearby allies. This ability must be toggled to maintain its effect.\n5 Active Energy Cost per Second\n15 Meter Radius\n5% of Attack Damage converted to Health\n42 Vitality Decay Damage over 2 Seconds\n+75% Vitality Damage\n+75% Bleeding Damage\n+75% Vitality Decay\n250 Energy Reserved\n15% Resistance to Life Reduction',
          debuffs: [],
          benefits: [
            {numType: '%', value: 5, benefitType: 'Lifesteal'},
            {numType: '%', value: 75, benefitType: 'Damage', damageType: 'Vitality'},
            {numType: '%', value: 75, benefitType: 'Damage', damageType: 'Bleeding'},
            {numType: '%', value: 75, benefitType: 'Damage', damageType: 'Vitality Decay'},
          ],
        },
      ],
      component: {
        name: 'Hallowed Ground',
        details:
          'Rare Component\n+25 Defensive Ability\n+2% Defensive Ability\n+30 Health Regenerated per second\n12% Elemental Resistance',
      },
      augment: {name: 'Coven Black Ash', details: 'Epic Augment\n10% Pierce Resistance\n10% Chaos Resistance'},
    },
    {
      slot: 'ring1',
      details:
        "Mythical Spiritbinder Glyph\n\"The glyph upon this ring is said to be the most powerful spiritbinding symbol known to the Order of Death's Vigil.\"\nLegendary Ring\n\n+85/+128% Aether Damage\n+85/+128% Elemental Damage\n+354/+530 Health\n+30/+46 Offensive Ability\n18/26% Elemental Resistance\n16/24% Reduced Stun Duration\n+2 to Reap Spirit\n+2 to Conjure Primal Spirit\n+2 to Mogdrogen's Pact\n\nBonus to All Pets\n40/60% Elemental Damage converted to Vitality Damage\n+6/+8% Offensive Ability\n\n[Granted Skills]\nMaster of Spirits (15% Chance on Attack)\nYour mastery over your undying servants inspires within them a fierceness that cannot be matched.\n6 Second Skill Recharge\n6 Second Duration\nBonus to All Pets\n+10% Crit Damage\n+75% Vitality Damage\n+75% Vitality Decay\n+66 Offensive Ability\n\n[Components]\nBloodied Crystal\nMagic Component\n+40 Defensive Ability\n+75 Armor\n15% Bleeding Resistance\n\n[Augments]\nAteph's Will\nRare Augment\n+6% Health\nIncreases Armor by 8%\n\nBonus to All Pets\n+5% Attack Speed\n30% Bleeding Resistance\n\nRequired Player Level: 94\nRequired Spirit: 384\nItem Level: 94\n\nAshes of Malmouth\n\n",
      name: 'Mythical Spiritbinder Glyph',
      grantedSkills: [
        {
          name: 'Master of Spirits',
          details:
            'Master of Spirits (15% Chance on Attack)\nYour mastery over your undying servants inspires within them a fierceness that cannot be matched.\n6 Second Skill Recharge\n6 Second Duration\nBonus to All Pets\n+10% Crit Damage\n+75% Vitality Damage\n+75% Vitality Decay\n+66 Offensive Ability',
          debuffs: [],
        },
      ],
      component: {
        name: 'Bloodied Crystal',
        details: 'Magic Component\n+40 Defensive Ability\n+75 Armor\n15% Bleeding Resistance',
      },
      augment: {name: "Ateph's Will", details: 'Rare Augment\n+6% Health\nIncreases Armor by 8%'},
    },
    {
      slot: 'ring2',
      details:
        "Mythical Spiritbinder Glyph\n\"The glyph upon this ring is said to be the most powerful spiritbinding symbol known to the Order of Death's Vigil.\"\nLegendary Ring\n\n+85/+128% Aether Damage\n+85/+128% Elemental Damage\n+354/+530 Health\n+30/+46 Offensive Ability\n18/26% Elemental Resistance\n16/24% Reduced Stun Duration\n+2 to Reap Spirit\n+2 to Conjure Primal Spirit\n+2 to Mogdrogen's Pact\n\nBonus to All Pets\n40/60% Elemental Damage converted to Vitality Damage\n+6/+8% Offensive Ability\n\n[Granted Skills]\nMaster of Spirits (15% Chance on Attack)\nYour mastery over your undying servants inspires within them a fierceness that cannot be matched.\n6 Second Skill Recharge\n6 Second Duration\nBonus to All Pets\n+10% Crit Damage\n+75% Vitality Damage\n+75% Vitality Decay\n+66 Offensive Ability\n\n[Components]\nBloodied Crystal\nMagic Component\n+40 Defensive Ability\n+75 Armor\n15% Bleeding Resistance\n\n[Augments]\nMender's Powder\nMagic Augment\nBonus to All Pets\n+10% Health\n20% Aether Resistance\n20% Chaos Resistance\n\nRequired Player Level: 94\nRequired Spirit: 384\nItem Level: 94\n\nAshes of Malmouth\n\n",
      name: 'Mythical Spiritbinder Glyph',
      grantedSkills: [
        {
          name: 'Master of Spirits',
          details:
            'Master of Spirits (15% Chance on Attack)\nYour mastery over your undying servants inspires within them a fierceness that cannot be matched.\n6 Second Skill Recharge\n6 Second Duration\nBonus to All Pets\n+10% Crit Damage\n+75% Vitality Damage\n+75% Vitality Decay\n+66 Offensive Ability',
          debuffs: [],
        },
      ],
      component: {
        name: 'Bloodied Crystal',
        details: 'Magic Component\n+40 Defensive Ability\n+75 Armor\n15% Bleeding Resistance',
      },
      augment: {
        name: "Mender's Powder",
        details: 'Magic Augment\nBonus to All Pets\n+10% Health\n20% Aether Resistance\n20% Chaos Resistance',
      },
    },
    {
      slot: 'shoulders',
      details:
        "Mythical Fiendflesh Mantle\nLegendary Shoulders\n1357 Armor\n\n+568/+852 Health\n18/26% Aether Resistance\n18/26% Chaos Resistance\n+3 to Summon Hellhound\n+2 to Mend Flesh\n+2 to Ember Claw\n+2 to Spectral Binding\n\nBonus to All Pets\n+56/+84% to All Damage\n+8/+12% Health\n+7/+11% Attack Speed\n36/54% Aether Resistance\n36/54% Chaos Resistance\n\n[Granted Skills]\nFiend's Flesh (100% Chance when Hit)\nThe flesh of the fiend protects you from harm.\n20 Second Skill Recharge\n10000 Damage Absorption\n\n[Components]\nSacred Plating\nRare Component\n+210 Health\n14% Vitality Resistance\n18% Aether Resistance\nIncreases Armor Absorption by 12%\n\n[Augments]\nMalmouth Soulguard Powder\nEpic Augment\n10% Pierce Resistance\n10% Aether Resistance\n\nRequired Player Level: 94\nRequired Physique: 538\nItem Level: 94\n\nAshes of Malmouth\n\n",
      name: 'Mythical Fiendflesh Mantle',
      grantedSkills: [
        {
          name: "Fiend's Flesh",
          details:
            "Fiend's Flesh (100% Chance when Hit)\nThe flesh of the fiend protects you from harm.\n20 Second Skill Recharge\n10000 Damage Absorption",
          debuffs: [],
        },
      ],
      component: {
        name: 'Sacred Plating',
        details:
          'Rare Component\n+210 Health\n14% Vitality Resistance\n18% Aether Resistance\nIncreases Armor Absorption by 12%',
      },
      augment: {
        name: 'Malmouth Soulguard Powder',
        details: 'Epic Augment\n10% Pierce Resistance\n10% Aether Resistance',
      },
    },
    {
      slot: 'hands',
      details:
        "Mythical Touch of the Everliving Grove\nLegendary Gloves\n1014 Armor\n\n+592/+888 Health\n+4/+6% Health\n+17.6/+26.4 Health Regenerated per second\nIncreases Health Regeneration by 22/34%\n+8/+12% Total Speed\n14/22% Elemental Resistance\n+2 to Heart of the Wild\n+2 to Oak Skin\n+2 to Word of Renewal\n\nBonus to All Pets\n+24/+36% Health\n+14/+22% Defensive Ability\n28/42% Pierce Resistance\n\n[Granted Skills]\nHealing Winds (10% Chance on Attack)\nSummon the winds of the eternal spring to mend your wounds.\n4.5 Second Skill Recharge\n3% + 1650 Health Restored\n\n[Components]\nUgdenbog Leather\nComponent\n+30 Defensive Ability\n20% Poison & Acid Resistance\n20% Bleeding Resistance\n\n[Augments]\nMankind's Vigil\nEpic Augment\n9% Aether Resistance\n9% Chaos Resistance\n\nRequired Player Level: 84\nRequired Physique: 343\nItem Level: 84\n\nAshes of Malmouth\n\n",
      name: 'Mythical Touch of the Everliving Grove',
      grantedSkills: [
        {
          name: 'Healing Winds',
          details:
            'Healing Winds (10% Chance on Attack)\nSummon the winds of the eternal spring to mend your wounds.\n4.5 Second Skill Recharge\n3% + 1650 Health Restored',
          debuffs: [],
        },
      ],
      component: {
        name: 'Ugdenbog Leather',
        details: 'Component\n+30 Defensive Ability\n20% Poison & Acid Resistance\n20% Bleeding Resistance',
      },
      augment: {name: "Mankind's Vigil", details: 'Epic Augment\n9% Aether Resistance\n9% Chaos Resistance'},
    },
    {
      slot: 'feet',
      details:
        "Mythical Grim Harvest Boots\nEpic Boots\n898 Armor\n\n+3/+5% Defensive Ability\n+4/+6% Movement Speed\n2/4% Physical Resistance\n24/36% Elemental Resistance\n+2 to Master of Death\n+2 to Summon Briarthorn\n+2 to Bonds of Bysmiel\n\nBonus to All Pets\n+7/+11% Total Speed\n16/24% Vitality Resistance\n16/24% Elemental Resistance\n\n[Components]\nUgdenbog Leather\nComponent\n+30 Defensive Ability\n20% Poison & Acid Resistance\n20% Bleeding Resistance\n\n[Augments]\nMankind's Vigil\nEpic Augment\n9% Aether Resistance\n9% Chaos Resistance\n\nRequired Player Level: 82\nRequired Physique: 343\nItem Level: 84\n\nAshes of Malmouth\n\n",
      name: 'Mythical Grim Harvest Boots',
      grantedSkills: [],
      component: {
        name: 'Ugdenbog Leather',
        details: 'Component\n+30 Defensive Ability\n20% Poison & Acid Resistance\n20% Bleeding Resistance',
      },
      augment: {name: "Mankind's Vigil", details: 'Epic Augment\n9% Aether Resistance\n9% Chaos Resistance'},
    },
    {
      slot: 'legs',
      details:
        "Taskmaster's Bysmiel-Sect Legguards of Caged Souls\nRare Pants\n1501 Armor\n\n+993/+1375 Health\n+5/+7% Health\n29/43% Poison & Acid Resistance\n18/22% Elemental Resistance\n33/43% Bleeding Resistance\n32/48% Reduced Entrapment Duration\n+2 to Summon Blight Fiend\n\nBonus to All Pets\n+8/+12% Offensive Ability\n+4/+6% Attack Speed\n4/6% Physical Resistance\n18/22% Aether Resistance\n18/22% Chaos Resistance\n33/43% Bleeding Resistance\n32/48% Reduced Entrapment Duration\n\n[Components]\nScaled Hide\nComponent\n+35 Armor\nIncreases Armor Absorption by 20%\n\n[Augments]\nMankind's Vigil\nEpic Augment\n9% Aether Resistance\n9% Chaos Resistance\n\nRequired Player Level: 94\nRequired Physique: 662\nItem Level: 94\n\nAshes of Malmouth\nMI\n\n",
      name: "Taskmaster's Bysmiel-Sect Legguards of Caged Souls",
      grantedSkills: [],
      component: {name: 'Scaled Hide', details: 'Component\n+35 Armor\nIncreases Armor Absorption by 20%'},
      augment: {name: "Mankind's Vigil", details: 'Epic Augment\n9% Aether Resistance\n9% Chaos Resistance'},
    },
  ],
  url: 'https://www.grimtools.com/calc/eVLM65wZ',
  teamSkills: {
    teamSkills: [
      {
        id: 'sk1181',
        childSkillIds: ['sk1182'],
        parentSkillIds: null,
        name: 'Blood of Dreeg',
        level: 8,
        details:
          "Blood of Dreeg\nA binding with the great guardian confers some of Dreeg's regenerative ability, while wounds inflicted by enemies will spray caustic blood as though inflicted upon Dreeg himself. This effect is also applied to nearby allies.\n\nCurrent Level : 8\n52 Energy Cost\n15 Second Skill Recharge\n30 Second Duration\n20 Meter Radius\n20% Health Restored\n23 Acid Damage\n+66 Offensive Ability\n+50 Health Regenerated per second\n84 Acid Retaliation",
        children: [
          {
            id: 'sk1182',
            childSkillIds: [],
            parentSkillIds: ['sk1181'],
            name: 'Aspect of the Guardian',
            level: 12,
            details:
              'Aspect of the Guardian\nDeepening the connection to Dreeg causes enemy attacks on the occultist to impact as though they were striking the quilled scales of the guardian.\n\nCurrent Level : 12\n16 Energy Cost\n+72% Acid Damage\n+72% Vitality Damage\n+72% Poison Damage\n+72% Vitality Decay\n14% Physical Resistance\n100% Poison & Acid Resistance\n+100% to All Retaliation Damage',
            children: [],
            buffedLevel: 12,
            debuffs: [],
            benefits: [
              {numType: '%', value: 72, benefitType: 'Damage', damageType: 'Acid'},
              {numType: '%', value: 72, benefitType: 'Damage', damageType: 'Vitality'},
              {numType: '%', value: 72, benefitType: 'Damage', damageType: 'Poison'},
              {numType: '%', value: 72, benefitType: 'Damage', damageType: 'Vitality Decay'},
              {numType: '%', value: 14, benefitType: 'Resistance', damageType: 'Physical'},
              {numType: '%', value: 100, benefitType: 'Resistance', damageType: 'Poison & Acid'},
              {numType: '%', value: 100, benefitType: 'Damage', damageType: 'All Retaliation'},
            ],
          },
        ],
        buffedLevel: 8,
        debuffs: [],
        benefits: [
          {numType: '%', value: 20, benefitType: 'Health Restored'},
          {numType: 'Flat', value: 23, benefitType: 'Damage', damageType: 'Acid'},
          {numType: 'Flat', value: 66, benefitType: 'OA'},
          {numType: 'Flat', value: 50, benefitType: 'Health Regen'},
          {numType: 'Flat', value: 84, benefitType: 'Damage', damageType: 'Acid Retaliation'},
        ],
      },
      {
        id: 'sk1182',
        childSkillIds: [],
        parentSkillIds: ['sk1181'],
        name: 'Aspect of the Guardian',
        level: 12,
        details:
          'Aspect of the Guardian\nDeepening the connection to Dreeg causes enemy attacks on the occultist to impact as though they were striking the quilled scales of the guardian.\n\nCurrent Level : 12\n16 Energy Cost\n+72% Acid Damage\n+72% Vitality Damage\n+72% Poison Damage\n+72% Vitality Decay\n14% Physical Resistance\n100% Poison & Acid Resistance\n+100% to All Retaliation Damage',
        children: [],
        buffedLevel: 12,
        debuffs: [],
        benefits: [
          {numType: '%', value: 72, benefitType: 'Damage', damageType: 'Acid'},
          {numType: '%', value: 72, benefitType: 'Damage', damageType: 'Vitality'},
          {numType: '%', value: 72, benefitType: 'Damage', damageType: 'Poison'},
          {numType: '%', value: 72, benefitType: 'Damage', damageType: 'Vitality Decay'},
          {numType: '%', value: 14, benefitType: 'Resistance', damageType: 'Physical'},
          {numType: '%', value: 100, benefitType: 'Resistance', damageType: 'Poison & Acid'},
          {numType: '%', value: 100, benefitType: 'Damage', damageType: 'All Retaliation'},
        ],
      },
      {
        id: 'sk1082',
        name: 'Hungering Void',
        details:
          'Hungering Void (33% Chance on Attack)\nThe hungering void empowers you, your allies and your minions, but the power gained comes at a heavy toll to the body.\n\nBound To:\nReap Spirit\n\nCurrent Level : 15\n308 Active Health Cost per Second\n30 Second Skill Recharge\n20 Second Duration\n12 Meter Radius\n+18% Crit Damage\n+370% Vitality Damage\n+370% Chaos Damage\n+370% Vitality Decay\n+10% Total Speed\n720 Chaos Retaliation\n70% Chance of 3 Seconds of Terrify Retaliation\n\nBonus to All Pets\n+200% to All Damage\n+20% Crit Damage\n10% Chance to Stun target for 1 Second\n56% Chance of 30% Slow target for 3 Seconds\n\nAffinity Requirement:\n8\n15\n',
        isSkill: true,
        debuffs: [{numType: 'Reduced%', value: 56, benefitType: 'Total Speed'}],
        benefits: [
          {numType: '%', value: 18, benefitType: 'Damage', damageType: 'Crit'},
          {numType: '%', value: 370, benefitType: 'Damage', damageType: 'Vitality'},
          {numType: '%', value: 370, benefitType: 'Damage', damageType: 'Chaos'},
          {numType: '%', value: 370, benefitType: 'Damage', damageType: 'Vitality Decay'},
          {numType: '%', value: 10, benefitType: 'Total Speed'},
          {numType: 'Flat', value: 720, benefitType: 'Damage', damageType: 'Chaos Retaliation'},
          {numType: '%', value: 200, benefitType: 'Damage', damageType: 'All'},
          {numType: '%', value: 20, benefitType: 'Damage', damageType: 'Crit'},
        ],
      },
      {
        name: 'Devouring Darkness',
        details:
          'Devouring Darkness (Granted by Item)\nThe endless hunger of Yugol empowers you and nearby allies. This ability must be toggled to maintain its effect.\n5 Active Energy Cost per Second\n15 Meter Radius\n5% of Attack Damage converted to Health\n42 Vitality Decay Damage over 2 Seconds\n+75% Vitality Damage\n+75% Bleeding Damage\n+75% Vitality Decay\n250 Energy Reserved\n15% Resistance to Life Reduction',
        debuffs: [],
        benefits: [
          {numType: '%', value: 5, benefitType: 'Lifesteal'},
          {numType: '%', value: 75, benefitType: 'Damage', damageType: 'Vitality'},
          {numType: '%', value: 75, benefitType: 'Damage', damageType: 'Bleeding'},
          {numType: '%', value: 75, benefitType: 'Damage', damageType: 'Vitality Decay'},
        ],
      },
    ],
    healingSkills: [
      {
        id: 'sk1181',
        childSkillIds: ['sk1182'],
        parentSkillIds: null,
        name: 'Blood of Dreeg',
        level: 8,
        details:
          "Blood of Dreeg\nA binding with the great guardian confers some of Dreeg's regenerative ability, while wounds inflicted by enemies will spray caustic blood as though inflicted upon Dreeg himself. This effect is also applied to nearby allies.\n\nCurrent Level : 8\n52 Energy Cost\n15 Second Skill Recharge\n30 Second Duration\n20 Meter Radius\n20% Health Restored\n23 Acid Damage\n+66 Offensive Ability\n+50 Health Regenerated per second\n84 Acid Retaliation",
        children: [
          {
            id: 'sk1182',
            childSkillIds: [],
            parentSkillIds: ['sk1181'],
            name: 'Aspect of the Guardian',
            level: 12,
            details:
              'Aspect of the Guardian\nDeepening the connection to Dreeg causes enemy attacks on the occultist to impact as though they were striking the quilled scales of the guardian.\n\nCurrent Level : 12\n16 Energy Cost\n+72% Acid Damage\n+72% Vitality Damage\n+72% Poison Damage\n+72% Vitality Decay\n14% Physical Resistance\n100% Poison & Acid Resistance\n+100% to All Retaliation Damage',
            children: [],
            buffedLevel: 12,
            debuffs: [],
            benefits: [
              {numType: '%', value: 72, benefitType: 'Damage', damageType: 'Acid'},
              {numType: '%', value: 72, benefitType: 'Damage', damageType: 'Vitality'},
              {numType: '%', value: 72, benefitType: 'Damage', damageType: 'Poison'},
              {numType: '%', value: 72, benefitType: 'Damage', damageType: 'Vitality Decay'},
              {numType: '%', value: 14, benefitType: 'Resistance', damageType: 'Physical'},
              {numType: '%', value: 100, benefitType: 'Resistance', damageType: 'Poison & Acid'},
              {numType: '%', value: 100, benefitType: 'Damage', damageType: 'All Retaliation'},
            ],
          },
        ],
        buffedLevel: 8,
        debuffs: [],
        benefits: [
          {numType: '%', value: 20, benefitType: 'Health Restored'},
          {numType: 'Flat', value: 23, benefitType: 'Damage', damageType: 'Acid'},
          {numType: 'Flat', value: 66, benefitType: 'OA'},
          {numType: 'Flat', value: 50, benefitType: 'Health Regen'},
          {numType: 'Flat', value: 84, benefitType: 'Damage', damageType: 'Acid Retaliation'},
        ],
      },
      {
        id: 'sk1182',
        childSkillIds: [],
        parentSkillIds: ['sk1181'],
        name: 'Aspect of the Guardian',
        level: 12,
        details:
          'Aspect of the Guardian\nDeepening the connection to Dreeg causes enemy attacks on the occultist to impact as though they were striking the quilled scales of the guardian.\n\nCurrent Level : 12\n16 Energy Cost\n+72% Acid Damage\n+72% Vitality Damage\n+72% Poison Damage\n+72% Vitality Decay\n14% Physical Resistance\n100% Poison & Acid Resistance\n+100% to All Retaliation Damage',
        children: [],
        buffedLevel: 12,
        debuffs: [],
        benefits: [
          {numType: '%', value: 72, benefitType: 'Damage', damageType: 'Acid'},
          {numType: '%', value: 72, benefitType: 'Damage', damageType: 'Vitality'},
          {numType: '%', value: 72, benefitType: 'Damage', damageType: 'Poison'},
          {numType: '%', value: 72, benefitType: 'Damage', damageType: 'Vitality Decay'},
          {numType: '%', value: 14, benefitType: 'Resistance', damageType: 'Physical'},
          {numType: '%', value: 100, benefitType: 'Resistance', damageType: 'Poison & Acid'},
          {numType: '%', value: 100, benefitType: 'Damage', damageType: 'All Retaliation'},
        ],
      },
    ],
    debuffs: [
      {
        id: 'sk2146',
        childSkillIds: [],
        parentSkillIds: ['sk2145'],
        name: 'Spectral Wrath',
        level: 10,
        details:
          'Spectral Wrath\nThe spectres empowering you lash out at anything that dares strike you, cursing it with a debilitating spell from beyond the grave.\n\nCurrent Level : 14\n1.1 Second Skill Recharge\n5.4 Second Duration\n4.4 Meter Radius\n68 Vitality Damage\n92 Aether Damage\n-22% Attack Speed\n-29% Physical Resistance\n-29% Vitality Resistance\n-29% Aether Resistance',
        children: [],
        buffedLevel: 14,
        debuffs: [
          {numType: '%', value: -22, benefitType: 'Attack Speed'},
          {numType: '%', value: -29, benefitType: 'Resistance', damageType: 'Physical'},
          {numType: '%', value: -29, benefitType: 'Resistance', damageType: 'Vitality'},
          {numType: '%', value: -29, benefitType: 'Resistance', damageType: 'Aether'},
        ],
      },
      {
        id: 'sk2137',
        childSkillIds: ['sk2138', 'sk2139', 'sk2140'],
        parentSkillIds: null,
        name: 'Bone Harvest',
        level: 1,
        details:
          'Bone Harvest\nThrough a force of necrotic energies, a Necromancer can force the bones of the long forgotten to burst forth from the earth like jagged spines and impale unwary foes.\n\nCurrent Level : 5\n42 Energy Cost\n3 Second Skill Recharge\n7 Meter Range\n168% Weapon Damage\n38 Piercing Damage\n70 Cold Damage\n70 Vitality Damage\n26% Slower target Movement for 3 Seconds',
        autoCastSkill: "Shepherd's Call",
        children: [
          {
            id: 'sk2140',
            childSkillIds: [],
            parentSkillIds: ['sk2137'],
            name: 'Soul Harvest',
            level: 12,
            details:
              'Soul Harvest\nThe bones of the dead fragment and absorb the souls of your foes, empowering you and your minions with the power of death. Soul Harvest affects all attacks and pets while active.\n\nCurrent Level : 16\n5 Second Duration\n86 Cold Damage\n104 Vitality Damage\n+85% Cold Damage\n+85% Vitality Damage\n+85% Frostburn Damage\n+85% Vitality Decay\n\nBonus to All Pets\n40 Vitality Damage\n+85% to All Damage',
            children: [],
            buffedLevel: 16,
            debuffs: [],
          },
          {
            id: 'sk2139',
            childSkillIds: [],
            parentSkillIds: ['sk2137'],
            name: 'Dread',
            level: 1,
            details:
              'Dread\nThe necrotic bone spires pierce into the very essence of your enemies, ripping the life from their bodies and sending weaker foes fleeing, if their lives are not already claimed.\n\nCurrent Level : 5\n5 Energy Cost\n2 Meter Range\n357 Vitality Decay Damage over 3 Seconds\n+40% Pierce Damage\n+40% Cold Damage\n+40% Vitality Damage\n23% Chance to Confuse target for 2 Seconds',
            children: [],
            buffedLevel: 5,
            debuffs: [],
          },
        ],
        buffedLevel: 5,
        debuffs: [{numType: 'Reduced%', value: 26, benefitType: 'Total Speed'}],
      },
      {
        id: 'sk2149',
        childSkillIds: [],
        parentSkillIds: ['sk2147'],
        name: 'Rotting Fumes',
        level: 2,
        details:
          "Rotting Fumes\nThe stench emanating from the blight fiend becomes impossible to withstand, with the very air around the creature inducing vomiting and blurring vision.\n\nCurrent Level : 6\n3 Meter Target Area\n236 Poison Damage over 2 Seconds\nGenerate Additional Threat\n110 Reduced target's Defensive Ability for 2 Seconds\n15% Chance for target to Fumble attacks for 2 Seconds\n15% Chance of Impaired Aim to target for 2 Seconds",
        children: [],
        buffedLevel: 6,
        debuffs: [
          {numType: 'Reduced', value: 110, benefitType: 'DA'},
          {numType: 'Reduced%', value: 15, benefitType: 'Fumble'},
          {numType: 'Reduced%', value: 15, benefitType: 'Impaired Aim'},
        ],
      },
      {
        id: 'sk2126',
        childSkillIds: [],
        parentSkillIds: null,
        name: 'Ill Omen',
        level: 6,
        details:
          "Ill Omen\nThe mere presence of a Necromancer is often enough to inspire terror within their enemies. You unleash a ghostly wail upon your target that shatters the confidence of lesser foes and rapidly spreads confusion and fear amongst your enemies.\n\nCurrent Level : 10\n75 Energy Cost\n5 Second Skill Recharge\n5 Second Duration\n2 Meter Radius\n41 Cold Damage\n61 Vitality Decay Damage per Second\nConfuse target for 2 Seconds\n25% Reduced target's Damage for 1 Second\n-30% Movement Speed",
        autoCastSkill: 'Twin Fangs',
        children: [],
        buffedLevel: 10,
        debuffs: [
          {numType: 'Reduced%', value: 25, benefitType: 'Damage', damageType: 'All'},
          {numType: '%', value: -30, benefitType: 'Movement Speed'},
        ],
      },
      {
        id: 'sk1185',
        childSkillIds: ['sk1186'],
        parentSkillIds: null,
        name: 'Curse of Frailty',
        level: 5,
        details:
          'Curse of Frailty\nA cruel word of power that robs enemies of their fortitude, making them slow and fragile.\n\nCurrent Level : 5\n21 Energy Cost\n8.2 Second Duration\n6.1 Meter Radius\n-38% Movement Speed\n-15% Physical Resistance\n-25% Bleeding Resistance',
        autoCastSkill: 'Will of Rattosh',
        children: [
          {
            id: 'sk1186',
            childSkillIds: [],
            parentSkillIds: ['sk1185'],
            name: 'Vulnerability',
            level: 10,
            details:
              "Vulnerability\nEmpowers the curse's vile potency so that it also weakens the constitution of your enemies, making them more susceptible to witchcraft and poisons.\n\nCurrent Level : 10\n12 Energy Cost\n-75 Defensive Ability\n-25% Poison & Acid Resistance\n-25% Vitality Resistance\n-25% Elemental Resistance",
            children: [],
            buffedLevel: 10,
            debuffs: [
              {numType: 'Flat', value: -75, benefitType: 'DA'},
              {numType: '%', value: -25, benefitType: 'Resistance', damageType: 'Poison & Acid'},
              {numType: '%', value: -25, benefitType: 'Resistance', damageType: 'Vitality'},
              {numType: '%', value: -25, benefitType: 'Resistance', damageType: 'Elemental'},
            ],
          },
        ],
        buffedLevel: 5,
        debuffs: [
          {numType: '%', value: -38, benefitType: 'Movement Speed'},
          {numType: '%', value: -15, benefitType: 'Resistance', damageType: 'Physical'},
          {numType: '%', value: -25, benefitType: 'Resistance', damageType: 'Bleeding'},
        ],
      },
      {
        id: 'sk1186',
        childSkillIds: [],
        parentSkillIds: ['sk1185'],
        name: 'Vulnerability',
        level: 10,
        details:
          "Vulnerability\nEmpowers the curse's vile potency so that it also weakens the constitution of your enemies, making them more susceptible to witchcraft and poisons.\n\nCurrent Level : 10\n12 Energy Cost\n-75 Defensive Ability\n-25% Poison & Acid Resistance\n-25% Vitality Resistance\n-25% Elemental Resistance",
        children: [],
        buffedLevel: 10,
        debuffs: [
          {numType: 'Flat', value: -75, benefitType: 'DA'},
          {numType: '%', value: -25, benefitType: 'Resistance', damageType: 'Poison & Acid'},
          {numType: '%', value: -25, benefitType: 'Resistance', damageType: 'Vitality'},
          {numType: '%', value: -25, benefitType: 'Resistance', damageType: 'Elemental'},
        ],
      },
      {
        id: 'sk1082',
        name: 'Hungering Void',
        details:
          'Hungering Void (33% Chance on Attack)\nThe hungering void empowers you, your allies and your minions, but the power gained comes at a heavy toll to the body.\n\nBound To:\nReap Spirit\n\nCurrent Level : 15\n308 Active Health Cost per Second\n30 Second Skill Recharge\n20 Second Duration\n12 Meter Radius\n+18% Crit Damage\n+370% Vitality Damage\n+370% Chaos Damage\n+370% Vitality Decay\n+10% Total Speed\n720 Chaos Retaliation\n70% Chance of 3 Seconds of Terrify Retaliation\n\nBonus to All Pets\n+200% to All Damage\n+20% Crit Damage\n10% Chance to Stun target for 1 Second\n56% Chance of 30% Slow target for 3 Seconds\n\nAffinity Requirement:\n8\n15\n',
        isSkill: true,
        debuffs: [{numType: 'Reduced%', value: 56, benefitType: 'Total Speed'}],
        benefits: [
          {numType: '%', value: 18, benefitType: 'Damage', damageType: 'Crit'},
          {numType: '%', value: 370, benefitType: 'Damage', damageType: 'Vitality'},
          {numType: '%', value: 370, benefitType: 'Damage', damageType: 'Chaos'},
          {numType: '%', value: 370, benefitType: 'Damage', damageType: 'Vitality Decay'},
          {numType: '%', value: 10, benefitType: 'Total Speed'},
          {numType: 'Flat', value: 720, benefitType: 'Damage', damageType: 'Chaos Retaliation'},
          {numType: '%', value: 200, benefitType: 'Damage', damageType: 'All'},
          {numType: '%', value: 20, benefitType: 'Damage', damageType: 'Crit'},
        ],
      },
      {
        id: 'sk2090',
        name: 'Will of Rattosh',
        details:
          "Will of Rattosh (15% Chance on Attack)\nMark the souls of your foes with the symbol of Rattosh. Their lives and fates sealed, left at the mercy of Rattosh's servant, Typhos.\n\nBound To:\nCurse of Frailty\n\nCurrent Level : 15\n8 Second Duration\n160 Vitality Damage\n185 Aether Damage\n-25% Vitality Resistance\n-8% Life Leech Resistance\n\nAffinity Requirement:\n10\n6\n6\n",
        isSkill: true,
        debuffs: [
          {numType: '%', value: -25, benefitType: 'Resistance', damageType: 'Vitality'},
          {numType: '%', value: -8, benefitType: 'Resistance', damageType: 'Life Leech'},
        ],
      },
      {
        name: "Dreeg's Wounds",
        details:
          "Dreeg's Wounds (Granted by Item)\nLeap through the air towards a target destination and deliver grievous wounds reminiscent of the suffering of the Great Guardian upon your foes.\n70 Energy Cost\n3.5 Second Skill Recharge\n5 Meter Target Area\n16 Meter Range\n260% Weapon Damage\n40% of Retaliation Damage added to Attack\n300 Acid Damage\n300 Vitality Damage\n16% Chance for target to Fumble attacks for 2 Seconds\n16% Chance of Impaired Aim to target for 2 Seconds",
        debuffs: [
          {numType: 'Reduced%', value: 16, benefitType: 'Fumble'},
          {numType: 'Reduced%', value: 16, benefitType: 'Impaired Aim'},
        ],
      },
      {
        name: 'Sovereign',
        details:
          'Sovereign (Granted by Item)\nImpose your supreme will upon your minions, granting them unstoppable strength.\n90 Energy Cost\n30 Second Skill Recharge\n15 Second Duration\n+15% Crit Damage\n+100 Offensive Ability\nBonus to All Pets\n+300% to All Damage\n+22% Crit Damage\n+70 Offensive Ability\n30% Reduced Stun Duration\n30% Reduced Freeze Duration\n30% Reduced Petrify Duration\n30% Reduced Entrapment Duration\n30% Reduced Mind Control Duration\n30% Slow Resistance',
        debuffs: [{numType: 'Reduced%', value: 30, benefitType: 'Total Speed'}],
      },
    ],
    allSkills: [
      {
        id: 'sk1181',
        childSkillIds: ['sk1182'],
        parentSkillIds: null,
        name: 'Blood of Dreeg',
        level: 8,
        details:
          "Blood of Dreeg\nA binding with the great guardian confers some of Dreeg's regenerative ability, while wounds inflicted by enemies will spray caustic blood as though inflicted upon Dreeg himself. This effect is also applied to nearby allies.\n\nCurrent Level : 8\n52 Energy Cost\n15 Second Skill Recharge\n30 Second Duration\n20 Meter Radius\n20% Health Restored\n23 Acid Damage\n+66 Offensive Ability\n+50 Health Regenerated per second\n84 Acid Retaliation",
        children: [
          {
            id: 'sk1182',
            childSkillIds: [],
            parentSkillIds: ['sk1181'],
            name: 'Aspect of the Guardian',
            level: 12,
            details:
              'Aspect of the Guardian\nDeepening the connection to Dreeg causes enemy attacks on the occultist to impact as though they were striking the quilled scales of the guardian.\n\nCurrent Level : 12\n16 Energy Cost\n+72% Acid Damage\n+72% Vitality Damage\n+72% Poison Damage\n+72% Vitality Decay\n14% Physical Resistance\n100% Poison & Acid Resistance\n+100% to All Retaliation Damage',
            children: [],
            buffedLevel: 12,
            debuffs: [],
            benefits: [
              {numType: '%', value: 72, benefitType: 'Damage', damageType: 'Acid'},
              {numType: '%', value: 72, benefitType: 'Damage', damageType: 'Vitality'},
              {numType: '%', value: 72, benefitType: 'Damage', damageType: 'Poison'},
              {numType: '%', value: 72, benefitType: 'Damage', damageType: 'Vitality Decay'},
              {numType: '%', value: 14, benefitType: 'Resistance', damageType: 'Physical'},
              {numType: '%', value: 100, benefitType: 'Resistance', damageType: 'Poison & Acid'},
              {numType: '%', value: 100, benefitType: 'Damage', damageType: 'All Retaliation'},
            ],
          },
        ],
        buffedLevel: 8,
        debuffs: [],
        benefits: [
          {numType: '%', value: 20, benefitType: 'Health Restored'},
          {numType: 'Flat', value: 23, benefitType: 'Damage', damageType: 'Acid'},
          {numType: 'Flat', value: 66, benefitType: 'OA'},
          {numType: 'Flat', value: 50, benefitType: 'Health Regen'},
          {numType: 'Flat', value: 84, benefitType: 'Damage', damageType: 'Acid Retaliation'},
        ],
      },
      {
        id: 'sk1182',
        childSkillIds: [],
        parentSkillIds: ['sk1181'],
        name: 'Aspect of the Guardian',
        level: 12,
        details:
          'Aspect of the Guardian\nDeepening the connection to Dreeg causes enemy attacks on the occultist to impact as though they were striking the quilled scales of the guardian.\n\nCurrent Level : 12\n16 Energy Cost\n+72% Acid Damage\n+72% Vitality Damage\n+72% Poison Damage\n+72% Vitality Decay\n14% Physical Resistance\n100% Poison & Acid Resistance\n+100% to All Retaliation Damage',
        children: [],
        buffedLevel: 12,
        debuffs: [],
        benefits: [
          {numType: '%', value: 72, benefitType: 'Damage', damageType: 'Acid'},
          {numType: '%', value: 72, benefitType: 'Damage', damageType: 'Vitality'},
          {numType: '%', value: 72, benefitType: 'Damage', damageType: 'Poison'},
          {numType: '%', value: 72, benefitType: 'Damage', damageType: 'Vitality Decay'},
          {numType: '%', value: 14, benefitType: 'Resistance', damageType: 'Physical'},
          {numType: '%', value: 100, benefitType: 'Resistance', damageType: 'Poison & Acid'},
          {numType: '%', value: 100, benefitType: 'Damage', damageType: 'All Retaliation'},
        ],
      },
      {
        id: 'sk1082',
        name: 'Hungering Void',
        details:
          'Hungering Void (33% Chance on Attack)\nThe hungering void empowers you, your allies and your minions, but the power gained comes at a heavy toll to the body.\n\nBound To:\nReap Spirit\n\nCurrent Level : 15\n308 Active Health Cost per Second\n30 Second Skill Recharge\n20 Second Duration\n12 Meter Radius\n+18% Crit Damage\n+370% Vitality Damage\n+370% Chaos Damage\n+370% Vitality Decay\n+10% Total Speed\n720 Chaos Retaliation\n70% Chance of 3 Seconds of Terrify Retaliation\n\nBonus to All Pets\n+200% to All Damage\n+20% Crit Damage\n10% Chance to Stun target for 1 Second\n56% Chance of 30% Slow target for 3 Seconds\n\nAffinity Requirement:\n8\n15\n',
        isSkill: true,
        debuffs: [{numType: 'Reduced%', value: 56, benefitType: 'Total Speed'}],
        benefits: [
          {numType: '%', value: 18, benefitType: 'Damage', damageType: 'Crit'},
          {numType: '%', value: 370, benefitType: 'Damage', damageType: 'Vitality'},
          {numType: '%', value: 370, benefitType: 'Damage', damageType: 'Chaos'},
          {numType: '%', value: 370, benefitType: 'Damage', damageType: 'Vitality Decay'},
          {numType: '%', value: 10, benefitType: 'Total Speed'},
          {numType: 'Flat', value: 720, benefitType: 'Damage', damageType: 'Chaos Retaliation'},
          {numType: '%', value: 200, benefitType: 'Damage', damageType: 'All'},
          {numType: '%', value: 20, benefitType: 'Damage', damageType: 'Crit'},
        ],
      },
      {
        name: 'Devouring Darkness',
        details:
          'Devouring Darkness (Granted by Item)\nThe endless hunger of Yugol empowers you and nearby allies. This ability must be toggled to maintain its effect.\n5 Active Energy Cost per Second\n15 Meter Radius\n5% of Attack Damage converted to Health\n42 Vitality Decay Damage over 2 Seconds\n+75% Vitality Damage\n+75% Bleeding Damage\n+75% Vitality Decay\n250 Energy Reserved\n15% Resistance to Life Reduction',
        debuffs: [],
        benefits: [
          {numType: '%', value: 5, benefitType: 'Lifesteal'},
          {numType: '%', value: 75, benefitType: 'Damage', damageType: 'Vitality'},
          {numType: '%', value: 75, benefitType: 'Damage', damageType: 'Bleeding'},
          {numType: '%', value: 75, benefitType: 'Damage', damageType: 'Vitality Decay'},
        ],
      },
    ],
  },
  classNames: ['Necromancer', 'Occultist'],
};
