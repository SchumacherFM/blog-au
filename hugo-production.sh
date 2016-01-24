#!/bin/bash
rm -Rf public
mkdir public
./hugo -v --baseUrl="https://schumacher.fm/"
git ca -m 'Create Production version'
git push
./syncFolders-push.sh
echo "Done!"
