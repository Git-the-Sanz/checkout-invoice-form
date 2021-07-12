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
  },
  'v-security': {
    'allowGetAll': true,
    'publicFilter': ['id', 'createdIn'],
    'publicJsonSchema': false,
  },
  'v-cache': false,
  'v-default-fields': ['id', 'createdIn'],
  'v-indexed': ['id', 'createdIn'],
}
