import React, { FC, useEffect, useState } from 'react'
import { Spinner } from 'vtex.styleguide'
import { formatMessage } from 'react-intl'

import { verifySchemas } from '../common/utils'
import { fetchHeaders, fetchMethod, fetchPath } from '../common/fetch'

const SchemaVerifier: FC = ({ children }) => {
  const [updatingSchema, setUpdating] = useState(false)

  const checkSchema = async () => {
    const isInvalid = await verifySchemas()
    console.log('Is the schema invalid? ', isInvalid)
    if (isInvalid && !updatingSchema) {
      setUpdating(isInvalid)

      try {
        await fetch(fetchPath.generateSchema, {
          method: fetchMethod.put,
          headers: fetchHeaders,
        }).finally(() => {
          // eslint-disable-next-line no-undef
          window.location.reload()
        })
      } catch (error) {
        console.error(error)
      }
    }
  }

  useEffect(() => {
    if (!updatingSchema) {
      checkSchema()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {updatingSchema ? (
        <div className="flex flex-column justify-center items-center">
          {formatMessage({
            id: 'admin/invoice-data-settings.updating-schema',
          })}
          <div className="pt6 pb6">
            <Spinner />
          </div>
        </div>
      ) : (
        children
      )}
    </>
  )
}

export default SchemaVerifier
