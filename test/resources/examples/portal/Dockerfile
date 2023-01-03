FROM node:18.7

ADD package.json /application/package.json

WORKDIR /application

RUN npm install

ADD tsconfig.json /application/
ADD webpack.*.js /application/
ADD src/browser /application/src/browser
RUN npm run build

ADD blockware.yml /application/blockware.yml

ADD src/server /application/src/server

CMD [ "npm", "run", "start-prod" ]
