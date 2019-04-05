
## Assumptions
This small project implementation assumes:
- users can only be a doctor or patient, if they are both they would have to create two seperate accounts


## Overview
- Backend API: runs on localhost:5000
- Front End: runs on localhost:3000
## Steps To Run Application

### 1.Install packages for front end react modules
- npm install
### 2. Install packages for back end nodejs api modules
- cd backend
- npm install
### 3. Seed Data into database
- npm start
- node seed.js
### 4. Start Application
- Start Scripts:
  - npm start in ./backend for backend api
  - npm start in ./ for react

## Account Login
After running the seed script, you should have two test accounts to log into the system with (or issue post request to api/register endpoint or change script params):
### Patient Login:
- email: patient@gmail.com
- password: password
### Doctor Login:
- email: doc@gmail.com
- password: password
