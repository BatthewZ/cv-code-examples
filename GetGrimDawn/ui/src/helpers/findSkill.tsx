import {Skill} from '../types/types';

export function findSkill(name: string, skills: Skill[]) {
  for (const skill of skills) {
    if (skill.name === name) return skill;

    if (skill.children && skill.children.length) {
      const childSkill = skill.children.find((s) => s.name === name);
      if (childSkill) return childSkill;
    }
  }
}
