const aussieStates = {
  NSW: '',
  TAS: '',
  WA: '',
  VIC: '',
  ACT: '',
  NT: '',
  SA: '',
};

export type AussieState = keyof typeof aussieStates;

export const AussieStates = Object.keys(aussieStates);

export function AussieStateOptions() {
  const states = [];

  for (const state of AussieStates) {
    states.push({value: state});
  }
  return states;
}

export function isAussieState(value: string): value is AussieState {
  return value in aussieStates === true;
}
