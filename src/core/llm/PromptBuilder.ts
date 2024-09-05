import type { WebElement } from '../../types/base.type.ts'
import type { PageClient } from '../PageClient.ts'
import type { ActionHistory } from '../actions/actionHistory.ts'

export class PromptBuilder {
  private readonly WEB_VOYAGER_SYSTEM_PROMPT_PATH = 'src/resources/prompts/web-voyager-system-prompt.txt'
  private readonly PREVIOUS_ACTION_SYSTEM_PROMPT_PATH = 'src/resources/prompts/previous-action-system-prompt.txt'
  private readonly USER_PROMPT_PATH = 'src/resources/prompts/user-prompt.txt'
}

export function refineWebElementToPrompt(webElements: WebElement[]): string {
  let prompt = ''
  for (let i = 0; i < webElements.length; i++) {
    const webElement = webElements[i]
    const description = webElement.ariaLabel === '' ? webElement.text : webElement.ariaLabel
    prompt += `${i} (<${webElement.type}/>): "${description}"\n`
  }

  return prompt
}

export function buildPrompt(question: string, pageClient: PageClient, history: ActionHistory) {

}
