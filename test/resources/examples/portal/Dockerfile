FROM node:20 as build

ADD package.json /application/package.json
ADD package-lock.json /application/package-lock.json

WORKDIR /application

RUN npm install

ADD tsconfig.json /application/
ADD webpack.*.js /application/
ADD src/browser /application/src/browser
RUN npm run build

FROM node:20-alpine3.18

COPY --from=build /application/node_modules /application/node_modules
COPY --from=build /application/dist /application/dist
ADD kapeta.yml /application/kapeta.yml
ADD package.json /application/package.json
ADD package-lock.json /application/package-lock.json
ADD src/server /application/src/server
ADD src/browser /application/src/browser
ADD webpack.*.js /application/

WORKDIR /application

HEALTHCHECK --interval=5s --timeout=15s --start-period=5s --retries=10 CMD curl --fail http://localhost:80/__kapeta/health || exit 1

ENTRYPOINT [ "npm", "start" ]
