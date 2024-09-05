import type { PageClient } from '../../PageClient.ts'
import type { Action } from './Action.ts'

export class GoBack implements Action {
  async applyTo(pageClient: PageClient): Promise<string> {
    await pageClient.goBack()
    return `Navigated back a page to ${pageClient.getCurrentUrl()}`
  }
}
