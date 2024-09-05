import * as console from 'node:console'
import type { Page } from 'playwright'
import { ActionHistory } from './core/actions/actionHistory.ts'
import { PageClient } from './core/PageClient.ts'
import { delay } from './utils/base.util.ts'

const DEFAULT_MAX_DEPTH: number = 10

async function excuteTaskOnPage(task: string, page: Page): Promise<string> {
  const actionHistory = new ActionHistory()
  let currentDepth = 0

  while (currentDepth < DEFAULT_MAX_DEPTH) {
    const pageClient = await PageClient.makePageClient(page)

    try {
      await pageClient.unmarkPage()
    }
    catch (e) {
      console.error('An error occurred while executing the task:', e)
    }

    currentDepth += 1
    await delay(2000)
  }

  return 'No answer found'
}
