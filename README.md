## Project Description

**Project Title**

Cryptocurrency Tracker

**Project Description**

Cryptocurrency app that lets you track coin performances (current, historic), create watchlists, manage and visualize your own portfolio.

**Target Audience**

Crypto enthusiasts and traders.

**Team Members**

Joseph Shin, Sanjay Swamy, Sean Jin

---

## User Stories

- As a user, I want to be able to register with my name, email, and password because I want to add coins to my watchlist and track my portfolio
- As a user, I want to be able to login with my email and password
- As a user, I want to be able to see the top 100 coins and its performances on the front page because I want to see what coins are the most popular
- As a user, I want to be able to click on a coin and see the price and the price chart of that coin because I want to see the price history of that coin
- As a user, I want to be able to add certain coins to my watch list because I want a place where I can store and easily access these coins
- As a user, I want to be able to manually enter all my holdings from different exchanges and see data related to my holdings such as balance, profit, and loss because it is hard to keep track of my assets in different exchanges all at once

---

## Features

---

## Wireframes

Wireframes are a visual representation of the skeletal structure of your app. It should lay out the structure hierarchy and relationships between the different element of your app. Ideally, you should use a simple design software to get your wireframes done (draw.io, balsamiq, etc).
Deliverable: Wireframe designs

---

## Entity Relationship Diagram

You need to design the database ERD and define what are the tables and their relationships. You should use a design software (draw.io or any other) to draft the ERD.
Deliverable: ERD design

---

## API Routes

---

## Front-End Routes (views/components)

---

## Stack Choices

**Front-End**

HTML
CSS
ReactJS
d3.js or chart.js (data visualization)
Material UI (React CSS library). Possibly Chakra UI (React CSS library)

**Back-End**
NodeJS
Express
Database
PostgresSQL

---

## Project Set-Up

**Front End**

npx create-react-app myapp

**Backend**

Npx express-generator --no-view --git backend

**Front end Router**

Npm install react-router-dom

---

## Git Workflow

**Possible flow (Check with mentor)**

Working on your own feature branch 
- create new branch --> git checkout -b <name_of_branch>
- adding new files/changes to the branch --> git add .
- commit new files/changes to the branch --> git commit -m "message"
- push the branch changes to Github --> git push origin <name_of_branch> 

Merging your branch to the Master branch 
- checkout master branch --> git checkout master
- pull any changes --> git pull
- merge your branch --> git merge <name_of_branch>
- push the merge --> git push 

Tell everyone you have merged and pushed your branch 
- for everyone else, pull the change --> git pull

---

## Questions for Mentor

Using third party API (coingecko api), do we store the info that we fetch into the database? Or do we periodically fetch the data in our back-end? What is recommended and what is faster
What exactly is an API backend route, is it just used to serve requests coming from the front end and pass down response?