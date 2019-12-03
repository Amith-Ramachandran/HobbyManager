# Table of Contents

[Introduction](#introduction)
[Pre Requisites for the service](#pre-requisites)
[Using the service for Development](#using-the-service-for-development)
[Exposed API's](#exposed-apis)

# Introduction

A NodeJS API that creates and maintains users to hobby management.

## Pre Requisites

1. Install dependencies
   npm install
2. Install the following plugins in Visual Studio Code for development. a. ESLint b. Prettier - code formatter
3. Update .env file to configure the application to work as expected with a project in Github.
4. Install MongoDB locally.

| Environment Variable | Description              |
| :------------------- | :----------------------- |
| HOST_NAME            | IP of application.       |
| PORT                 | Port of the application. |
| DB_HOST              | Database host            |
| DB_PORT              | Database port            |
| DB_NAME              | Database name            |

## Using the service for Development

1. Update the environment variable information in the file config/app.config.js file with relevant info as well as .env file.

2. Start the node app

    npm start - For development

    npm run prod - For production

3. To check lint issues, use

    npm run lint

## Exposed APIs

If service is running on localhost on a specific port(eg: 8002) swagger definition of application is available on browser with following URL.

http://localhost:8002/api-docs/
