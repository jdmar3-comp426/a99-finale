
# Implementation Details

## Overview

Our app was developed with HTML, CSS, and JavaScript. We used “express” and “better-sqlite3” for our web server and database respectively. We built a custom API to manage user accounts, which keep track of game progress.

## Details

- Startup
   - Game loads into login page which provides user the option to login to their account or make a new account.
   - Startup page loads user's high score and profile information at the bottom of the screen along with the option to delete their account.
- server
   - server.js
      - Game is implemented using a backend API that is specified in the file titled ‘server.js’. This file designates the required dependencies to run the server and sets up the server on port 5000. The server.js file also designates API endpoints that allow users to create, read, login, and delete a user from the database and throws errors when the processes are unsuccessful.
   - database.js
      - database.js file checks whether the database already exists and initializes the database if it does not exist.
      - exports the database to be accessed in other files.
- game functionality
   - game.js
      - The user name from login is grabbed from local storage and then used with a new XHR object that is used to then load all of the game variables from the user’s last save in the database, so their progress can be saved.
      - All of the initial display values set up with the setInitialDisplays() function is called when the initial values are requested from the database. During this function, the autosave interval is also set up to save the user’s progress in the database every three seconds. The autoclicker is also set up with the correct interval to automatically increase score if this has been unlocked. 
      - Each time the player’s score is increased, the updateScore() function is called to change the score displayed to the user. 
      - Checks whether the player has enough points to purchase upgrade and if the current point value is greater than or equal to the upgrade cost, the score is updated to reflect the new value and Ramses level is incremented. This function also triples the cost of future upgrades. 
      - Auto-clicker allows user to purchase a feature to automatically gain points over time. Default score is increased every set period of time using the setInterval() function and this time duration reduces as the auto-clicker is upgraded. Auto-clicker timer is determined by the current autoClickerLevel value.
      - updateScore(), updateCost(), and updateClickerCost() functions modify the html file in order to display the new values of each variable to the user. These functions are called every time the value of the variable changes.
      - autoSaveSetup() specifies the values of each variable to be save in the server and throws an error if this is unsuccessful. This function ensures that the game details are auto-saved when the user leaves the website.
   - front-end
      - index.html file positions text and image elements on the game webpage. User information, various upgrade options, as well as the current player score are displayed as headings so that the player can view their game progress
      - Images of ramses and deanDome are positioned to the left and are the main focus of the game webpage. Image files are stored under /game/assets and are accessed in the html file.
      - A button element titled “Back to login page” allows the user to exit the current game and return to the login screen. Game saves automatically when the user exists.
      - CSS Stylesheet specifies the font and background of the text on all game sites. User information and score details are aligned to the right of the screen. Images of Ramses and Dean Dome are aligned to the left and are given a 5% margin. Stylesheet also specifies text color, font, padding, and alignment for all links, buttons, and text elements.
- site
   - site.js file communicates with the server to update the user information in the database. Checks whether the user inputted correct login information and navigates to the /game/ site if successful. 
   - specifies function for creating a new user and sending the newly inputted values to be added to the database, navigates to the /game site when information is sent correctly.
   - Specifies function to delete a user by retrieving the inputted username from the user and sending the request to the server to delete that username.
   - Updates information in the database regarding the date of the user’s last login.
   