const Joi = require('joi');

const schema = Joi.object({
    notifications: Joi.array().items(Joi.object({
        title: Joi.string().required(),
        body: Joi.string().required(),
        timestamp: Joi.string().required(),
    })).required(),
}).strict(true).required();

describe('notification.json', () => {
    it('json should match schema', async () => {
        const json = require('./../notifications.json');
        await schema.validateAsync(json);
    });
});
