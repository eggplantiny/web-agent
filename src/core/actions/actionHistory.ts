import type { Action } from './modules/Action.ts'

export class ActionHistory {
  private readonly _actions: Action[] = []

  public add(action: Action): void {
    this._actions.push(action)
  }

  public get actions(): Action[] {
    return this._actions
  }

  public clear(): void {
    this._actions.splice(0, this._actions.length)
  }

  public toString(): string {
    return JSON.stringify(this._actions)
  }
}
