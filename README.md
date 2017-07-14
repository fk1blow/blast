# adhub-web-client

> proof of concept for the adhub campaign builder


## Build Setup

#### install dependencies
`npm install`

#### serve with hot reload at localhost:8080
`npm run dev`

#### build for production with minification
`npm run build`

#### build for production and view the bundle analyzer report
`npm run build --report`

#### run unit tests
`npm run unit`

#### run all tests
`npm test`


## Known issues

#### Running the project gives type definition errors

Sometimes, running `npm run dev` might spit out some errors, many of them related
to type(typescript type definitions) not being found. If after running `npm i`
the error still persists, remove the contents of node_modules and `npm i` again.

#### TypeScript is not installed

This happenes when you first clone the repo and TypeScript is not either installed
locally(as dev dependency) nor installed globally and linked to the root of the project.
To fix this, either run `npm i -g typescript && npm link typescript` or just
`npm link typescript` if typescript has already been installed.

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
