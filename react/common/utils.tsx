import compare from 'json-schema-compare'

import { fetchPath } from './fetch'
import { SETTINGS_SCHEMA } from '../../common/constants'

export const schemaNames = {
  settings: 'invoiceSettings',
}

export const schemaTypes = {
  settings: 'settings',
}

export async function verifySchemas() {
  const settingsSchemaResponse = await fetch(
    `${fetchPath.getSchema}${schemaNames.settings}`
  )

  let settingsSchema = await settingsSchemaResponse.json()
  settingsSchema = compare(settingsSchema, SETTINGS_SCHEMA)

  return settingsSchema
}
