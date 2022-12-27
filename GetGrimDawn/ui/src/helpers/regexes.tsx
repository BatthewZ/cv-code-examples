export type BuffRegex = 'resistance' | 'armor' | 'oaAndDa' | 'healing' | 'health' | 'speed' | 'dmg';
export function buffRegex(buffType: BuffRegex) {
  switch (buffType) {
    case 'resistance':
      return /^\+?\d+(\/\+\d+)?% [a-zA-Z &]+ (Resistance)$/;
    case 'armor':
      return /^(\+\d+ (Armor))|((Increases Armor by) \d+%)$/;
    case 'oaAndDa':
      return /^\+\d+%? (Off|Def)[a-zA-Z ]+$/;
    case 'healing':
      return /^.+(Health Restored|Health Regenerated|Health Regeneration by)(.+)?$/;
    case 'health':
      return /^\+\d+%? (Health)$/;
    case 'speed':
      return /^\+\d+% [a-zA-Z]+ (Speed)$/;
    case 'dmg':
      return /^((\+\d+(\/\+\d+)?)|(\d+\-?\d+?))%? [a-zA-Z ]+ (Decay|Damage)(( with)[a-zA-Z0-9%\+ ]+)?$/;
  }
}

export type DebuffRegex = 'percentageResReduction' | 'oaAndDa' | 'speed' | 'reducedTarget';
export function debuffRegex(debuffType: DebuffRegex) {
  switch (debuffType) {
    case 'percentageResReduction':
      return /^\-\d+% [a-zA-Z &]+(Resistance)$/;
    case 'oaAndDa':
      return /^\-\d+%? (Off|Def)[a-zA-Z ]+$/;
    case 'speed':
      return /^\-\d+% [a-zA-Z]+ (Speed)$/;
    case 'reducedTarget':
      return /^\d+%? (Reduced target's) [0-9a-zA-Z ]+$/;
  }
}
