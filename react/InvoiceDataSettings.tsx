import React, { FC } from 'react'
import { FormattedMessage } from 'react-intl'
import { Layout, PageBlock, PageHeader } from 'vtex.styleguide'
import InvoiceDataForm from './InvoiceDataForm'
import './styles.global.css'

const InvoiceDataSettings: FC = () => {
  return (
    <Layout pageHeader={<PageHeader title={<FormattedMessage id="invoice-data-settings.title" />} />} >
      <PageBlock variation="full">
        <InvoiceDataForm />
      </PageBlock>
    </Layout>
  )
}

export default InvoiceDataSettings
