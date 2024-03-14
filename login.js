import {  student } from "./student.js";

export function userLogin() {
  let userJwt;

  const mainLogin = document.getElementById('mainLogin');
  const badCred = document.getElementById('badCred');

  const storedUserJwt = localStorage.getItem('userJwt');
  if (storedUserJwt) {
      userJwt = JSON.parse(storedUserJwt);
      validateUserJwt(userJwt)
  }
  document.getElementById('credForm').addEventListener('submit', function(event) {
      event.preventDefault();

      const username = document.querySelector('.login-input[placeholder="Username"]').value;
      const password = document.querySelector('.login-input[placeholder="Password"]').value;

      const authString = 'Basic ' + btoa(`${username}:${password}`);

      fetch('https://learn.zone01dakar.sn/api/auth/signin', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': authString
          },
          body: JSON.stringify({
              username: username,
              password: password
          })
      })
      .then(response => response.json())
      .then(data => {
          console.log(data);
          if (data.error) {
              badCred.style.display = "block";
          } else {
              userJwt = data;
              localStorage.setItem('userJwt', JSON.stringify(userJwt));
              // Rediriger vers une autre page ou effectuer d'autres actions après une connexion réussie
              console.log("reussi");
              student(userJwt);
          }
      })
      .catch(error => {
          console.error('Error:', error);
      });
  });

  // Fonction pour valider le JWT utilisateur (à implémenter selon vos besoins)
  function validateUserJwt(newUserJwt) {
    if (!userJwt || JSON.stringify(newUserJwt) !== JSON.stringify(userJwt)) {
        localStorage.removeItem('userJwt');
        document.body.appendChild(mainLogin);
    } else {
        student(userJwt);
    }
}
}

userLogin();
