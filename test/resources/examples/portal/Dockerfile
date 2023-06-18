FROM node:20

ADD package.json /application/package.json

WORKDIR /application

RUN npm install

ADD tsconfig.json /application/
ADD webpack.*.js /application/
ADD src/browser /application/src/browser
RUN npm run build

ADD kapeta.yml /application/kapeta.yml

ADD src/server /application/src/server

CMD [ "npm", "start" ]
