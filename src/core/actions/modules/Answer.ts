import { IllegalArgumentError } from '../../errors/base.error.ts'
import type { PageClient } from '../../PageClient.ts'
import type { Action } from './Action.ts'

export class Answer implements Action {
  private readonly _answer: string

  constructor(args: string[]) {
    if (args.length < 0)
      throw new IllegalArgumentError('Answer requires at least one argument')

    this._answer = args.join(':')
  }

  async applyTo(_pageClient: PageClient): Promise<string> {
    return this._answer
  }
}
