import type { PageClient } from '../../PageClient.ts'
import type { Action } from './Action.ts'

export class Wait implements Action {
  private readonly _time: number

  constructor() {
    this._time = 1000 * 5000
  }

  async applyTo(pageClient: PageClient): Promise<string> {
    await pageClient.sleep(this._time)
    return `Waited for ${this._time}ms`
  }
}
