import Joi from 'joi';
import { JoiValidationPipe } from '../app.controller';

const joiExtend = Joi.extend({
  type: 'account',
  base: Joi.string(),
  validate(value: string, helpers: Joi.CustomHelpers): any {
    if (value.match(/^\d{3,10}$/)) {
      return value
    } else {
      return helpers.error("账号不符合长度在3~10之间切全部为数字的要求。")
    }
  }
}, {
  type: "password",
  base: Joi.string(),
  validate(value: string, helpers: Joi.CustomHelpers): any {
    if (value.match(/^[a-zA-Z0-9\-_]{5,255}$/)) {
      return value
    } else {
      return helpers.error("密码不符合长度在5~255之间且只能出现字母、数字、中划线（-）、下划线（_）的要求。")
    }
  }
})

export const userRegisterPipe = new JoiValidationPipe(Joi.object({
  account: joiExtend.account(),
  password: joiExtend.password(),
}))