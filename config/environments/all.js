'use strict';

const _             = require('lodash');
const env           = require(`./${(process.env.NODE_ENV || 'development')}`);
const packageJson   = require('../../package.json');

const all           = {
    log : {
        showRouteAtStart : true,
    },
    connections : {
        api : {
            host    : '0.0.0.0',
            port    : process.env.PORT || 8080,
            labels  : ['api'],
        },
    },
    databases : {
        hapi : {
            adapter           : 'k7-mongoose',
            connectionString  :
                'mongodb://127.0.0.1:27017/hapi',
            connectionOptions : {
                user   : process.env.MONGO_USER,
                pass   : process.env.MONGO_PASSWORD,
                server : {
                    auto_reconnect : true,
                    socketOptions  : { keepAlive : 1 },
                },
                replset : {
                    auto_reconnect : true,
                    socketOptions  : { keepAlive : 1 },
                },
            },
        },
    },
};

module.exports = _.merge(all, env);
