# open-music-api
## How to use?
```bash
cp .env.example .env # and configure some of the value
npm install
npm run migrate up
npm run start
```

## How to drop all tables?
```bash
npm run migrate down 0
```

## How to reset the database?
```bash
npm run db-reset
```

## Additional notes
1. When optional field on payload body is not filled (undefined) or fill with `null`, then when insert into database, it will become null.
2. There are several rules on `eslint` that turned off, such as:
    * `no-console`, to activate `console.log` that can be used for debugging and print the address of the server.
    * `no-underscore-dangle`, to enable underscore character before variable name that can be used as flag that the variables is private.
    * `import/no-extraneous-dependencies`, there are some package that have an error when imported into the program even though already implemented what `eslint` is recommended, thus those rules is turned off