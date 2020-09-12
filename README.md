## Dungeons and Divs
This project was created by Kory Brantley and Tyler Jones beginning in April 2020. Dungeons and Divs is capable of connecting DM's with their players and their characters in a way that makes it easy for successful D&D campaigns. 

Dungeons and Divs was created using React for our frontend and Mongoose/MongoDB for our backend. The backend is currently hosted on Heroku using their free plan and utilizing the Express.js and Axios frameworks.

### How to run the app
Make sure you have the npm package manager. Navigate to the directory where you have cloned the application.

When you are in the same directory, run:
`npm install`

Once all of the packages have been installed, run:
`npm start`

and the app should begin running on a local port. This is a work in progress so be kind with any bugs.

### Latest Updates
September 2020: The app can now handle users and DMs possessing multiple parties. This was also intergrated with the chat widget to allow for multiple chats.

August 2020: A Chat Widget was created from the ground up, allowing members of the same parties to be able to communicate with each other in real time. A "Live Status" switch was added to preserve API calls, as the server is on a free plan. 

July 2020: The original Firebase DB and simple backend was switched over to a Mongooose/MongoDB database and backend. This was necessary to ensure easier object handling and the utilization of a RESTful API. As a result of the new backend, avatars were removed but will hopefully return in a later update.

May 2020: The original character sheet and full list of character sheets was added. Character sheets could also have avatars so users could personalize their characters.
