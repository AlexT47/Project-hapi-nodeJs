const Joi = require('joi');

const schema = Joi.object().keys({
    login       : Joi.string().alphanum().required(),
    password    : Joi.string().alphanum().min(8).required(),
    email       : Joi.string().email().required(),
    firstname   : Joi.string().required(),
    lastname    : Joi.string().required(),
    company     : Joi.string(),
    fonction    : Joi.string(),
});

module.exports = schema;

