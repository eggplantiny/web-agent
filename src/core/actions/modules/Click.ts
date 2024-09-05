import { IllegalArgumentError } from '../../errors/base.error.ts'
import type { PageClient } from '../../PageClient.ts'
import type { Action } from './Action.ts'

export class Click implements Action {
  private readonly _webElementIndex: number

  constructor(args: string[]) {
    if (args.length < 1)
      throw new IllegalArgumentError('Click requires at least one argument')
    this._webElementIndex = Number.parseInt(args[0])
  }

  async applyTo(pageClient: PageClient): Promise<string> {
    await pageClient.click(this._webElementIndex)
    return `Click ${this._webElementIndex}`
  }
}
