//#FILENAME:scripts/build.sh:write-always:755
#!/usr/bin/env bash
rm -rf ./node_modules/

trap "exit" INT TERM ERR
trap "kill 0" EXIT

npm run build &

wait
