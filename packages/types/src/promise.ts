export interface IMyPromise<T> {
	then<TResult1, TResult2>(
		onfulfilled?: OnFulFilledType<T, TResult1>,
		onrejected?: OnRejectedType<TResult2>
	): PromiseLike<TResult1 | TResult2>

	catch<TResult>(onrejected?: OnRejectedType<TResult>): PromiseLike<TResult>
}

export type ResolveType<T> = (result?: T | PromiseLike<T>) => void

export type RejectType<T = any> = (reason?: T) => void

export type OnFulFilledType<T, TR> = ((result: T) => TR | PromiseLike<TR>) | null

export type OnRejectedType<T> = ((...args: any) => T | PromiseLike<T>) | null

export type HandlerType = {
	onfulfilled?: OnFulFilledType<any, any>
	onrejected?: OnRejectedType<any>
	resolve: ResolveType<any>
	reject: RejectType
}

export type AllResult<T extends readonly unknown[] | []> = {
	-readonly [P in keyof T]: Awaited<T[P]>
}
