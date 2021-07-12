/* eslint-disable @typescript-eslint/no-explicit-any */
import { ExternalClient, InstanceOptions, IOContext } from '@vtex/api'

import { SETTINGS_SCHEMA } from '../../common/schema'

export default class Masterdata extends ExternalClient {
  public schemas = {
    schemaEntity: 'InvoiceDataSettings',
    settingsSchema: {
      name: 'invoiceSettings',
      schema: SETTINGS_SCHEMA,
    },
  }

  constructor(context: IOContext, options?: InstanceOptions) {
    super('', context, {
      ...options,
      headers: {
        ...(options?.headers ?? {}),
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-Vtex-Use-Https': 'true',
      },
    })
  }

  public async getSchema(ctx: any, schema: string): Promise<any> {
    return ctx.clients.masterdata.getSchema({
      dataEntity: this.schemas.schemaEntity,
      schema: schema,
    })
  }

  public async generateSchema(ctx: any): Promise<any> {
    try {
      await ctx.clients.masterdata.createOrUpdateSchema({
        dataEntity: this.schemas.schemaEntity,
        schemaName: this.schemas.settingsSchema.name,
        schemaBody: this.schemas.settingsSchema.schema,
      })
    } catch (error) {
      console.error(error)
    } finally {
      // eslint-disable-next-line no-unsafe-finally
      return true
    }
  }

  public async getDocuments(
    ctx: any,
    schemaName: any,
    type: any,
    whereClause: any = ''
  ): Promise<any> {
    let whereCls = '(type="' + type + '"'
    if (whereClause !== '1') {
      whereClause.split('__').forEach((clause: any) => {
        whereCls += ' AND ' + clause
      })
    }
    whereCls += ')'

    return await ctx.clients.masterdata.searchDocuments({
      dataEntity: this.schemas.schemaEntity,
      fields: [],
      pagination: {
        page: 1,
        pageSize: 5000,
      },
      schema: schemaName,
      where: decodeURI(whereCls),
      sort: '',
    })
  }

  public async saveDocuments(
    ctx: any,
    schemaName: any,
    body: any
  ): Promise<any> {
    return await ctx.clients.masterdata.createOrUpdateEntireDocument({
      dataEntity: this.schemas.schemaEntity,
      fields: body,
      schema: schemaName,
      id: body.id ?? '',
    })
  }
}
