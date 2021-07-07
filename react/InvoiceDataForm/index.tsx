import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import { Button, Divider, EXPERIMENTAL_Select, Toggle } from 'vtex.styleguide'

const localeOptions = [
  {
    value: { id: 'it', name: 'it' },
    label: <FormattedMessage id="invoice-data-settings.locale.it" />,
  },
  {
    value: { id: 'fr', name: 'fr' },
    label: <FormattedMessage id="invoice-data-settings.locale.fr" />,
  }
]

const sdiPecOptions = [
  {
    value: 'none',
    label: <FormattedMessage id="invoice-data-settings.none" />,
  },
  {
    value: 'sdi',
    label: <FormattedMessage id="invoice-data-settings.sdi-pec.sdi" />,
  },
  {
    value: 'pec',
    label: <FormattedMessage id="invoice-data-settings.sdi-pec.pec" />,
  }
]

const personTypeOptions = [
  {
    value: 'none',
    label: <FormattedMessage id="invoice-data-settings.none" />,
  },
  {
    value: 'private',
    label: <FormattedMessage id="invoice-data-settings.person-type.private" />,
  },
  {
    value: 'company',
    label: <FormattedMessage id="invoice-data-settings.person-type.company" />,
  }
]

export default class InvoiceDataForm extends Component {
  constructor(props: any) {
    super(props)
    this.state = {
      locale: [],
      itSelected: false,
      showInvoiceForm: false,
      invoiceDataMandatory: false,
      showSDIPECSelector: false,
      defaultSDIPEC: 'none',
      showPersonTypeSelector: false,
      defaultPersonType: 'none',
      showTermsConditions: false,
      autocompleteNameSurname: false
    }
  }

  checkLanguageSelected = (options: []) => {
    const optionIT = options.filter((option: any) => option.value.id === 'it')

    this.setState({ itSelected: (optionIT.length > 0) })
  }

  public render() {
    const {
      locale,
      itSelected,
      showInvoiceForm,
      invoiceDataMandatory,
      showSDIPECSelector,
      defaultSDIPEC,
      showPersonTypeSelector,
      defaultPersonType,
      showTermsConditions,
      autocompleteNameSurname
    }: any = this.state

    return (
      <React.Fragment>
        <div className="mb3">
          <Toggle
            label={<FormattedMessage id="invoice-data-settings.invoice-form" />}
            checked={showInvoiceForm}
            onChange={() => { this.setState({ showInvoiceForm: !showInvoiceForm }) }}
          />
        </div>
        <div className="mb5">
          <Toggle
            label={<FormattedMessage id="invoice-data-settings.invoice-mandatory" />}
            checked={invoiceDataMandatory}
            onChange={() => { this.setState({ invoiceDataMandatory: !invoiceDataMandatory }) }}
          />
        </div>
        <div className="mb3">
          <EXPERIMENTAL_Select
            label={<FormattedMessage id="invoice-data-settings.locale" />}
            options={localeOptions}
            multi={true}
            onChange={(option: any) => {
              this.setState({ locale: option })
              this.checkLanguageSelected(option)
            }}
            defaultValue={localeOptions.filter((e) => e.value === locale)}
          />
        </div>
        {itSelected ?
          <React.Fragment>
            <div className="mv5">
              <Divider orientation="horizontal" />
            </div>
            <div className="mb4">
              <div className="t-small c-warning">
                {<FormattedMessage id="invoice-data-settings.sdi-pec.info-it" />}
              </div>
            </div>
            <div className="mb5">
              <Toggle
                label={<FormattedMessage id="invoice-data-settings.sdi-pec" />}
                checked={showSDIPECSelector}
                onChange={() => { this.setState({ showSDIPECSelector: !showSDIPECSelector }) }}
              />
            </div>
            <div className="mb3">
              <EXPERIMENTAL_Select
                label={<FormattedMessage id="invoice-data-settings.default" />}
                options={sdiPecOptions}
                multi={false}
                onChange={(option: any) => {
                  this.setState({ defaultSDIPEC: option.value })
                }}
                value={sdiPecOptions.filter((e) => e.value === defaultSDIPEC)}
              />
            </div>
            <div className="mv4">
              <div className="t-small c-muted-2">
                {<FormattedMessage id="invoice-data-settings.sdi-pec.info" />}
              </div>
            </div>
          </React.Fragment>
          : null
        }
        <div className="mv5">
          <Divider orientation="horizontal" />
        </div>
        <div className="mb5">
          <Toggle
            label={<FormattedMessage id="invoice-data-settings.person-type" />}
            checked={showPersonTypeSelector}
            onChange={() => { this.setState({ showPersonTypeSelector: !showPersonTypeSelector }) }}
          />
        </div>
        <div className="mb3">
          <EXPERIMENTAL_Select
            label={<FormattedMessage id="invoice-data-settings.default" />}
            options={personTypeOptions}
            multi={false}
            onChange={(option: any) => {
              this.setState({ defaultPersonType: option.value })
            }}
            value={personTypeOptions.filter((e) => e.value === defaultPersonType)}
          />
        </div>
        <div className="flex mv4 items-center">
          <div className="t-small c-muted-2">
            {<FormattedMessage id="invoice-data-settings.person-type.info" />}
          </div>
        </div>
        <div className="mv5">
          <Divider orientation="horizontal" />
        </div>
        <div className="mb3">
          <Toggle
            label={<FormattedMessage id="invoice-data-settings.terms-conditions" />}
            checked={showTermsConditions}
            onChange={() => { this.setState({ showTermsConditions: !showTermsConditions }) }}
          />
        </div>
        <div className="mb3">
          <Toggle
            label={<FormattedMessage id="invoice-data-settings.auto-name-surname" />}
            checked={autocompleteNameSurname}
            onChange={() => { this.setState({ autocompleteNameSurname: !autocompleteNameSurname }) }}
          />
        </div>
        <div className="flex mt4 items-center">
          <div className="t-small c-muted-2">
            {<FormattedMessage id="invoice-data-settings.auto-name-surname.info" />}
          </div>
        </div>
        <div className="flex justify-content flex-row-reverse">
          <Button
            variation="primary"
            onClick={() => { console.log('state', this.state) }}>
            {<FormattedMessage id="invoice-data-settings.btn-save" />}
          </Button>
        </div>
      </React.Fragment>
    )
  }
}
