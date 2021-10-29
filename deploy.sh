#!/bin/bash

hugo

cd marzukia.github.io/
find . -type f -not -name 'CNAME' -delete
git add .
git commit -m 'deploy changes'
git push
cd ..
cd themes/salt
git add .
git commit -m 'deploy changes'
git push
cd ../..
git add .
git commit -m 'new post or changes'
git push