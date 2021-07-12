/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/camelcase */
/* eslint-disable react/jsx-pascal-case */
import React, { Component } from 'react'
import {
  Button,
  Divider,
  EXPERIMENTAL_Select,
  Toggle,
  Spinner,
} from 'vtex.styleguide'
import { FormattedMessage, injectIntl } from 'react-intl'

import { schemaNames, schemaTypes } from '../common/utils'
import { fetchHeaders, fetchMethod, fetchPath } from '../common/fetch'
import {
  localeOptions,
  sdiPecOptions,
  personTypeOptions,
} from '../common/options'
import styles from './styles.css'

class InvoiceDataForm extends Component<any, any> {
  constructor(props: any) {
    super(props)
    this.state = {
      loadingSettings: false,
      locale: [],
      italySelected: false,
      showInvoiceForm: false,
      invoiceDataMandatory: false,
      showSDIPECSelector: false,
      defaultSDIPEC: 'none',
      showPersonTypeSelector: false,
      defaultPersonType: 'none',
      showTermsConditions: false,
      autocompleteNameSurname: false,
      successMessage: '',
      errorMessage: '',
    }
  }

  public componentDidMount(): void {
    this.getSettings()
  }

  public getSettings = () => {
    this.setState({ loadingSettings: true })
    console.log('%c GETTING SETTINGS... ', 'background: #fff; color: #333')

    fetch(
      `${fetchPath.getDocuments}${schemaNames.settings}/${schemaTypes.settings}/1`,
      {
        method: fetchMethod.get,
        headers: fetchHeaders,
      }
    )
      .then((response) => {
        return response.json()
      })
      .then((json) => {
        console.log('%c SETTINGS ', 'background: yellow; color: black', json)

        if (json?.[0]) {
          this.setState({
            /* locale: json[0].locale,
            showInvoiceForm: json[0].showInvoiceForm,
            invoiceDataMandatory: json[0].invoiceDataMandatory,
            showSDIPECSelector: json[0].showSDIPECSelector,
            defaultSDIPEC: json[0].defaultSDIPEC,
            showPersonTypeSelector: json[0].showPersonTypeSelector,
            defaultPersonType: json[0].defaultPersonType,
            showTermsConditions: json[0].showTermsConditions,
            autocompleteNameSurname: json[0].autocompleteNameSurname, */
            loadingSettings: false,
          })
        }
      })
      .catch((err) => this.setState({ errorMessage: err }))
  }

  public saveSettings = () => {
    this.setState({
      successMessage: '',
      errorMessage: '',
      savingSettings: true,
    })
    const {
      locale,
      showInvoiceForm,
      invoiceDataMandatory,
      showSDIPECSelector,
      defaultSDIPEC,
      showPersonTypeSelector,
      defaultPersonType,
      showTermsConditions,
      autocompleteNameSurname,
    } = this.state

    // eslint-disable-next-line prefer-const
    let hasErrors = false
    if (hasErrors) {
      this.setState({ savingSettings: false })
      return
    }

    const postData = {
      locale: locale,
      showInvoiceForm: showInvoiceForm,
      invoiceDataMandatory: invoiceDataMandatory,
      showSDIPECSelector: showSDIPECSelector,
      defaultSDIPEC: defaultSDIPEC,
      showPersonTypeSelector: showPersonTypeSelector,
      defaultPersonType: defaultPersonType,
      showTermsConditions: showTermsConditions,
      autocompleteNameSurname: autocompleteNameSurname,
      type: schemaTypes.settings,
    }

    this.saveMasterData(postData)
  }

  public saveMasterData = (postData: any) => {
    const { formatMessage } = this.props.intl
    fetch(fetchPath.saveDocuments + schemaNames.settings + '/', {
      method: fetchMethod.post,
      body: JSON.stringify(postData),
      headers: fetchHeaders,
    })
      .then((response) => response)
      .then(() => {
        this.setState({
          successMessage: formatMessage({
            id: 'admin/invoice-data-settings.saved',
          }),
          savingSettings: false,
        })
        setTimeout(() => {
          // eslint-disable-next-line no-undef
          window.location.reload()
        }, 5000)
      })
      .catch((err) =>
        this.setState({ savingSettings: false, errorMessage: err })
      )
  }

  public checkLanguageSelected = (options: []) => {
    const optionIT = options.filter((option: any) => option.value.id === 'it')
    this.setState({ italySelected: optionIT.length > 0 })
  }

  public render() {
    const {
      loadingSettings,
      savingSettings,
      locale,
      italySelected,
      showInvoiceForm,
      invoiceDataMandatory,
      showSDIPECSelector,
      defaultSDIPEC,
      showPersonTypeSelector,
      defaultPersonType,
      showTermsConditions,
      autocompleteNameSurname,
      successMessage,
      errorMessage,
    }: any = this.state
    const { formatMessage } = this.props.intl

    return (
      <React.Fragment>
        {loadingSettings ? (
          <div className="flex flex-column justify-center items-center">
            {formatMessage({
              id: 'admin/invoice-data-settings.loading-settings',
            })}
            <div className="pt6 pb6">
              <Spinner />
            </div>
          </div>
        ) : (
          <div>
            <div className="flex flex-column mb6">
              <div className="mb3">
                <Toggle
                  label={
                    <FormattedMessage id="invoice-data-settings.invoice-form" />
                  }
                  checked={showInvoiceForm}
                  onChange={() => {
                    this.setState({ showInvoiceForm: !showInvoiceForm })
                  }}
                />
              </div>
              <div className="mb5">
                <Toggle
                  label={
                    <FormattedMessage id="invoice-data-settings.invoice-mandatory" />
                  }
                  checked={invoiceDataMandatory}
                  onChange={() => {
                    this.setState({
                      invoiceDataMandatory: !invoiceDataMandatory,
                    })
                  }}
                />
              </div>
              <div className="mb3">
                <EXPERIMENTAL_Select
                  label={<FormattedMessage id="invoice-data-settings.locale" />}
                  options={localeOptions}
                  multi
                  onChange={(option: any) => {
                    this.setState({ locale: option })
                    this.checkLanguageSelected(option)
                  }}
                  defaultValue={localeOptions.filter((e) => e.value === locale)}
                />
              </div>
              {italySelected ? (
                <React.Fragment>
                  <div className="mv5">
                    <Divider orientation="horizontal" />
                  </div>
                  <div className="mb4">
                    <div className="t-small c-warning">
                      {
                        <FormattedMessage id="invoice-data-settings.sdi-pec.info-it" />
                      }
                    </div>
                  </div>
                  <div className="mb5">
                    <Toggle
                      label={
                        <FormattedMessage id="invoice-data-settings.sdi-pec" />
                      }
                      checked={showSDIPECSelector}
                      onChange={() => {
                        this.setState({
                          showSDIPECSelector: !showSDIPECSelector,
                        })
                      }}
                    />
                  </div>
                  <div className="mb3">
                    <EXPERIMENTAL_Select
                      label={
                        <FormattedMessage id="invoice-data-settings.default" />
                      }
                      options={sdiPecOptions}
                      multi={false}
                      onChange={(option: any) => {
                        this.setState({ defaultSDIPEC: option.value })
                      }}
                      value={sdiPecOptions.filter(
                        (e) => e.value === defaultSDIPEC
                      )}
                    />
                  </div>
                  <div className="mv4">
                    <div className="t-small c-muted-2">
                      {
                        <FormattedMessage id="invoice-data-settings.sdi-pec.info" />
                      }
                    </div>
                  </div>
                </React.Fragment>
              ) : null}
              <div className="mv5">
                <Divider orientation="horizontal" />
              </div>
              <div className="mb5">
                <Toggle
                  label={
                    <FormattedMessage id="invoice-data-settings.person-type" />
                  }
                  checked={showPersonTypeSelector}
                  onChange={() => {
                    this.setState({
                      showPersonTypeSelector: !showPersonTypeSelector,
                    })
                  }}
                />
              </div>
              <div className="mb3">
                <EXPERIMENTAL_Select
                  label={
                    <FormattedMessage id="invoice-data-settings.default" />
                  }
                  options={personTypeOptions}
                  multi={false}
                  onChange={(option: any) => {
                    this.setState({ defaultPersonType: option.value })
                  }}
                  value={personTypeOptions.filter(
                    (e) => e.value === defaultPersonType
                  )}
                />
              </div>
              <div className="flex mv4 items-center">
                <div className="t-small c-muted-2">
                  {
                    <FormattedMessage id="invoice-data-settings.person-type.info" />
                  }
                </div>
              </div>
              <div className="mv5">
                <Divider orientation="horizontal" />
              </div>
              <div className="mb3">
                <Toggle
                  label={
                    <FormattedMessage id="invoice-data-settings.terms-conditions" />
                  }
                  checked={showTermsConditions}
                  onChange={() => {
                    this.setState({ showTermsConditions: !showTermsConditions })
                  }}
                />
              </div>
              <div className="mb3">
                <Toggle
                  label={
                    <FormattedMessage id="invoice-data-settings.auto-name-surname" />
                  }
                  checked={autocompleteNameSurname}
                  onChange={() => {
                    this.setState({
                      autocompleteNameSurname: !autocompleteNameSurname,
                    })
                  }}
                />
              </div>
              <div className="flex mt4 items-center">
                <div className="t-small c-muted-2">
                  {
                    <FormattedMessage id="invoice-data-settings.auto-name-surname.info" />
                  }
                </div>
              </div>
            </div>
            <Divider orientation="horizontal" />
            <div className="flex flex-column mt6">
              <Button
                variation="primary"
                isLoading={savingSettings}
                onClick={() => {
                  //this.saveSettings()
                }}
              >
                {<FormattedMessage id="invoice-data-settings.btn-save" />}
              </Button>
            </div>
            {successMessage ? (
              <div className="flex flex-column mt6">
                <p className={styles.successMessage}>{successMessage}</p>
              </div>
            ) : null}
            {errorMessage ? (
              <div className="flex flex-column mt6">
                <p className={styles.errorMessage}>
                  {JSON.stringify(errorMessage)}
                </p>
              </div>
            ) : null}
          </div>
        )}
      </React.Fragment>
    )
  }
}

export default injectIntl(InvoiceDataForm)
