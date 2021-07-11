import {
  ClientsConfig,
  Service,
  ServiceContext,
  method,
  LRUCache,
  RecorderState
} from "@vtex/api";

import { Clients } from "./clients";
import { invoiceAppGetSchema } from "./middlewares/invoiceAppGetSchema";
import { generateInvoiceSchema } from "./middlewares/generateInvoiceSchema";
import { receiveDocuments } from "./middlewares/receiveDocuments";
import { saveMasterdataDocuments } from "./middlewares/saveMasterdataDocuments";

const TIMEOUT_MS = 5000;
const memoryCache = new LRUCache<string, any>({ max: 5000 });

const clients: ClientsConfig<Clients> = {
  implementation: Clients,
  options: {
    default: {
      retries: 2,
      timeout: TIMEOUT_MS
    },
    status: {
      memoryCache
    }
  }
};

declare global {
  type Context = ServiceContext<Clients, State>;

  type State = RecorderState;
}

export default new Service({
  clients,
  routes: {
    getSchema: method({
      GET: invoiceAppGetSchema
    }),
    generateSchema: method({
      PUT: generateInvoiceSchema
    }),
    getDocuments: method({
      GET: receiveDocuments
    }),
    saveDocuments: method({
      POST: saveMasterdataDocuments
    })
  }
});
