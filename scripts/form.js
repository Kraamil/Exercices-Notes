const LOGIN_FORM = document.getElementById('formulaire');
const USERNAME_INPUT = document.getElementById('username');
const AGE_INPUT = document.getElementById('age');
const PASSWORD_INPUT = document.getElementById('password');
const PASSWORD_CONF_INPUT = document.getElementById('password-confirmation');
const TABLE = document.getElementById('table');


async function hashSha512(message) {

    const msgBuffer = new TextEncoder().encode(message);     
    const hashBuffer = await crypto.subtle.digest("SHA-512", msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));                
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");

    return hashHex;
}

let id = 0;
let already_used = [];
let already_used_id = [];

console.log(document.getElementById('caca'));

LOGIN_FORM.addEventListener("submit", (event) => {
  
  let userv = USERNAME_INPUT.value;
  let agev = AGE_INPUT.value;
  let passwv = PASSWORD_INPUT.value;
  let passwcv = PASSWORD_CONF_INPUT.value;

  const today = new Date();
  const date = today.getDate()+'/'+(today.getMonth()+1);
  
  const time = today.getHours() + ":" + today.getMinutes() + ":"+ today.getSeconds();
  const dateTime = date+' '+time;

  var user_valid = false;
  var passw_valid = false;

  //check if the username is under 20 character
  if (userv.length <= 20) {
    user_valid = true;
  } else {
    window.alert('Le pseudo doit être inférieur à 20 caractères');
  }

  //check if the passwords matches
  if (passwv==passwcv) {
    passw_valid = true;
  } else {
    window.alert('Les mots de passe ne correspondent pas.')
  }

  //cehck if the username is already used
  if (already_used.includes(userv)) {
    window.alert('Le pseudo est deja utilisé.')
    USERNAME_INPUT.value='';
  }

  if (user_valid && passw_valid && !already_used.includes(userv)) {

    id++;

    const tableau = document.getElementById("table");
    const row = tableau.insertRow(-1);

    row.setAttribute("id", "row"+id, 0);
    
    already_used.push(userv);
    already_used_id.push(id);
    
    const id_cell = row.insertCell(0);
    const name_cell = row.insertCell(1);
    const age_cell = row.insertCell(2);
    const date_cell = row.insertCell(3);
    const hash_cell = row.insertCell(4);
    const del_cell = row.insertCell(5);
    
    id_cell.innerText += id;
    name_cell.innerText += userv;

    name_cell.setAttribute("id", "name"+id, 0);

    age_cell.innerText += agev;
    date_cell.innerText += dateTime;

    hashSha512(passwv).then(result => { 
      hash_cell.innerText += result;
    });
    hash_cell.setAttribute("class", "hash", 0);

    del_cell.innerHTML += "<button type='submit' id="+id+" onClick='removeRow(this.id)'>Supprimer</button>";

    USERNAME_INPUT.value='';
    AGE_INPUT.value='';
    PASSWORD_INPUT.value='';
    PASSWORD_CONF_INPUT.value='';
  }
    
  
});

function removeRow(button_id) {
  let name_id = "name"+button_id;
  let index = already_used.indexOf(button_id);
  console.log(index);
  already_used.splice(index, 1);
  already_used_id.splice(index, 1);
  console.log(already_used, already_used_id);

  let row_id = "row"+button_id;
  document.getElementById(row_id).remove();
}
