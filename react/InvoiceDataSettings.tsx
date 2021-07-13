import React, { FC } from 'react'
import { FormattedMessage } from 'react-intl'
import { Layout, PageBlock, PageHeader } from 'vtex.styleguide'

import SchemaVerifier from './InvoiceDataForm/wrapper'
import InvoiceDataForm from './InvoiceDataForm'
import './styles.global.css'

const InvoiceDataSettings: FC = () => {
  return (
    <Layout
      pageHeader={
        <PageHeader
          title={<FormattedMessage id="invoice-data-settings.title" />}
          subtitle={<FormattedMessage id="invoice-data-settings.subtitle" />}
        />
      }
    >
      <PageBlock variation="full">
        <SchemaVerifier>
          <InvoiceDataForm />
        </SchemaVerifier>
      </PageBlock>
    </Layout>
  )
}

export default InvoiceDataSettings
