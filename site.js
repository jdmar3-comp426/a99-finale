// Access the form elements
const createForm = document.querySelector("#createUser");
const deleteForm = document.querySelector("#deleteUser");

createForm.addEventListener( "submit", e => {
    e.preventDefault();
    newUser(createForm);
});

deleteForm.addEventListener( "submit", e => {
    e.preventDefault();
    deleteUser(deleteForm);
});

const newUser = form => {
  const userXHR = new XMLHttpRequest();
  const interactionXHR = new XMLHttpRequest();

  // Bind the FormData object and the form element
  const FD = new URLSearchParams(new FormData(form));

  // Define what happens on successful data submission
  userXHR.addEventListener( "load", e => console.log(e.target.responseText));
  interactionXHR.addEventListener( "load", e => console.log(e.target.responseText));

  // Define what happens in case of error
  userXHR.addEventListener("error", e => console.log("Something went wrong."));
  interactionXHR.addEventListener("error", e => console.log("Something went wrong."));

  // Set up our request
  userXHR.open("POST", "http://localhost:5000/app/newuser");
  interactionXHR.open("POST", "http://localhost:5000/app/newinteractions");

  // The data sent is what the user provided in the form
  userXHR.send(FD);
  interactionXHR.send(FD);
}

const deleteUser = form => {
  const userXHR = new XMLHttpRequest();
  const interactionXHR = new XMLHttpRequest();

  // Bind the FormData object and the form element
  const FD = new URLSearchParams(new FormData(form));

  // Define what happens on successful data submission
  userXHR.addEventListener( "load", e => console.log(e.target.responseText));
  interactionXHR.addEventListener( "load", e => console.log(e.target.responseText));

  // Define what happens in case of error
  userXHR.addEventListener("error", e => console.log("Something went wrong."));
  interactionXHR.addEventListener("error", e => console.log("Something went wrong."));

  // Set up our request
  userXHR.open("DELETE", "http://localhost:5000/app/delete/user/"+FD.get("user"));
  interactionXHR.open("DELETE", "http://localhost:5000/app/delete/interactions/"+FD.get("user"));

  // The data sent is what the user provided in the form
  userXHR.send();
  interactionXHR.send();
}

