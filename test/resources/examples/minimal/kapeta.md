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
There are a few templates that is being used when rendering the main HTML page. The default ones
contains the bare minimum - but you can override them by providing a map of template functions in
```src/server/index.ts```:

**Note**: You shouldn't use the response object to send the response - instead you should return the rendered HTML as a string.
The response object is only there to allow you to access ```res.locals``` and similar values other middleware.

```typescript
import { Request, Response } from 'express';
import { MainTemplateParams } from '@kapeta/sdk-server';

server.configureAssets(BASE_DIR, webpackConfig, {
    renderMain(req: Request, res: Response, params: MainTemplateParams): string {
        return `<!doctype html>
            <html lang="en-US">
              <head>
                <title>My awesome website</title>
                <meta charset="utf-8" />
                <base href="${params.baseUrl}" />
                ${params.styles}
              </head>
              <body>
                ${params.scripts}
              </body>
            </html>`
    },
});
```

The full list of templates are:
```typescript
interface Templates {
    /**
     * Renders main html template. Receives params with baseUrl, styles and scripts.
     *
     * All of them should be rendered as-is, without any escaping for the renderer to work.
     */
    renderMain(params: MainTemplateParams): string;

    /**
     * Renders script link - used in both dev and prod mode
     */
    renderScript(src: string): string;

    /**
     * Renders stylesheet link - only used in prod mode
     */
    renderStylesheet(src: string): string;

    /**
     * Renders inline style - only used in dev mode
     */
    renderInlineStyle(style: string): string;
}
```
You can provide 1 or more of these templates to override the default ones.


