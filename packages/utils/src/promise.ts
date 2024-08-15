export const isPromiseLike = (obj: unknown): boolean => {
  if (typeof obj !== 'object' && typeof obj !== 'function') {
    // 如果 obj 不是对象或函数，则直接返回 false
    return false
  }

  // 自定义类型守卫来检查 obj 是否有符合 Promise 的 then 方法
  function hasThenMethod(value: unknown) {
    return (
      value !== null && typeof (value as PromiseLike<any>).then === 'function'
    )
  }

  // 使用类型守卫检查 obj
  return hasThenMethod(obj)
}
