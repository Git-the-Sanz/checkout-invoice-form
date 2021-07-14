import React from 'react'
import { FormattedMessage } from 'react-intl'

export const localeOptions = [
  {
    value: { id: 'it', name: 'it' },
    label: <FormattedMessage id="admin/invoice-data-settings.locale.it" />,
  },
  {
    value: { id: 'fr', name: 'fr' },
    label: <FormattedMessage id="admin/invoice-data-settings.locale.fr" />,
  },
]

export const sdiPecOptions = [
  {
    value: 'none',
    label: <FormattedMessage id="admin/invoice-data-settings.none" />,
  },
  {
    value: 'sdi',
    label: <FormattedMessage id="admin/invoice-data-settings.sdi-pec.sdi" />,
  },
  {
    value: 'pec',
    label: <FormattedMessage id="admin/invoice-data-settings.sdi-pec.pec" />,
  },
]

export const personTypeOptions = [
  {
    value: 'none',
    label: <FormattedMessage id="admin/invoice-data-settings.none" />,
  },
  {
    value: 'private',
    label: (
      <FormattedMessage id="admin/invoice-data-settings.person-type.private" />
    ),
  },
  {
    value: 'company',
    label: (
      <FormattedMessage id="admin/invoice-data-settings.person-type.company" />
    ),
  },
]
