export function setErrorMessage(id: string, errorMessage: string) {
  const element = document.getElementById('errMsg-' + id);
  if (element) {
    element.innerText = errorMessage;
  } else console.log("Couldn't find element with ID: " + id);
}

export function clearErrorMessages(idArray: string[]) {
  for (const id of idArray) {
    setErrorMessage(id, '');
  }
}
