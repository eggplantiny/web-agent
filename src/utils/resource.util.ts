import { readFile } from 'node:fs/promises'

const RESOURCE_PATH = 'src/resources/'

export async function readFileAsync(filePath: string): Promise<string> {
  return readFile(filePath, 'utf-8')
}

export async function readScript(fileName: string): Promise<string> {
  return readFileAsync(`${RESOURCE_PATH}/scripts/${fileName}`)
}
