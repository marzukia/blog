#!/bin/bash

hugo
cd marzukia.github.io/
git add .
git commit -m 'deploy changes'
git push
cd ..