## Assignment
Bol.com Assignment carried out by Stefan Nieuwenhuis <stefannhs@gmail.com>

## Prerequisites
> This project requires webpack-dev-server to be installed globally and has dependencies that require both Node 6.9.0 or higher and NPM 3 or higher.

To install webpack-dev-server globally:
```bash
    $ npm install -g webpack-dev-server
```

Get Node and NPM [here](https://nodejs.org/en/).

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
A folder `dist` is generated in the root folder of the project and contains all the bundled sources.