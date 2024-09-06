import { MyPromise, fetchToSync } from '@wheels/core'

// @ts-ignore-next
MyPromise.resolve(1).then(2).then(MyPromise.resolve(3)).then(console.log)

// const promise1 = new MyPromise<number>((resolve, reject) => {
//   setTimeout(() => {
//     resolve(1)
//   }, 2000)
// })
// promise1.then(result => console.log('result1', result))
// const promise2 = MyPromise.resolve(1)
// promise2.then(result => console.log('result2', result))

// function getUserInfo() {
//   return fetch('/jsons/userInfo.json')
// }

// function m1() {
//   console.log('m1')
//   return getUserInfo()
// }

// function m2() {
//   console.log('m2')
//   return m1()
// }

// function m3() {
//   console.log('m3')
//   return m2()
// }

// function main() {
//   console.log('main')
//   const user = m3()
//   console.log(user)
// }

// fetchToSync(main)
