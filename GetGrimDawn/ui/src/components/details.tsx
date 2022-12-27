import {formatParagraphs} from '../formatters/formatText';
import {Item, Skill} from '../types/types';

type CIProps = {
  name: string;
  details: string;
};

export const Details: React.FC<CIProps> = ({name, details}) => {
  return (
    <details>
      <summary>{name}</summary>
      <p>{formatParagraphs(details)}</p>
    </details>
  );
};

export function mapDetails(array: Item[] | Skill[]) {
  return array.map((item) => {
    return <Details name={item.name} details={item.details} />;
  });
}

export function mapSkillsAndChildren(array: Skill[]) {
  return array.map((skill) => (
    <>
      <Details name={skill.name} details={skill.details} />
      {skill.children && skill.children.length ? mapDetails(skill.children) : ''}
    </>
  ));
}
