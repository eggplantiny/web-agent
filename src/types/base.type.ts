export interface WebElement {
  x: number
  y: number
  type: string
  text: string
  ariaLabel: string
}

export enum ScrollOptions {
  WINDOW,
  ELEMENT,
}

export enum ScrollDirection {
  UP = 'up',
  DOWN = 'down',
}
