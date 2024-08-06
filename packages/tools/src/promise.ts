import { isPromiseLike } from "@wheels/utils";
import type { IMyPromise, HandlerType, OnFulFilledType, OnRejectedType, ResloveType, RejectType, AllResult } from "@wheels/types";

enum State {
  PENDING = "pending",
  FULFILLED = "fulfilled",
  REJECTED = "rejected",
}

export class MyPromise<T> implements IMyPromise<T> {
  private state = State.PENDING;
  private handlers: HandlerType[] = [];
  private result: T | any;

  constructor(executor: (reslove: ResloveType<T>, reject: RejectType) => void) {
    const reslove: ResloveType<T> = (result?: T | PromiseLike<T>) => {
      this.changeState(State.FULFILLED, result);
    };
    const reject: RejectType = (reason: any) => {
      this.changeState(State.REJECTED, reason);
    };
    try {
      executor(reslove, reject);
    } catch (error) {
      reject(error);
    }
  }

  private runMicroTask(callback: () => void) {
    if (typeof queueMicrotask === "function") {
      queueMicrotask(callback);
    } else if (typeof process === "object" && typeof process.nextTick === "function") {
      process.nextTick(callback);
    } else if (typeof setImmediate === "function") {
      setImmediate(callback);
    } else if (typeof MutationObserver === "function") {
      const observer = new MutationObserver(callback);
      const text = document.createTextNode("1");
      observer.observe(text, { characterData: true });
      text.data = "2";
    } else {
      setTimeout(callback, 0);
    }
  }

  private runOne(
    callback: OnFulFilledType<T, any> | OnRejectedType<any> | undefined,
    reslove: ResloveType<any>,
    reject: RejectType
  ) {
    this.runMicroTask(() => {
      if (typeof callback === "function") {
        try {
          const data = callback(this.result);
          if (isPromiseLike(data)) {
            data.then(reslove, reject);
          } else {
            reslove(data);
          }
        } catch (error) {
          reject(error);
        }
      } else {
        const settled = this.state === State.FULFILLED ? reslove : reject;
        settled(this.result);
      }
    });
  }

  private run() {
    if (this.state === State.PENDING) return;
    while (this.handlers.length) {
      const { onfulfilled, onrejected, reslove, reject } = this.handlers.shift() as HandlerType;
      if (this.state === State.FULFILLED) {
        this.runOne(onfulfilled, reslove, reject);
      } else if (this.state === State.REJECTED) {
        this.runOne(onrejected, reslove, reject);
      }
    }
  }

  private changeState(state: State, result?: T | any) {
    if (this.state !== State.PENDING) return;
    this.state = state;
    this.result = result;
    this.run();
  }

  public then<TR, TF = never>(onfulfilled?: OnFulFilledType<T, TR>, onrejected?: OnRejectedType<TF>) {
    return new MyPromise<TR | TF>((reslove, reject) => {
      this.handlers.push({ onfulfilled, onrejected, reslove, reject });
      this.run();
    });
  }

  public catch<TF = never>(onrejected?: OnRejectedType<TF>) {
    return new MyPromise<TF>((reslove, reject) => {
      this.handlers.push({ onrejected, reslove, reject });
      this.run();
    });
  }

  static resolve<T>(result?: T) {
    return isPromiseLike(result)
      ? (result as IMyPromise<any>)
      : new MyPromise<T>((reslove) => {
          reslove(result);
        });
  }

  static reject<T = never>(reason?: T) {
    return new MyPromise<T>((_, reject) => {
      reject(reason);
    });
  }

  static all<T extends readonly unknown[] | []>(values: T): MyPromise<AllResult<T>> {
    return new MyPromise((reslove, reject) => {
      const result: Awaited<T[number]>[] = [];
      let count = 0;
      for (let i = 0, len = values.length; i < len; i++) {
        (MyPromise.resolve(values[i]) as MyPromise<Awaited<T[number]>>).then((res) => {
          result[i] = res;
          count++;
          if (count === len) reslove(result as AllResult<T>);
        }, reject);
      }
    });
  }
}
