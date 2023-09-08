//#FILENAME:scripts/start-dev.sh:write-always:755
#!/bin/sh
npm install
if [ "$KAPETA_ENVIRONMENT_TYPE" = "docker" ]; then
  # In docker we want nodemon to exit on crash so that the container can be restarted
  npm run start:dev:docker
else
  npm run start:dev
fi

