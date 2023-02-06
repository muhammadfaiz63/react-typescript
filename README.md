# Getting Started CMS Frontend

This project was bootstrapped with [Boilerplate](http://repo.bkpm.go.id/OSS-RBA-2022/pelayanan/frontend-service/boilerplate-react-csr).

## Available Scripts

In the project directory, you can run:

## Cloning Project

```bash
# clonning
$ git clone dari repo yang di fork

# add upstream
$ git remote add upstream git@repo.bkpm.go.id:OSS-RBA-2022/pelayanan/frontend-service/cms-frontend.git

# creeate flow
$ git flow init

# before create new branch
$ git fetch upstream
$ git pull upstream develop # pull di branch origin develop

# checkout dari branch develop
$ git flow checkout develop

# create feature
$ git flow feature start NAMA_FEATURE

# push feature
$ git flow feature publish NAMA_FEATURE

# create bugfix
$ git flow bugfix start NAMA_BUG

# push feature
$ git flow bugfix publish NAMA_BUG

# create hotfix
$ git flow hotfix start NAMA_HOTFIX

# push feature
$ git flow hotfix publish NAMA_HOTFIX
```

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm start
```

## Learn More

[React documentation](https://reactjs.org/).

[Material UI](https://mui.com/).

[Redux](https://redux.js.org/).

[Styled Component](https://styled-components.com/).

[Typescript](https://www.typescriptlang.org/).
