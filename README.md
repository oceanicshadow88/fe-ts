<!-- ABOUT THE PROJECT -->

## About The Project

TechScrum is a project management tools which helps company to prevent delays.

#### Master

[![CircleCI](https://dl.circleci.com/status-badge/img/bb/010001/fe.techscrum/tree/master.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/bb/010001/fe.techscrum/tree/master)

#### Develop

[![CircleCI](https://dl.circleci.com/status-badge/img/bb/010001/fe.techscrum/tree/develop.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/bb/010001/fe.techscrum/tree/develop)

### Tech Stack

- React
- Typescript
- yarn (Package Management tools)
- Cypress (Testing)
- Storybook (Tool for UI development)

### Prerequisites

List of tools needed to be installed before the project can start

- Node
- Yarn

### Installation

Below are the command that you would need to run after clone down the repo, unless to told these command usually would need to be run only once

- yarn install
- yarn setup-vscode-plugin
- cp .env.local.example .env.local

### Start up

To able to start the server these are the following commands that would need to be run

- yarn start

### Environments

Environments for web development are the tools and configurations used by developers to create, test, and deploy web applications. These environments include local development, staging, and production, and are optimized for performance, reliability, and security.

- Local: http://localhost:3000(NOTE: Must run under localhost:3000 else will not work)

- Testing: https://dev.techscrumapp.com

- Staging: https://staging.techscrumapp.com

- Production: https://techscrumapp.com

### Deployment (Devops)

To able to deploy this to the server, please follow this doc below

https://www.notion.so/Frontend-React-e424fc3e001d432eb15b4407a9fac588

## Folder structure

api - All API goes here
asset - Image,video...etc
components - common components used in application
config - As it's explain
context - Context API see React docs for more info
Hooks - React docs for more info
lib - All common components that maybe will be put in another repo
pages - As it's explain
routes - As it's explain
stories - For storybook
utils - utils functions

## Roadmap

https://010001.atlassian.net/jira/software/projects/TEC/boards/2/roadmap

## Tests

- npm run cypress

## Storybook

Storybook showing UI components our platform. It allows developers to maintain consistency, reusability and efficiency in the development process.

- yarn run storybook

## Contributing

Emil (Junqian Su)
Implement UI and functions of login, logout, register, forget password, member page, part of board page, projects page, account setting page, shortcut
Test: Forget Password

David Guo - Implement dailyscrum, backlog page, modal component, FAQ page, fix bug, APIs, refactoring

## License

## Contact

Kitman Yiu - [Kitman Yiu](www.kitmanyiu.com)

## Coding Standard

- Eslint Airbnb
- Prettier
- Sonar
- https://www.notion.so/Coding-Guidelines-bfa77d75476a4b19a195ddb20b02bb33

test