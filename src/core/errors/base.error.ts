export class BaseError extends Error {
  readonly name: string
  readonly message: string

  constructor(name: string, message: string) {
    super()
    this.name = name
    this.message = message
  }

  toString(): string {
    return `${this.name}: ${this.message}`
  }
}

export class IllegalArgumentError extends BaseError {
  constructor(message: string) {
    super('IllegalArgumentError', message)
  }
}
