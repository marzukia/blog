#!/bin/bash
hugo -d ./marzukia.github.io

cd marzukia.github.io

git add .
git commit -m 'new post or changes'
git push --force

cd ..
