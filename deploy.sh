#!/bin/bash
hugo

cd marzukia.github.io \
    && git checkout master \
    && git pull \
    && git add . \
    && git commit -m 'deploy changes' \
    && git push HEAD:master \
    && cd ..

git add . \
    && git commit -m 'new post or changes' \
    && git HEAD:master
