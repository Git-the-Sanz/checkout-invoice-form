import React, { FC, useEffect, useState } from 'react'
import { Progress, Button } from 'vtex.styleguide'
import { FormattedMessage } from 'react-intl'

import { verifySchemas } from '../common/utils'
import { fetchHeaders, fetchMethod, fetchPath } from '../common/fetch'

async function stall(stallTime = 3000) {
  await new Promise((resolve) => setTimeout(resolve, stallTime))
}

/**
 * @description
 * This wrapper verifies if the masterdata schema on the account is
 * the same as this app uses. If not, it will attempt to update it.
 */
const SchemaVerifier: FC = ({ children }) => {
  const [updatingSchema, setUpdating] = useState(false)
  const [enableReload, setEnableReload] = useState(false)
  const [progressSteps, setProgress] = useState(['inProgress', 'toDo'])

  const checkSchema = async () => {
    const isInvalid = await verifySchemas()
    if (isInvalid && !updatingSchema) {
      setUpdating(isInvalid)
      try {
        await fetch(fetchPath.generateSchema, {
          method: fetchMethod.put,
          headers: fetchHeaders,
        })
        /**
         * We implement a stalling strategy to give masterdata time
         * to index the new schema and avoid false positives
         */
        await stall(5000)
        setProgress(['completed', 'inProgress'])
        await stall()
      } catch (error) {
        console.error(error)
      } finally {
        setProgress(['completed', 'completed'])
        setEnableReload(true)
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
          <div className="w-100 pb6">
            <Progress type="steps" steps={progressSteps} />
          </div>
          <FormattedMessage id="admin/invoice-data-settings.updating-schema" />
          <div className="pt6 pb6">
            <Button
              variation="primary"
              block
              disabled={!enableReload}
              // eslint-disable-next-line no-undef
              onClick={() => window.location.reload()}
            >
              <FormattedMessage id="admin/invoice-data-settings.reload-button" />
            </Button>
          </div>
        </div>
      ) : (
        children
      )}
    </>
  )
}

export default SchemaVerifier
