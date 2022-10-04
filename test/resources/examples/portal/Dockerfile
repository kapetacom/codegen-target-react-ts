FROM node:13.12

ADD package.json /application/package.json

WORKDIR /application

RUN npm install

ADD tsconfig.json /application/
ADD webpack.*.js /application/
ADD src/browser /application/src/browser
RUN npm run build

ADD block.yml /application/block.yml

ADD src/server /application/src/server

CMD [ "npm", "run", "start-prod" ]
