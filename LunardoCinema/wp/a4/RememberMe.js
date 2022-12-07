function rememberMe() {
  console.log("Element is checked: " + document.getElementById('rememberMe').checked);
  localStorage.setItem('name', document.getElementById('nameInputID').value);
  localStorage.setItem('email', document.getElementById('emailInputID').value);
  localStorage.setItem('mobile', document.getElementById('mobileInputID').value);
  localStorage.setItem('rememberMe', 'true');
}

function toggleMemory(){
  if (document.getElementById('rememberMe').checked) {
    localStorage.clear();
    document.getElementById('rememberMeLabel').innerText = 'Remember Me';
  } else {
    rememberMe();
    document.getElementById('rememberMeLabel').innerText = 'Forget Me';
  }
}

function setInfoFromLocalStorage() {
  document.getElementById('nameInputID').value = localStorage.getItem('name');
  document.getElementById('emailInputID').value = localStorage.getItem('email');
  document.getElementById('mobileInputID').value = localStorage.getItem('mobile');
  console.log("Rmemebr Me is: " + localStorage.getItem('rememberMe'));
  if (localStorage.getItem('rememberMe')){
    document.getElementById('rememberMe').checked = true;
  }
}

function createCheckBox() {
  const label = localStorage.getItem('rememberMe') ? "Forget Me" : "Remember Me";

  document.write(`<div style="text-align: center;">
  <input type="checkbox" name="rememberMe" id="rememberMe">
  <label for="rememberMe" id="rememberMeLabel" onclick="toggleMemory()">${label}</label>
  </div>`);
}
