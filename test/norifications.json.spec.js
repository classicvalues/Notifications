const Joi = require('joi');

const schema = Joi.object({
    notifications: Joi.array().items(Joi.object({
        title: Joi.string().required(),
        body: Joi.string().required(),
        timestamp: Joi.number().integer().required(),
    })).required(),
}).strict(true).required();

describe('notification.json', () => {
    const json = require('./../notifications.json');

    it('json should match schema', async () => {
        await schema.validateAsync(json);
    });
    it('check timestamp uniqueness', () => {
        const timestamps = {};
        json.notifications.forEach(({ timestamp }) => {
            if (timestamps[timestamp]) {
                return fail(`Timestamp: ${timestamp} has duplication!`);
            } else {
                timestamps[timestamp] = true;
            }
        });
    });
});
