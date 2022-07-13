#!/bin/sh
docker run --mount type=bind,source=$PWD,target=/usr/app node:16-alpine /bin/sh -c 'apk add -q zip make; cd /usr/app; npm install; make; echo "-------------- Done. SHA1: -------------"; for f in dist/*.js; do sha1sum $f; done; echo ""; for f in dist-zip/*.zip; do sha1sum $f; done'
