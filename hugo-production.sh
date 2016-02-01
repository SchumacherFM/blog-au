#!/bin/bash
rm -Rf public
mkdir public
./hugo -v --baseUrl="https://www.schumacher.fm/"
git ca -m 'Create Production version'
git push
cp -R static/.well-known static/*.asc public/
ln -s ../piwik public/piwik
./syncFolders-push.sh
echo "Done!"
