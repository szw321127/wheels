import { ICache } from '@wheels/types'

export function fetchToSync(func: Function) {
  const oldFetch = window.fetch
  let cache: ICache = {
    state: 'pending',
    value: null,
  }
  const newFetch = (
    input: RequestInfo | URL,
    init?: RequestInit | undefined,
  ) => {
    if (cache.state === 'fulfilled') {
      return cache.value
    } else if (cache.state === 'rejected') {
      throw cache.value
    }
    const promise = oldFetch(input, init)
      .then(res => res.json())
      .then(res => {
        cache.state = 'fulfilled'
        cache.value = res
      })
      .catch(rej => {
        cache.state = 'rejected'
        cache.value = rej
      })
    throw promise
  }
  window.fetch = newFetch
  try {
    func()
  } catch (err) {
    if (err instanceof Promise) {
      err.finally(() => {
        window.fetch = newFetch
        func()
        window.fetch = oldFetch
      })
    }
  }
  window.fetch = oldFetch
}
