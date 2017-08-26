# Node.js Boilerplate
> Simple Node.js Boilerplate for simple Node.js Applications. Inspired by [Kunal Kapadia's express-mongoose-es6-rest-api](https://github.com/KunalKapadia/express-mongoose-es6-rest-api).

[![Build Status](https://travis-ci.org/septa97/node-boilerplate.svg?branch=master)](https://travis-ci.org/septa97/node-boilerplate)
[![codecov](https://codecov.io/gh/septa97/node-boilerplate/branch/master/graph/badge.svg)](https://codecov.io/gh/septa97/node-boilerplate)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

A boilerplate for building applications in Node.js using ES6 with Code Coverage. Follows [Airbnb's Javascript Style Guide](https://github.com/airbnb/javascript).

## Features

| Feature                                                                             |
|-------------------------------------------------------------------------------------|
| ES6 using [Babel](https://babeljs.io/)                                              |
| Run tests using [Mocha](https://mochajs.org/)                                       |
| Code linting using [ESLint](http://eslint.org/)                                     |
| Automatic syntax formatting using [prettier](https://github.com/prettier/prettier)  |
| Auto-restart server using [nodemon](https://nodemon.io/)                            |
| Logging using [debug](https://github.com/visionmedia/debug)                         |
| HTTP access control using [cors](https://github.com/expressjs/cors)                 |
| Code coverage using [istanbul](https://istanbul.js.org/)                            |
| Consistent commit syntax using [commitizen](http://commitizen.github.io/cz-cli/) and [AngularJS's commit message convention](https://github.com/angular/angular.js/blob/master/CONTRIBUTING.md#-git-commit-guidelines)  |
| Precommit hook by running the linter and code coverage tool                         |

## Installing / Getting started

Clone the repository and name it as you like.

```shell
git clone https://github.com/septa97/node-boilerplate.git <your-project-name>
cd your-project-name/
rm -rf .git/ && git init
git remote add origin https://github.com/<USERNAME>/<REPOSITORY>.git
npm install
cp .env.example .env
npm run --silent create
rm README.md
mv README.sample.md README.md
```

Then fill up the prompt for modifying the package.json.

You must delete the .git folder and re-initialize it using `git init`.

You must also create a new README.md. Open the new README.md then modify it depending on your project.

The above code installs the dependencies, creates an environment file, and modifies the package.json file.

## Developing the application

To start developing with code linter,

```shell
npm run dev
```

## Making a commit

To safely follow the standards of a commit,

```shell
npm run cm
```

then follow the instructions.

## Tests

To run tests,

```shell
npm run test
```
