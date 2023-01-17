const Joi = require('joi');

const updateSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
});

const updateMiddleware = (req, res, next) => {
  const { error } = updateSchema.validate(req.body);
  if (error) {
    return res.status(400).json(
      {
        message: 'Some required fields are missing',
      },
    );
  }
  next();
};

module.exports = updateMiddleware;