import Joi from 'joi';
import { JoiValidationPipe } from '../app.controller';

const joiExtend = Joi.extend({
  type: 'account',
  base: Joi.string(),
  validate(value: string, helpers: Joi.CustomHelpers): any {
    if (value.match(/^\d{3,10}$/)) {
      return value
    } else {
      return helpers.error("Account not match: all digit and appear 3 times to 10 times.")
    }
  }
}, {
  type: "password",
  base: Joi.string(),
  validate(value: string, helpers: Joi.CustomHelpers): any {

  }
})

export const userRegisterPipe = new JoiValidationPipe(Joi.object({
  account: joiExtend.account(),
  password: joiExtend.password(),
}))