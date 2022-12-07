import {CharFormStateKey} from '../formstate/characteristics_formstate';
import {ScenFormStateKey} from '../formstate/scenario_formstate';

type errorId = CharFormStateKey | ScenFormStateKey | 'socRange';

export function setError(id: errorId, errMsg: string) {
  const errMsgSpan = document.getElementById('errMsg-' + id);
  if (errMsgSpan) errMsgSpan.innerText = errMsg;
  const inputContainer = document.getElementById(id + '-InputContainer');
  if (inputContainer) inputContainer.style.border = '1px solid red';
}

export function clearError(id: errorId) {
  const errMsgSpan = document.getElementById('errMsg-' + id);
  if (errMsgSpan) errMsgSpan.innerText = '';
  const inputContainer = document.getElementById(id + '-InputContainer');
  if (inputContainer) inputContainer.style.border = '';
}

export function setSelectValue(id: string, value: string) {
  const element = document.getElementById(id) as HTMLInputElement;
  if (element) {
    element.value = '' + value;
  }
}

export function setAlphaNumericInputValue(id: string, value: string) {
  const element = document.getElementById(id) as HTMLInputElement;
  if (element) {
    element.value = '' + value;
    return;
  }
}

export function checkRadioButton(name: CharFormStateKey | ScenFormStateKey, value: string) {
  const radioButton = document.querySelector(`input[name="${name}"][value="${value}"]`) as HTMLInputElement;
  if (radioButton) radioButton.checked = true;
}

export function unCheckRadioButtons(name: CharFormStateKey | ScenFormStateKey) {
  const checkedRadio = document.querySelector(`input[name="${name}"]:checked`) as HTMLInputElement;
  if (checkedRadio) {
    checkedRadio.checked = false;
  }
}

export function scrollToBottom(elementId: string) {
  const element = document.querySelector(elementId);
  // console.log('Element is: ', element);
  if (element) window.scrollTo(0, element.scrollHeight);
}

export function scrollToView(elementId: string) {
  const element = document.querySelector(elementId);
  console.log('Element with id of ' + elementId + ' is: ', element);
  if (element) element.scrollIntoView();
}

export function scrollToBottomInput() {
  const elements = document.querySelectorAll(`[id*='-InputContainer']`);
  if (elements && elements.length) elements[elements.length - 1].scrollIntoView();
}

export function getSelectOptionsFromArray(optionsArr: number[] | string[]) {
  return optionsArr.map((val) => {
    return {value: '' + val};
  });
}
