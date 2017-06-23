## Assignment
Bol.com Assignment carried out by Stefan Nieuwenhuis <stefannhs@gmail.com>

## Prerequisites
> This project has dependencies that require both Node 6.9.0 or higher and NPM 3 or higher and requires webpack-dev-server to be installed globally.

Get Node and NPM [here](https://nodejs.org/en/).

To install webpack-dev-server globally:
```bash
    $ npm install -g webpack-dev-server
```



## Table of contents
* [Installation](#installation)
* [Usage](#usage)

## Installation
**BEFORE YOU INSTALL:** please read the [prerequisites](#prerequisites).
```bash
    $ npm install
```

## Usage
### Serving the project via a development server
```bash
    $ npm start
```

Navigate to `http://localhost:8080/`. The app will automatically reload if you change any of the source files.

### Generate a build
```bash
    $ npm run build
```
A folder called `dist` is generated in the root of the project and contains all the bundled sources.