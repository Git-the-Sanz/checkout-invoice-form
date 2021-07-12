export async function generateInvoiceSchema(
  ctx: Context,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  next: () => Promise<any>
) {
  const {
    clients: { masterData: masterDataClient },
  } = ctx
  const response = await masterDataClient.generateSchema(ctx)

  ctx.status = 200
  ctx.body = response

  await next()
}
