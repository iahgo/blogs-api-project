const Joi = require('joi');

const updateSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
});

const postSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  categoryIds: Joi.array().min(1).required(),
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

const postMiddleware = async (req, res, next) => {
  const { error } = postSchema.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: 'Some required fields are missing',
    });
  }
  next();
};

module.exports = { updateMiddleware, postMiddleware };