FROM node:18.7

ADD package.json /application/package.json

WORKDIR /application

RUN npm config set @kapeta:registry "https://europe-north1-npm.pkg.dev/kapeta-production/kapeta-npm-public/"
RUN npm install

ADD tsconfig.json /application/
ADD webpack.*.js /application/
ADD src/browser /application/src/browser
RUN npm run build

ADD kapeta.yml /application/kapeta.yml

ADD src/server /application/src/server

CMD [ "npm", "run", "start-prod" ]
