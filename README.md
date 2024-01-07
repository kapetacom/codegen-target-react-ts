# Kapeta Language Target for Typescript and React

Provides Kapeta language support for React using Typescript

Will generate code for a NodeJS server and a React frontend using Typescript.

This language target is only available for Frontend blocks.

To lean more about Kapeta, see https://kapeta.com or https://docs.kapeta.com

## Project Structure
The structure of this language target is as follows:

### `src/web`
Contains the browser-based source used by the Kapeta App when configuring the language target.

### `src/target`
Contains the node-based source for generating code for this language target.

### `templates`
Contains the templates used by the target to generate code. These are written using the [Handlebars](https://handlebarsjs.com/) template language.

See https://github.com/kapetacom/codegen-target for more information about the template syntax.

## Features

**Note:** In your block see the ```kapeta.md``` file for more information specifically about the code that is generated for your block.

### Linting
Will add eslint support - lint your code using `npm run lint`.

### Webpack
Will create a production-grade webpack configuration. You can adjust the configuration by 
changing the webpack.*.config.js files in the root of your project.

In development mode, the webpack server will be used to serve the frontend assets from memory.
In production mode, the assets will be served from the dist folder.

Use `npm run build` to build the frontend assets for production.

Use `npm run start:dev` to start the frontend in dev mode - which includes hot-reloading.

### Mocking
Generates mock methods and adds the MSW mocking library to make it easy to mock REST APIs when developing.

### Prettier
Adds prettier support - format your code using `npm run format`.

### REST Clients
Will generate REST clients for all REST APIs defined in the block - available both 
in the browser and on the server.

### Web Pages
Will generate React Page for each webpage resource provided to the block.

### Web Fragments
Will generate a React component for each web fragment resource provided to the block.

### Redis
Will generate a Redis client for each Redis resource provided to the block. 
This client can be used to configure session storage and similar for express.

## Changes and Suggestions

If you wish to change the templates or code being generated - consider either opening a PR
to if you feel it could be universally beneficial or fork the project and make your own changes -
which you can then publish to Kapeta as your own language target.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
