## Description

> This repository is responsible for provides endpoints for:
> - customer assets CRUD;
> - admin assets CRUD;
> - Call ```score``` api to calculate the credit score.
> 
> This application has its own database to save users information.

## Installation
> Install the dependencies with the following command:
> ```
> npm install
> ```

## Run
> Before you run the application, you need to create a ```.env``` file and provide the environment values, by copying the ```.env.example``` and provide the values.
>
> After provide the environments values, just start the application with:
> ```
> docker-compose up
> ```
> We are using typeorm, so we have a migration directory to create the database and a script to run the migrations:
> ```
> npm run typeorm:up
> ```