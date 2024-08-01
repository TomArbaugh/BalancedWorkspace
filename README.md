# Balanced Workspace

Balanced Workspace is a ticketing system designed to help your company operate more efficiently and ease the stress of communication within your organization. 

# Live Link
https://www.balancedworkspace.org

# Tech Stack




## Getting started

1. Clone this repository (only this branch).

2. Install dependencies.

   ```bash
   pipenv install -r requirements.txt
   ```

3. Create a __.env__ file based on the example with proper settings for your
   development environment.

4. Make sure the SQLite3 database connection URL is in the __.env__ file.

5. This starter organizes all tables inside the `flask_schema` schema, defined
   by the `SCHEMA` environment variable.  Replace the value for
   `SCHEMA` with a unique name, **making sure you use the snake_case
   convention.**

6. Get into your pipenv, migrate your database, seed your database, and run your
   Flask app:

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```


8. To run the React frontend in development, `cd` into the __react-vite__
   directory and run `npm i` to install dependencies. Next, run `npm run dev`.


 ### Database:
 ![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)

  ### Hosting:
 ![Render](https://img.shields.io/badge/Render-%46E3B7.svg?style=for-the-badge&logo=render&logoColor=white)

# MVP Feature List

Welcome to the BalancedWorkspace wiki!

MVP's Feature List

1. Ticket

CREATE: Logged-in user can create an outgoing ticket. 
READ: Logged-in user can edit an incoming ticket.
UPDATE: Logged-in user can mark an incoming ticket as complete, and can amment an out going ticket.
DELETE: Logged-in user can delete an outgoing ticket. 

2. Customer

CREATE: Logged-in user can create a customer.
READ: Logged-in user can see all of their customers. 	
UPDATE: Logged-in user can edit their customers' information.
DELETE: Logged-in user can delete their customers. 

3. Macros

CREATE: Logged-in user can create a bank of canned responses tailored to meet frequent requests (such as requests for new office supplies).
READ: Logged-in user can view a list of their canned responses.
UPDATE: Logged-in user can edit their canned responses as their services, resources, or processes change.
DELETE: Logged-in user can delete canned responses when they are no longer needed.

4. Message Triggers

CREATE: Logged-in user can create a message trigger.
READ: Logged-in user can view their existing message triggers, and messages that have been sent by message triggers.
UPDATE: Logged-in user can update their message triggers.  
DELETE: Logged-in user can delete their message triggers.

 # Schema

 ![image]()

Table users { //employee
  id integer [primary key]
  username varchar [not null, unique]
  hashedPassword varchar [not null]
  email varchar [not null, unique]
}

Table customers {
  id integer [primary key, not null]
  user_id integer [not null, ref: > users.id]
  name varchar [not null]
  email varchar [not null]
}

Table tickets {
  id integer [primary key]
  user_id integer [not null, ref: > users.id]
  customer_id integer [not null, ref: > customers.id]
  title varchar [not null]
  requester varchar [not null]
  Assignee varchar [not null]
  type select [not null]
  priority select [not null]
  topic select [not null]
  photo_url varchar
  apply_macro select [not null, ref: > macros.id] 
}

Table macros {
   id integer [primary key]
   use_id integer [ref: > users.id]
   name varchar [not null]
   description varchar [not null]
   available_for select [not null]
   actions select [not null]
}

Table messages { //shown in sent-box when ticket closed or customer deleted
  id integer [primary key]
  sender_id integer [ref: > users.id]
  receiver_id integer [ref: > users.id]
  message varchar [not null]
}

# User Stories
 
Users

Sign Up

As an unregistered and unauthorized user, I want to be able to sign up for the website via a sign-up form. When I'm on the /signup page: I would like to be able to enter my email, username, and preferred password on a clearly laid out form. I would like the website to log me in upon successful completion of the sign-up form. So that I can seamlessly access the site's functionality When I enter invalid data on the sign-up form: I would like the website to inform me of the validations I failed to pass, and repopulate the form with my valid entries (except my password). So that I can try again without needing to refill forms I entered valid data into. Log in

As a registered and unauthorized user, I want to be able to log in to the website via a log-in form. When I'm on the /login page: I would like to be able to enter my email and password on a clearly laid out form. I would like the website to log me in upon successful completion of the log-in form. So that I can seamlessly access the site's functionality When I enter invalid data on the log-in form: I would like the website to inform me of the validations I failed to pass, and repopulate the form with my valid entries (except my password). So that I can try again without needing to refill forms I entered valid data into. Demo User

As an unregistered and unauthorized user, I would like an easy to find and clear button on both the /signup and /login pages to allow me to visit the site as a guest without signing up or logging in. When I'm on either the /signup or /login pages: I can click on a Demo User button to log me in and allow me access as a normal user. So that I can test the site's features and functionality without needing to stop and enter credentials. Log Out

As a logged in user, I want to log out via an easy to find log out button on the navigation bar. While on any page of the site: I can log out of my account and be redirected to the landing page. So that I can easily log out to keep my information secure.

Tickets

As a logged in user, I want to be able to create new tickets. When I'm on the /new-ticket page: I can write and submit a new ticket. So that I can share my thoughts and memes with my friends. Viewing tickets

As a logged in or logged out user, I want to be able to view a selection of all of my tickets.

When I'm on the /tickets page: I can view the ten most recently tickets. So that I can read and interact with my current tasks. As a logged in or logged out user, I want to be able to view a specific ticket and its associated customer.

When I'm on the /ticket/:id page: I can view the content of the ticket, as well as the associated customer. So that I can read and interact with my current tasks and customers. Updating tickets

As a logged in user, I want to be able to edit my tickets by clicking an Edit button associated with the ticket anywhere that tickets appear. When I'm on the /tickets, /ticket/:id, or /users/:id/tickets pages: I can click "Edit" to make permanent changes to tickets I have posted. So that I can fix any errors I make in my tickets. Deleting tickets

As a logged in user, I want to be able to delete my tickets by clicking a Delete button associated with the ticket anywhere that ticket appears. When I'm on the /tickets, /ticket/:id, or /users/:id/tickets pages: I can click "Delete" to permanently delete a ticket I have posted. So that when I realize I shouldn't have publicly said something, I can easily remove it. 2. Comments

Customers

As a logged in user, I want to be able to create customers. When I'm on the /customers page: I should be able to click on the "create customer" button. So that I can keep track of conversations and tickets I share with customers. Viewing Customers

As a logged in user, I want to be able to see a list of all of my customers. When I'm on the /customers page: I can view the ten most recently created customers. So that I can read and interact with my customers. Updating Customers

As a logged in user, I want to be able to edit my customers' information by clicking an Edit button associated with my customer. When I'm on the /customer/:id, or /users/:id/customers pages: I can click "Edit" to make permanent changes to a user's information. So that I can stay orginized and document my interations. Deleting Customers

As a logged in user, I want to be able to delete my customers by clicking a Delete button associated with my customer. When I'm on the /customer/:id, or /users/:id/customers pages: I can click "Delete" to permanently delete a customer. So that I can remove no longer existing customers.