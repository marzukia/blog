#!/bin/bash

shopt -s extglob

cd marzukia.github.io/
rm -rv !("CNAME")

cd ..

hugo


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