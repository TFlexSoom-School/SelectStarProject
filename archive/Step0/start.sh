#!/bin/bash
# Tristan Hilbert
# Simple Bash Script

PORT=12346

if [ -z $1 ]
then
   ./node_modules/forever/bin/forever start diagnostic.js $PORT
else
   if [ $1 == 'background' ]
   then
      node diagnostic.js $PORT &
   fi
fi
