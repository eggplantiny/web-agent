import { readFileAsync } from '../utils/resource.util.ts'

export class ResourceManager {
  private readonly _cache: Map<string, string> = new Map()

  async read(path: string): Promise<string> {
    if (this._cache.has(path)) {
      return this._cache.get(path)!
    }

    const _data = await readFileAsync(path)
    this._cache.set(path, _data)

    return _data
  }
}

export const resourceManager = new ResourceManager()
