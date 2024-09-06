import type { ITask, TaskNode, TaskFn } from '@wheels/types'

export class Task implements ITask {
  private limit: number = 10
  private tasks: TaskNode<unknown>[] = []
  private running: number = 0
  get Limit() {
    return this.limit
  }
  set Limit(limit: number) {
    this.limit = limit
  }
  constructor(limit: number) {
    this.limit = limit || this.limit
  }
  private run() {
    while (this.running < this.limit && this.tasks.length) {
      const task = this.tasks.shift()
      task
        ?.task()
        .then(task.resolve)
        .catch(task.reject)
        .finally(() => {
          this.running--
          this.run()
        })
      this.running++
    }
  }

  add<T>(task: TaskFn<T>): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      ;(this.tasks as TaskNode<T>[]).push({
        task,
        resolve,
        reject,
      })
      this.run()
    })
  }
}
