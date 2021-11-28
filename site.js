const loginForm = document.querySelector("#easyform");

form.addEventListener("submit", e => {
  e.preventDefault();
  addUser(form);
});
  
const addUser = form => {
  const userXHR = new XMLHttpRequest();
  const interactionXHR = new XMLHttpRequest();

  // Bind the FormData object and the form element
  const FD = new FormData(form);

  // Define what happens on successful data submission
  userXHR.addEventListener("load", function(event) {console.log(event.target.responseText);});
  interactionXHR.addEventListener("load", function(event) {console.log(event.target.responseText);});

  // Define what happens in case of error
  userXHR.addEventListener("error", function( event ) {console.log('Something went wrong.');});
  interactionXHR.addEventListener("error", function( event ) {console.log('Something went wrong.');});

  // Set up our request
  userXHR.open( "POST", "http://localhost:5000/app/newuser" );
  interactionXHR.open( "POST", "http://localhost:5000/app/newinteractions" );

  // The data sent is what the user provided in the form
  userXHR.send( FD );
  interactionXHR.send( {"user": FD.get('user')} );
}

