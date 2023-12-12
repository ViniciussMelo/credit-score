## Description

> This repository is responsible for provides endpoints for:
> - User registration;
> - Authentication;
> - Creation of JWT tokens and refresh tokens.
> 
> This application has its own database to save the users information.

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
> We are using prisma, that we need to generate prisma models with:
>
> ```
> npx prisma generate
> ```
>
> After that we need to push/create the database tables
>
> ```
> npx prisma db push
> ```