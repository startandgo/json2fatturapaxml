'use strict';

const IT_lang = require('./joi-error-translations/IT');
const schema = require('./schemas/FatturaElettronicaSchema');

const loadLanguage = (language = '') => {
  switch (language.toUpperCase()) {
    case 'IT':
      return IT_lang;
    default:
      return {};
  }
};

const mapLanguageToMessages = (language = {}) => {
  return Object.keys(language).reduce((messages, type) => {
    const rules = language[type] || {};

    Object.keys(rules).forEach((rule) => {
      const translated = rules[rule].replace(/{{\s*([^}]+)\s*}}/g, '{{#$1}}');
      messages[`${type}.${rule}`] = `{{#label}} ${translated}`;
    });

    return messages;
  }, {});
};

module.exports = (value, opt = {}) => {
  const options = {
    abortEarly: false,
    errors: { label: 'key' },
    messages: mapLanguageToMessages(loadLanguage(opt.language))
  };

  const result = schema.validate(value, options);
  return {
    ...result,
    error: result.error || null
  };
};
