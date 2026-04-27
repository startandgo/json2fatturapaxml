'use strict'

const BaseJoi = require('joi')
const countries = require('i18n-iso-countries')
const currencyExtension = require('joi-currency-code')(BaseJoi)

const JoiWithCurrency = BaseJoi.extend(currencyExtension)

module.exports = JoiWithCurrency.extend((joi) => ({
  type: 'string',
  base: joi.string(),
  rules: {
    country: {
      method () { return this.$_addRule('country') },
      validate (value, helpers) {
        if (!countries.isValid(value)) {
          return helpers.error('string.country')
        }
        return value.toUpperCase()
      }
    }
  },
  messages: { 'string.country': '{{#label}} needs to be a valid ISO 3166-1 alpha-2 country code' }
}))
