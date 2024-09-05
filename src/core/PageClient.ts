import type { Page } from 'playwright'
import type { WebElement } from '../types/base.type.ts'
import { ScrollDirection, ScrollOptions } from '../types/base.type.ts'
import { resourceManager } from './ResourceManager.ts'

interface JsResult {
  x: string
  y: string
  type: string
  text: string
  ariaLabel: string
}

export class PageClient {
  readonly page: Page
  readonly elements: WebElement[]

  public static readonly SCRIPT_PATH = 'src/resources/scripts/mark-page.js'

  public static async makePageClient(page: Page): Promise<PageClient> {
    const _script = await resourceManager.read(PageClient.SCRIPT_PATH)
    await page.evaluate(_script)

    const _jsResult = await page.evaluate<JsResult[]>('markPage()')
    const _elements: WebElement[] = _jsResult.map(item => ({
      ...item,
      x: Number.parseInt(item.x),
      y: Number.parseInt(item.y),
    }))

    return new PageClient(page, _elements)
  }

  private constructor(page: Page, elements: WebElement[]) {
    this.page = page
    this.elements = elements
  }

  public async scroll(webElementIndex: number, direction: ScrollDirection, option: ScrollOptions): Promise<void> {
    if (option === ScrollOptions.WINDOW) {
      const _amount = direction === ScrollDirection.UP ? -500 : 500
      await this.page.evaluate(`window.scrollBy(0, ${_amount})`)
    }
    else if (option === ScrollOptions.ELEMENT) {
      const _el = this.elements[webElementIndex]
      const _amount = direction === ScrollDirection.UP ? -500 : 500
      await this.page.mouse.move(_el.x, _el.y)
      await this.page.mouse.wheel(0, _amount)
    }
  }

  public async click(webElementIndex: number): Promise<void> {
    const _el = this.elements[webElementIndex]
    await this.page.mouse.click(_el.x, _el.y)
  }

  public async type(webElementIndex: number, text: string): Promise<void> {
    await this.click(webElementIndex)
    await this.page.keyboard.type(text)
  }

  public async asBase64(): Promise<string> {
    const _screenshot = await this.page.screenshot({ type: 'png' })
    return _screenshot.toString('base64')
  }

  public async typeAndSubmit(webElementIndex: number, text: string): Promise<void> {
    await this.type(webElementIndex, text)
    await this.submit()
  }

  public async submit(): Promise<void> {
    await this.page.keyboard.press('Enter')
  }

  public async goBack(): Promise<void> {
    await this.page.goBack()
  }

  public async sleep(ms: number): Promise<void> {
    await this.page.waitForTimeout(ms)
  }

  public async navigateTo(url: string): Promise<void> {
    await this.page.goto(url)
  }

  public async unmarkPage(): Promise<void> {
    await this.page.evaluate('unmarkPage()')
  }

  public getCurrentUrl(): string {
    return this.page.url()
  }
}
