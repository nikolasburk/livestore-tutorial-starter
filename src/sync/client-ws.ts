import { makeDurableObject } from '@livestore/sync-cf/cf-worker'
import type { CfTypes } from '@livestore/sync-cf/cf-worker'
import * as SyncBackend from '@livestore/sync-cf/cf-worker'

export class SyncBackendDO extends makeDurableObject({
  onPush: async (message, context) => {
    console.log('client-ws.ts: onPush', message, context)
  },
  onPull: async (message, context) => {
    console.log('client-ws.ts: onPull', message, context)
  },
}) {}

export default {
  async fetch(request: CfTypes.Request, _env: SyncBackend.Env, ctx: CfTypes.ExecutionContext) {
    const searchParams = SyncBackend.matchSyncRequest(request)
    console.log('client-ws.ts: fetch in  with searchParams', searchParams)
    if (searchParams !== undefined) {
      return SyncBackend.handleSyncRequest({
        request,
        searchParams,
        ctx,
        syncBackendBinding: 'SYNC_BACKEND_DO',
      })
    }

    return new Response('Not Found', { status: 404 })
  },
}
