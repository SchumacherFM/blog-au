#!/bin/bash
rm -Rf public
mkdir public
./hugo -v --baseUrl="http://www.schumacher.fm/blog//"
git ca -m 'Create Production version'
git push
./syncFolders-push.sh
echo "Done!"
