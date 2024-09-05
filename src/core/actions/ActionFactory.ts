import { IllegalArgumentError } from '../errors/base.error.ts'
import type { Action } from './modules/Action.ts'
import { Click } from './modules/Click.ts'
import { Typing } from './modules/Typing.ts'
import { Scroll } from './modules/Scroll.ts'
import { Wait } from './modules/Wait.ts'
import { GoBack } from './modules/GoBack.ts'
import { Google } from './modules/Google.ts'
import { Answer } from './modules/Answer.ts'

type ActionFunction = (args: string[]) => Action

export class ActionFactory {
  private readonly _actionMap: Map<string, ActionFunction> = new Map()

  constructor() {
    this._actionMap.set('Click', args => new Click(args))
    this._actionMap.set('Type', args => new Typing(args))
    this._actionMap.set('Scroll', args => new Scroll(args))
    this._actionMap.set('Answer', args => new Answer(args))
    this._actionMap.set('Wait', () => new Wait())
    this._actionMap.set('GoBack', () => new GoBack())
    this._actionMap.set('Google', () => new Google())
  }

  public createAction(actionType: string, args: string[]): Action {
    const _actionFunc = this._actionMap.get(actionType)
    if (!_actionFunc) {
      throw new IllegalArgumentError(`Action type ${actionType} is not supported.`)
    }

    return _actionFunc(args)
  }
}
