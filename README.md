# wheels

前端轮子库

## 环境

### 要求

- nodejs >= 18.x
- pnpm >= 8.x

### 安装

```bash
pnpm i -wr
```

### 添加依赖

```bash
pnpm i -w --save-dev <package>
```

### 添加子包依赖

```bash
pnpm i --save-dev <package> -r --filter @wheels/<subpackage>
```

## 开发

### 目录结构

```bash
├── dist                  # 打包目录
├── packages              # 包目录
    ├── core              # 源码包目录
        ├── src           # 源码目录
            ├── *.ts      # 源码文件
        ├── index.ts      # 源码入口文件
        ├── package.json  # 源码配置文件
    ├── example           # 演示包目录（开发可以在这里查看效果）
        ├── src           # 源码目录
            ├── *.ts      # 源码文件
        ├── index.html    # 页面入口文件
        ├── package.json  # 源码配置文件
    ├── types             # 类型包目录
        ├── src           # 源码目录
            ├── *.ts      # 源码文件
        ├── index.ts      # 源码入口文件
        ├── package.json  # 源码配置文件
    ├── utils             # 工具包目录
        ├── src           # 源码目录
            ├── *.ts      # 源码文件
        ├── index.ts      # 源码入口文件
        ├── package.json  # 源码配置文件
├── eslint.config.js      # eslint 配置文件
├── .prettierrc           # prettier 配置文件
├── tsconfig.json         # typescript 配置文件
├── package.json          # 项目配置文件
├── README.md             # 项目说明文件
```

### 待开发内容

- Memo（记忆函数）
- LRU（最近最少使用）
- Cancelable（可取消的 Promise）

### 已开发内容

- Promise（自定义版 Promise）
- FetchToSync（异步转同步）
- Task（任务队列）

### 开发流程
1. 在 `packages` 目录下新建一个文件夹，然后在新建的文件夹中新建 `src`、`index.ts`、`package.json` 三个文件。
2. 在 `src` 目录下新建一个 `*.ts` 文件，然后编写代码。
3. 在 `index.ts` 中导出代码。
4. 开发完可以使用 `example` 子包在 `src` 目录下编写示例代码，运行 `npm run dev` 查看效果。
5. 开发完后要更新 `README.md`。
6. 代码提交前运行 `npm run format-check --write` 检测并自动 `format` 代码格式。
7. 提交代码。


**注意：**

- 包目录下，`src` 目录下的文件为源码文件，`index.ts` 为源码入口文件。
- 有新的包，在 `packages` 目录下新建一个文件夹，然后在新建的文件夹中新建 `src`、`index.ts`、`package.json` 三个文件。
- 包名以 `@wheels/` 开头，例如：`@wheels/core`。
- 有不错的 Tool 想法可以在上述待开发内容中补充。
- 开发完后要更新 `README.md`。
