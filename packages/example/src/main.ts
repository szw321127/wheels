import { MyPromise } from "@wheels/core";

const promise1 = new MyPromise<number>((resolve, reject) => {
  setTimeout(() => {
    resolve(1);
  }, 2000);
});
promise1.then((result) => console.log("result1", result));
const promise2 = MyPromise.resolve(1);
promise2.then((result) => console.log("result2", result));