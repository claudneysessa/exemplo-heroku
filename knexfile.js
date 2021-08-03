require('dotenv').config();

module.exports = {

    development: {
        client: 'postgresql',
        connection: process.env.DATABASE_URL,
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            directory: './src/database/migrations'
        },
        seeds: {
            directory: './src/database/seeds'
        },
    },

    staging: {
        client: 'pg',
        connection: process.env.DATABASE_URL,
        migrations: {
            directory: './src/database/migrations'
        },
        seeds: {
            directory: './src/database/seeds'
        },
    },

    production: {
        client: 'pg',
        connection: process.env.DATABASE_URL,
        migrations: {
            directory: './src/database/migrations'
        },
        seeds: {
            directory: './src/database/seeds'
        },
    }

};