import * as Joi from 'joi';

export const joiLoginExtension = Joi.extend({
  type: "account",
  base: Joi.string().required(),
  validate(value: string, helpers: Joi.CustomHelpers): any {
    if (!/^\d{3,10}$/.test(value)) {
      return {
        errors: helpers.error("账号应为 3~10 长度的纯数字")
      }
    }
  }
}, {
  type: "password",
  base: Joi.string().required(),
  validate(value: string, helpers: Joi.CustomHelpers): any {
    if (!/^[0-9a-zA-Z\-_]{5,255}$/) {
      return {
        errors: helpers.error("密码应为字母+数字+短横线+下划线的任意组合，长度在 5~255 之间")
      }
    }
  }
}, {
  type: "confirmPassword",
  base: Joi.string().required(),
  validate(value: string, helpers: Joi.CustomHelpers): any {
    if (!/^[0-9a-zA-Z\-_]{5,255}$/) {
      return {
        errors: helpers.error("密码应为字母+数字+短横线+下划线的任意组合，长度在 5~255 之间")
      }
    }
  }
})

const lio = {
  account: joiLoginExtension.account(),
  password: joiLoginExtension.password()
}

export const loginInputValidator = Joi.object(lio)

export const registerInputValidator = Joi.object({
  ...lio,
  confirmPassword: joiLoginExtension.confirmPassword()
})