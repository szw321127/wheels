export type StateType = 'REJECTED' | 'FULLFILLED' | 'PENDING'

export type TaskFn<T> = () => Promise<T>

export type TaskNode<T> = {
	task: TaskFn<T>
	resolve: (value: T | PromiseLike<T>) => void
	reject: (reason?: any) => void
}

export interface ITask {
	add<T>(task: TaskFn<T> | TaskFn<T>[]): Promise<T | T[]>
}
