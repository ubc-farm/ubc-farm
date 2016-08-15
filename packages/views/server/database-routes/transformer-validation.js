const Joi = require('joi') //eslint-disable-line import/no-commonjs

export const print = Joi.string().valid('silent', 'pretty');

export const shallow = Joi.boolean();

export const validate = {query: Joi.object({print, shallow})};