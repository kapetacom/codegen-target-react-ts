FROM node:20 as build

ADD package.json /application/package.json
ADD package-lock.json /application/package-lock.json

WORKDIR /application

RUN npm install

ADD assets /application/assets
ADD tsconfig.json /application/
ADD webpack.*.js /application/
ADD src /application/src

RUN npm run build

FROM node:20-alpine3.18

COPY --from=build /application/node_modules /application/node_modules
COPY --from=build /application/dist /application/dist
ADD scripts /application/scripts
ADD assets /application/assets
ADD webpack.*.js /application/
ADD kapeta.yml /application/kapeta.yml
ADD package.json /application/package.json
ADD package-lock.json /application/package-lock.json
ADD src /application/src

WORKDIR /application

HEALTHCHECK --interval=5s --timeout=15s --start-period=5s --retries=10 CMD wget --no-verbose --tries=1 --spider "http://localhost:80/.kapeta/health" || exit 1

ENTRYPOINT [ "npm", "start" ]
