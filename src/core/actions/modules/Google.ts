import type { PageClient } from '../../PageClient.ts'
import type { Action } from './Action.ts'

export class Google implements Action {
  private readonly URL = 'https://www.google.com'

  async applyTo(pageClient: PageClient): Promise<string> {
    const _url = this.URL
    await pageClient.navigateTo(_url)
    return `Navigated to ${_url}`
  }
}
