import {allSkillsParagraph, healingSkillsParagraph, teamSkillsParagraph} from '../helpers/teamSkillsParagraphs';
import {Character} from '../types/types';
import {BenefitsAndSkills} from '../views/benefitsAndSkillsView';
import {mapDetails, mapSkillsAndChildren} from './details';

type DFProps = {
  character: Character;
  viewType: string;
};

export const DetailsFactory: React.FC<DFProps> = ({character, viewType}) => {
  switch (viewType) {
    case 'Items':
      return <>{mapDetails(character.items)}</>;
    case 'Devotions':
      return <>{mapDetails(character.devotions)}</>;
    case 'Skills':
      return <>{mapSkillsAndChildren(character.skills)}</>;
    case 'Team Skills':
      return <BenefitsAndSkills skills={character.teamSkills.teamSkills} paragraph={teamSkillsParagraph()} />;
    case 'Healing':
      return <BenefitsAndSkills skills={character.teamSkills.healingSkills} paragraph={healingSkillsParagraph()} />;
    case 'All Skills':
      return (
        <BenefitsAndSkills
          skills={character.teamSkills.allSkills}
          paragraph={allSkillsParagraph()}
          debuffsAsWell={character.teamSkills.debuffs}
        />
      );
    case 'Debuffs':
      return <BenefitsAndSkills skills={character.teamSkills.debuffs} paragraph={''} isDebuff={true} />;
    default:
      return <></>;
  }
};
