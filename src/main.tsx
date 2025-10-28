import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { makePersistedAdapter } from '@livestore/adapter-web'
import { LiveStoreProvider } from '@livestore/react'
import { schema } from './livestore/schema.ts'
import LiveStoreWorker from './livestore/livestore.worker.ts?worker'
import LiveStoreSharedWorker from '@livestore/adapter-web/shared-worker?sharedworker'
import { unstable_batchedUpdates as batchUpdates } from 'react-dom'

const adapter = makePersistedAdapter({
  storage: { type: 'opfs' },
  worker: LiveStoreWorker,
  sharedWorker: LiveStoreSharedWorker,
})

createRoot(document.getElementById('root')!).render(
  <LiveStoreProvider
    schema={schema}
    adapter={adapter}
    renderLoading={(_) => <div>Loading LiveStore ({_.stage})...</div>}
    storeId="todo-db-tutorial"
    batchUpdates={batchUpdates}
  >
    <App />
  </LiveStoreProvider>
)