'use strict';

const handler = require('../handlers/user');
const userSchema = require('../schemas/user');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);

exports.register = (server, options, next) => {
    server.route([
        {
            method : 'POST',
            path   : '/user',
            config : {
                description : 'Create user',
                notes       : 'Creates a user',
                tags        : ['api'],
                plugins     : {
                    'hapi-swagger'  : {
                        payloadType : 'form',
                    },
                },
                handler     : handler.create,
                validate    : {
                    payload : userSchema,
                },
            },
        },
        {
            method : 'Get',
            path   : '/user',
            config : {
                description : 'Get users',
                notes       : 'Get a users',
                tags        : ['api'],
                handler     : handler.getUsers,
            },
        },
        {
            method : 'GET',
            path   : '/user/{_id}',
            config : {
                description : 'Get user',
                notes       : 'Gets a user',
                tags        : ['api'],
                plugins     : {
                    'hapi-swagger'  : {
                        payloadType : 'form',
                    },
                },
                handler     : handler.fetch,
                validate    : {
                    params  : {
                        _id : Joi.objectId().required(),
                    },
                },
            },
        },
        {
            method : 'GET',
            path   : '/user/generation',
            config : {
                description : 'Generate 100 user',
                notes       : 'Generate 100 user',
                tags        : ['api'],
                handler     : handler.generation,
            },
        },
        {
            method : 'PUT',
            path   : '/user/{_id}',
            config : {
                description : 'Update a user',
                notes       : 'Update a user',
                tags        : ['api'],
                plugins     : {
                    'hapi-swagger'  : {
                        payloadType : 'form',
                    },
                },
                validate    : {
                    payload : userSchema,
                    params  : {
                        _id : Joi.objectId().required(),
                    },
                },
                handler     : handler.update,
            },
        },
        {
            method : 'DELETE',
            path   : '/user/{_id}',
            config : {
                description : 'Delete a user',
                notes       : 'Delete a user',
                tags        : ['api'],
                plugins     : {
                    'hapi-swagger'  : {
                        payloadType : 'form',
                    },
                },
                handler     : handler.delete,
                validate    : {
                    params  : {
                        _id : Joi.objectId().required(),
                    },
                },
            },
        },
        {
            method : 'POST',
            path   : '/user/authent',
            config : {
                description : 'authentification user',
                notes       : 'authentification user',
                tags        : ['api'],
                plugins     : {
                    'hapi-swagger'  : {
                        payloadType : 'form',
                    },
                },
                handler     : handler.authentification,
                validate    : {
                    payload : {
                        login       : Joi.string().required(),
                        password    : Joi.string().required(),
                    },
                },
            },
        },
        {
            method : 'PATCH',
            path   : '/user/new_password',
            config : {
                description : 'new password user',
                notes       : 'new password user',
                tags        : ['api'],
                plugins     : {
                    'hapi-swagger'  : {
                        payloadType : 'form',
                    },
                },
                handler     : handler.newPassword,
                validate    : {
                    payload : {
                        email   : Joi.string().email().required(),
                    },
                },
            },
        },


    ]);
    next();
};

exports.register.attributes = {
    name : 'user-routes',
};
