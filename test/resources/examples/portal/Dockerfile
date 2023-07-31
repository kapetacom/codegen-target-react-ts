FROM node:19

ADD package.json /application/package.json
ADD package-lock.json /application/package-lock.json

WORKDIR /application

RUN npm install

ADD tsconfig.json /application/
ADD webpack.*.js /application/
ADD src/browser /application/src/browser
RUN npm run build

ADD kapeta.yml /application/kapeta.yml

ADD src/server /application/src/server

HEALTHCHECK --interval=5s --timeout=15s --start-period=5s --retries=10 CMD curl --fail http://localhost:80/__kapeta/health || exit 1

CMD [ "npm", "start" ]
