/* eslint-disable prettier/prettier */
export const SETTINGS_SCHEMA = {
  'properties': {
    'showInvoiceForm': { 'type': 'boolean' },
    'invoiceDataMandatory': { 'type': 'boolean' },
    'locale': {
      'type': 'array',
      'items': {
        'type': 'string',
      },
    },
    'showSDIPECSelector': { 'type': 'boolean' },
    'defaultSDIPEC': { 'type': 'string' },
    'showPersonTypeSelector': { 'type': 'boolean' },
    'defaultPersonType': { 'type': 'string' },
    'showTermsConditions': { 'type': 'boolean' },
    'autocompleteName': { 'type': 'boolean' },
    'type': { 'type': 'string' },
  },
  'v-security': {
    'allowGetAll': true,
    'publicFilter': ['type'],
    'publicJsonSchema': false,
  },
  'v-cache': false,
  'v-default-fields': ['id', 'showInvoiceForm', 'invoiceDataMandatory', 'locale', 'showSDIPECSelector', 'defaultSDIPEC', 'showPersonTypeSelector', 'defaultPersonType', 'showTermsConditions', 'autocompleteName', 'type'],
  'v-indexed': ['id', 'type'],
}
