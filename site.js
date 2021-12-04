// Access the form elements
const loginForm = document.querySelector("#login");
const createForm = document.querySelector("#createUser");
const deleteForm = document.querySelector("#deleteUser");

// Add submit event listeners for each of the forms that go
// to their respective functions
loginForm.addEventListener( "submit", e => {
    e.preventDefault();
    loginUser(loginForm);
});

createForm.addEventListener( "submit", e => {
    e.preventDefault();
    newUser(createForm);
});

deleteForm.addEventListener( "submit", e => {
    e.preventDefault();
    deleteUser(deleteForm);
});

// Show functions for the create and delete user forms, so
// that they can be shown when requested
const showCreate = _ => {
  document.querySelector("#createPanel").style.visibility = "visible"
  document.querySelector("#deletePanel").style.visibility = "hidden"
}

const showDelete = _ => {
  document.querySelector("#deletePanel").style.visibility = "visible"
  document.querySelector("#createPanel").style.visibility = "hidden"
}

// Function to log in the user on submission of the form
const loginUser = form => {
  const XHR = new XMLHttpRequest();

  // Bind the FormData object and the form element
  const FD = new URLSearchParams(new FormData(form));

  // Define what happens on successful data submission
  XHR.addEventListener("load", e => {
    let response = JSON.parse(e.target.responseText);
    // If the response included the user's information
    if (XHR.status === 200) {
      // Update user's last login information
      updateLastLogin(FD.get("user"));
      alert("Login successful for user: " + FD.get("user"));
      // Store username in local storage to be used by the game
      localStorage.setItem("user", FD.get("user"));
      // Navigate to the game
      window.location.href = "/game";
    } else {
      alert("Login unsuccessful");
    }
  });

  // Define what happens in case of error
  XHR.addEventListener("error", e => console.log("Something went wrong."));

  // Set up our request
  XHR.open("GET", "http://localhost:5000/app/login/" + FD.get("user") + "/" + FD.get("pass"));

  // The data sent is what the user provided in the form
  XHR.send();

  // Clear the form
  form.reset();
}

// Function for creating a new user
const newUser = form => {
  const XHR = new XMLHttpRequest();

  // Bind the FormData object and the form element
  const FD = new URLSearchParams(new FormData(form));

  // Define what happens on successful data submission
  XHR.addEventListener("load", e => {
    alert("New user created with username: " + FD.get("user"));
    // Store username in local storage to be used by the game
    localStorage.setItem("user", FD.get("user"));
    // Navigate to the game
    window.location.href = "/game";
  })

  // Define what happens in case of error
  XHR.addEventListener("error", e => console.log("Something went wrong."));

  // Set up our request
  XHR.open("POST", "http://localhost:5000/app/new");

  // The data sent is what the user provided in the form
  XHR.send(FD);

  // Clear the form
  form.reset();
}

// Function to delete user on form submission
const deleteUser = form => {
  const XHR = new XMLHttpRequest();

  // Bind the FormData object and the form element
  const FD = new URLSearchParams(new FormData(form));

  // Define what happens on successful data submission
  XHR.addEventListener("load", e => console.log(e.target.responseText));

  // Define what happens in case of error
  XHR.addEventListener("error", e => console.log("Something went wrong."));

  // Confirm user wishes to delete account with that username
  if (confirm("Press ok to delete the account with username " + FD.get("user"))) {
    // Set up our request
    XHR.open("DELETE", "http://localhost:5000/app/delete/user/" + FD.get("user"));

    // The data sent is what the user provided in the form
    XHR.send();
  }

  // Clear the form
  form.reset();
}

// Function to specifically update last user login
const updateLastLogin = user => {
  const XHR = new XMLHttpRequest();

  // Bind the FormData object and the form element (holding
  // today's date)
  const FD = new URLSearchParams({"lastLogin": new Date().toLocaleDateString()});

  // Define what happens on successful data submission
  XHR.addEventListener("load", e => console.log(e.target.responseText));

  // Define what happens in case of error
  XHR.addEventListener("error", e => console.log("Something went wrong."));

  // Set up our request
  XHR.open("PATCH", "http://localhost:5000/app/update/user/" + user);

  // Send the request
  XHR.send(FD);
}
