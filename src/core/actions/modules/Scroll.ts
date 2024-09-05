import { IllegalArgumentError } from '../../errors/base.error.ts'
import type { PageClient } from '../../PageClient.ts'
import { ScrollDirection, ScrollOptions } from '../../../types/base.type.ts'
import type { Action } from './Action.ts'

export class Scroll implements Action {
  private readonly _webElementIndex: number
  private readonly _scrollOption: ScrollOptions
  private readonly _scrollDirection: ScrollDirection

  constructor(args: string[]) {
    if (args.length !== 2)
      throw new IllegalArgumentError(`Scroll requires 2 arguments, but got ${args.length}`)
    const _target: string = args[0]
    const _direction: string = args[1]

    if (_direction === 'up') {
      this._scrollDirection = ScrollDirection.UP
    }
    else if (_direction === 'down') {
      this._scrollDirection = ScrollDirection.DOWN
    }
    else {
      throw new IllegalArgumentError(`Invalid scroll direction: ${_direction}`)
    }

    if (_target === 'window') {
      this._webElementIndex = -1
      this._scrollOption = ScrollOptions.WINDOW
    }
    else if (_target === 'element') {
      this._scrollOption = ScrollOptions.ELEMENT
      this._webElementIndex = Number.parseInt(_target)
    }
    else {
      throw new IllegalArgumentError(`Invalid scroll target: ${_target}`)
    }
  }

  async applyTo(pageClient: PageClient): Promise<string> {
    await pageClient.scroll(this._webElementIndex, this._scrollDirection, this._scrollOption)
    return `Scroll ${this._scrollDirection} in element`
  }
}
