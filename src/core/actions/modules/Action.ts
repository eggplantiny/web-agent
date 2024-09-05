import type { PageClient } from '../../PageClient.ts'

export interface Action {
  applyTo: (pageClient: PageClient) => Promise<string>
}
