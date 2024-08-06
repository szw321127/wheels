# wheels

前端轮子库

## 环境

### 要求

- nodejs >= 18.x
- pnpm >= 8.x

### 安装

```bash
pnpm i -w
```

## 开发

### 目录结构

```bash
├── dist                  # 打包目录
├── packages              # 包目录
    ├── tools             # 工具包目录
        ├── src           # 源码目录
            ├── *.ts      # 源码文件
        ├── index.ts      # 源码入口文件
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
- AsyncToSync 异步转同步
- Memo 记忆函数
- LRU 最近最少使用
- Task 控制并发任务数量
- Cancel 取消任务