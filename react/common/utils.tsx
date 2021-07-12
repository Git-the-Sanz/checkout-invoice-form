import compare from 'json-schema-compare'

import { fetchPath } from './fetch'
import { SETTINGS_SCHEMA } from '../../common/schema'

export const schemaNames = {
  settings: 'invoiceSettings',
}

export const schemaTypes = {
  settings: 'settings',
}

export async function verifySchemas() {
  console.log('%c VERIFYING... ', 'background: #fff; color: #333')
  let returnState = false

  try {
    const settingsResponse = await fetch(
      `${fetchPath.getSchema}${schemaNames.settings}`
    )
    const settings = await settingsResponse.text()

    if (settings === '') {
      console.log(
        '%c NO SETTINGS SCHEMA FOUND ',
        'background: red; color: white'
      )
      returnState = true
    } else {
      const parsedSettings = JSON.parse(settings)
      console.log(
        '%c SCHEMA: ',
        'background: yellow; color: black',
        parsedSettings
      )
      if ('error' in parsedSettings) {
        throw new Error('failed to json parse settings')
      } else {
        returnState = compare(settings, SETTINGS_SCHEMA)
      }
    }
  } catch (ex) {
    console.error('Schema verification error: ', ex.message)
  } finally {
    // eslint-disable-next-line no-unsafe-finally
    return returnState
  }
}
