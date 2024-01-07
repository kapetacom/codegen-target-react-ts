# Kapeta Readme

This file contains some structural information about the block.

This file will be overwritten every time you change the block definition in Kapeta.

## Folder Structure

The block is structured as follows:

* `src/browser`: Contains code that is only executed in the browser.
* `src/mocks`: Contains code that enables you to mock the REST APIs.
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
import type { Request, Response } from 'express';
import type { MainTemplateParams } from '@kapeta/sdk-server';

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
import type { Request, Response } from 'express';
import type { MainTemplateParams } from '@kapeta/sdk-server';

interface Templates {
    /**
     * Renders main html template. Receives params with baseUrl, styles and scripts.
     *
     * All of them should be rendered as-is, without any escaping for the renderer to work.
     */
    renderMain(req: Request, res: Response, params: MainTemplateParams): string;

    /**
     * Renders script link - used in both dev and prod mode
     */
    renderScript(req: Request, res: Response, src: string): string;

    /**
     * Renders stylesheet link - only used in prod mode
     */
    renderStylesheet(req: Request, res: Response, src: string): string;

    /**
     * Renders inline style - only used in dev mode
     */
    renderInlineStyle(req: Request, res: Response, style: string): string;
}
```
You can provide 1 or more of these templates to override the default ones.


## REST API

The block consumes the following REST APIs:

* `users`
* `tasks`

A rest client for each of these APIs is available both in the browser: `src/browser/.generated/clients` and server: `src/server/.generated/clients` directories

* [src/browser/.generated/clients/UsersClient.ts](src/browser/.generated/clients/UsersClient.ts)
* [src/server/.generated/clients/UsersClient.ts](src/server/.generated/clients/UsersClient.ts)
* [src/browser/.generated/clients/TasksClient.ts](src/browser/.generated/clients/TasksClient.ts)
* [src/server/.generated/clients/TasksClient.ts](src/server/.generated/clients/TasksClient.ts)

You can use these clients to make requests to the REST API. For example:


```typescript
import { UsersClient } from '../../.generated/clients/UsersClient';
import { TasksClient } from '../../.generated/clients/TasksClient';

// ...

const usersApi = new UsersClient();
await usersApi.addUser(...)

// ...

const tasksApi = new TasksClient();
await tasksApi.addTask(...)
```


## Mocking the REST API

The block comes with support for mocking the REST API with [Mock Service Worker (MSW)](https://mswjs.io/).


### Understanding MSW

MSW is an API mocking library that uses Service Worker API to intercept actual network requests. This enables you to mock REST APIs and other external dependencies during development and testing. Here's why incorporating MSW is beneficial:

1. **Realistic Testing Environment:** MSW allows you to create mocks that closely resemble actual server responses. This helps in testing your application in a more realistic environment without the need to set up and maintain a backend server for development purposes.

2. **Offline Development:** With MSW, you can continue developing and testing your application even when you're offline or the backend server is down. This can significantly improve productivity and is particularly useful for front-end development.

3. **Faster Feedback Loop:** By mocking responses, you reduce the dependency on actual network conditions or server response times. This results in a faster feedback loop during development, making the process more efficient.

4. **Controlled Testing Scenarios:** MSW allows you to simulate various server responses, including errors and edge cases, which might be hard to reproduce with a real server. This level of control is crucial for thorough testing and ensuring application robustness.

5. **Ease of Use:** Implementing MSW is relatively straightforward and doesn't require significant changes to existing code.


### Enable MSW and edit mock data

To enable MSW run

```js
enableApiMocking(true)
```

in the browser console. This will set `enableMockApi = true` in the browser's local storage. The mock service worker will then intercept all requests to the REST API and return mock data instead.

Edit the mock data that is returned by the handlers in:

* `src/mocks/handlers/users`
* `src/mocks/handlers/tasks`

Endpoints that doesn't return any data is mocked to return an empty response with status code 200.

When a handler file has been changed Kapeta will not touch it. This is to allow you to make changes to the mock data. If you want to reset the mock data to the default values you can delete the file and Kapeta will recreate it.

