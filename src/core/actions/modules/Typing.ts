import { IllegalArgumentError } from '../../errors/base.error.ts'
import type { PageClient } from '../../PageClient.ts'
import type { Action } from './Action.ts'

export class Typing implements Action {
  private readonly _text: string
  private readonly _webElementIndex: number

  constructor(args: string[]) {
    if (args.length !== 2)
      throw new IllegalArgumentError(`Typing requires 2 arguments, but got ${args.length}`)

    this._webElementIndex = Number.parseInt(args[0])
    this._text = args[1]
  }

  async applyTo(pageClient: PageClient): Promise<string> {
    await pageClient.typeAndSubmit(this._webElementIndex, this._text)
    return `Typed "${this._text}" and submitted`
  }
}
