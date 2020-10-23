# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...
Welcome to the nine men's morris game.For game rules please refer this website 'https://www.mastersofgames.com/rules/morris-rules.htm'

## User Stories
In this game user can create a game.
User can see the list of first four game that was played.
User can see the name of players and the current game.
User can delete a game.


## Ruby Version

we have used Ruby version 2.6.1p33

## System Dependencies

we have added the gem 'rack-cors' and gem 'active_model_serializers', '~> 0.10.0'. and then done bundle install.

## Configuration

First we created a new git repository. Made a new directory and created a new directory and inside that directory created two directories frontend and backened.In the frontend in the src folder added asset directory where the background image is stored and created an html file, a css file and a js file . the logic is in the js file. For the backend  directory generated a new rails app  --api.

## Database Creation

For the database creation generated the models and controllers with rails g resource modelname colname. Then after creating the table and putting the relationship in the models did rails db:migrate then created some seeds and did rails db:seed to test the data. 

## To Run The Test Suite

To run the app first cd into the frontend directory and the do open src/index.html to open the html file in the browser.To get the html file connected to the database and working cd into the backend and do rails s to start the rails server in this way all the data from backend goes to the frontend.



## Acknowledgement

To my instructors Ix Procopios and Adam La Rosa for encouraging me and helping me through my project.

Created By
Arpita Dutta
