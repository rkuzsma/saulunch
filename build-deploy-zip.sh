#!/bin/sh
# This script takes 1 argument: 'build' or 'deploy'
# 'build' creates the local ZIP in your build/ dir
# 'deploy' creates the local ZIP and deploys it to AWS.
this_script_dir="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
output_dir=$this_script_dir/build
rm -rf $output_dir
mkdir $output_dir
mkdir $output_dir/bin
mkdir $output_dir/lib
mkdir -p $output_dir/resources/generated
cp -r $this_script_dir/bin $output_dir
cp -r $this_script_dir/lib $output_dir
cp -r $this_script_dir/resources/generated $output_dir/resources
cp $this_script_dir/package.json $output_dir/package.json
cp $this_script_dir/index.js $output_dir/index.js
cd $output_dir
npm install --production
# Remove 108MB of unnecessary test data from pdf2json
rm -rf $output_dir/node_modules/pdf2json/test
cd $this_script_dir
node_modules/node-lambda/bin/node-lambda $1 --environment prod --prebuiltDirectory "$output_dir"
