# Carolina Clicker

## Description
Carolina Clicker is an "incremental" game where you collect fever points by clicking a picture of Rameses. As you progress through the game, you can buy upgrades that increase your clicking ability. High scores are kept for every player.

## Installation Requirements/Instructions
- Chrome Browser (web browser)
- Node.js (Javascript Runtime)

The Chrome web browser and Node.js Javascript Runtime must be installed to run our app.

## Dependency List
- better-sqlite3
- browser-sync
- concurrently
- cors
- express
- md5

## Run Instructions
Open the project directory in a terminal and use the command "npm run start."


## [Documentation](https://github.com/jdmar3-comp426/a99-finale/tree/main/docs)
## Detailed Documentation sections
[Development Details](./docs/DEV_DETAILS.md)
[API Endpoints](./docs/API_ENDPOINTS.md)

 - Gameplay
    - Game loads into login page which provides user the option to login to their account or start a new game.
    Startup page loads user's high score and profile information at the bottom of the screen along with the option to delete their account.
 - High Scores
    -High score stored as a variable specific to each user. High score will display each user sorted in order of high score from ascending to descending.
 - User Profile Updates
