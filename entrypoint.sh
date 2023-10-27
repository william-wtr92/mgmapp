#!/bin/sh

/wait-for-it.sh db:5432 --timeout=0 --strict -- echo "db is up"

npx knex migrate:latest
npx knex seed:run

npm run dev
