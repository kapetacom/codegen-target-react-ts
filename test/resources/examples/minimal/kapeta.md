# Kapeta Readme

This file contains some structural information about the block.

This file will be overwritten every time you change the block definition in Kapeta.

## Folder Structure

The block is structured as follows:

* `src/browser`: Contains code that is only executed in the browser.
* `src/server`: Contains code that is only executed on the server.

You'll find some subfolders called `.generated` under `src/`,  `src/browser/` and `src/server/`. 
These folders contain generated files and should not be edited directly.

In particular the following folders are generated:
* `src/.generated/entities`: Contains the entities defined by the block.

## Web Pages
You'll find all your web pages in `src/browser/pages`. These pages contain
a very simple React component that renders the page. 

You should edit these files to add your own content to the pages.

Each page is a "root" page - and most frontends will only have one of these. You can
add routing and similar to it like you would any other React app.

### Build System
The web pages are built using webpack - and there is a dev and prod mode for it.
You'll find configuration for both in `webpack.development.config.js` and `webpack.production.config.js`.

By default, the production version is simply a copy from the development version, but you can change this if you want to.

#### Dev mode
In dev mode the web pages are served from memory and will be automatically rebuild whenever you change the code.
For react components and styles it also supports hot-reloading whenever possible.

### Templates
The templates are managed via [express template engine](https://expressjs.com/en/guide/using-template-engines.html).
In short, express needs to know where the views live, and which renderer to use.

Make sure to include all parameters in the template, otherwise the block will not work as expected.

```typescript
// Set up webpack middleware and render methods
const DIST_DIR = Path.resolve(__dirname, "../dist");
const webpackConfig = require("../webpack.development.config");
server.configureFrontend(DIST_DIR, webpackConfig);

// Set up templating
const hbs = createHandlebars({
    extname: '.hbs',
    defaultLayout: false,
    helpers: {
        // Recommended helper to serialize values in handlebars
        toJSON: (obj: any) => JSON.stringify(obj),
    },
});
server.express().engine('handlebars', hbs.engine);
server.express().set('views', Path.resolve(__dirname, "../templates"));
server.express().set('view engine', 'handlebars');

server.get('/', async (req, res, next) => {
    // render the main template e.g. templates/main.hbs
    await server.renderPage('main');
});
```

Template parameters include:

- `baseURL` usually sets the HTML [base tag](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/base) in the template
- `scripts` is a list of `<script>` tags to load the app JS bundle.
- `styles` is a list of `<style>` tags to load the app CSS bundle.


There are a few templates helpers that is being used when rendering the main HTML page to render assets.
The default ones contains the bare minimum - but you can override them by providing a map of template
functions in ```src/server/index.ts```. The full list of templates are:

```typescript
import type { Request, Response } from 'express';
import type { MainTemplateParams } from '@kapeta/sdk-server';

interface Templates {
    /**
     * Renders script link - used in both dev and prod mode
     */
    renderScript(req: Request, res: Response, src: string): string;

    /**
     * Renders stylesheet link - only used in prod mode
     */
    renderStylesheet(req: Request, res: Response, src: string): string;
}
```
You can provide 1 or more of these templates to override the default ones.


