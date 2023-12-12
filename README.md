# Score Credit Challenge

## Summary
> - This project was created to consolidate my knowledge about Node.js + Microservice architecture + docker;
> - Intended to be a simple score credit score with user CRUD and authentication API.

## Description 
> - This project is divided into three microservices;
> - authentication:
>> - Responsible for the authentication and creation of JWT tokens;
>> - Provides endpoints for user registration, login, and token generation;
> - user:
>> - Communicate with ```score``` API to send users information to calculate credit score
>> - Provides CRUD endpoints for users and administrators;
>> - users: CRUD for assets
>> - admin: CRUD for debts
> - score
>> - Contains the business logic about how to calculate credit score
>> - Listens to ```user``` API to receive user assets and debts.

## Requirements

> - **Node** with version equal or higher than 16 - [Node Donwload](https://nodejs.org/pt-br/download/)
> - **Npm** with version equal or higher than 8 - [Npm Download](https://www.npmjs.com/package/download)
> - **Git** with version equal or higher than 2.25.1 - [Git Donwload](https://git-scm.com/downloads)
> - **Docker** with version equal or higher than 20.10.21 - [Docker download](https://docs.docker.com/get-docker/)
> - **Docker-compose** with version equal or higher than 1.25.0 - [Docker compose download](https://docs.docker.com/compose/install/)

## Installation
> Clone this project in your computer with the command:
> ```
> 	git clone https://github.com/ViniciussMelo/credit-score.git
> ```
> The next steps to run the microservices are inside their respective folders.

## IMPROVEMENTS
> - Change the API's communication method, today it's done via http. Preferable to use TCP (Kafka, bull);
> - Add 100% test coverage;
> - Isolate the database methods by creating providers, today it's done directly inside the repositories;
> - Add a error-tracking platform to receive the application reports (like Sentry);
> - Add a cache manager to set the credit score, because it will change only if some debt or asset change;