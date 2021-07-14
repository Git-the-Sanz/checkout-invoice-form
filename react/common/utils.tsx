import compare from 'json-schema-compare'

import { fetchPath } from './fetch'
import { SETTINGS_SCHEMA } from '../../common/schema'

export const schemaNames = {
  settings: 'invoiceSettings',
}

export const schemaTypes = {
  settings: 'settings',
}

/**
 * Compares the schema in masterdata vs the one in this application
 * @returns boolean
 */
export async function verifySchemas() {
  let returnState = false
  try {
    const settingsResponse = await fetch(
      `${fetchPath.getSchema}${schemaNames.settings}`
    )
    const settings = await settingsResponse.text()

    if (settings === '') {
      returnState = true
    } else {
      const parsedSettings = JSON.parse(settings)

      if ('error' in parsedSettings) {
        throw new Error('failed to json parse settings')
      } else {
        returnState = !compare(parsedSettings, SETTINGS_SCHEMA)
      }
    }
  } catch (ex) {
    console.error('Schema verification error: ', ex.message)
  } finally {
    // eslint-disable-next-line no-unsafe-finally
    return returnState
  }
}
