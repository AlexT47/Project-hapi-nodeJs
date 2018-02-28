'use strict';

const jsonToMongoose    = require('json-mongoose');
const async             = require('async');
const bcrypt            = require('bcrypt');
const mongoose          = require('k7-mongoose').mongoose();

module.exports = jsonToMongoose({
    mongoose    : mongoose,
    collection  : 'users',
    schema      : require('../schemas/user'),
    pre         : {
        save : (doc, next) => {
            async.parallel({
                password : done => {
                    bcrypt.hash(doc.password, 10, (err, hash) => {
                        if (err) {
                            return next(err);
                        }
                        doc.password = hash;
                        done();
                    });
                },
            }, next);
        },
    },
    schemaUpdate : (schema) => {
        schema.login.unique  = true;
        schema.email.unique  = true;

        return schema;
    },
    transform : (doc, ret, options) => {
        delete ret.password;
        return ret;
    },
    options : {

    },
});