#!/usr/bin/env bash

docker exec db mongoimport --db nba --collection shots --type csv --file /home/mongodb/shot_logs.csv --headerline
