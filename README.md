# WebPOI_backend_SICISP
### 数据库文件 scenic_site_json.sql

进入自己的数据库中直接运行该sql文件即可复制数据库（本人数据库命名为webpoi）

### 项目文件目录

```text

backend/
├─ src/
│  ├─ app.ts                     # 创建 Express 实例、注册中间件和全部路由
│  │
│  ├─ config/
│  │   └─ db.ts                  # 初始化 Sequelize，读取 .env 并导出 sequelize
│  │
│  ├─ models/                    # 数据表模型
│  │   └─ site.model.ts          # poi_site 表的定义
│  │
│  ├─ routes/                    # 业务路由（REST 接口）
│  │   ├─ sites.ts               # /sites (id / with-photos / no-photos)
│  │   ├─ search.ts              # /search (关键词)
│  │   ├─ province.ts            # /province (单省 & 有/无图)
│  │   ├─ bbox.ts                # /bbox (矩形框范围)
│  │   └─ nearby.ts              # /nearby (中心点 + 半径)
│  │
│  ├─ utils/
│  │   └─ paginator.ts           # 通用分页工具 { limit, offset }
│  │
│  ├─ services/                  # 可选：复杂业务逻辑再下沉
│  │   └─ site.service.ts
│  │
│  └─ types/                     # 全局类型声明（如需）
│      └─ index.d.ts
│
├─ test/                         # Jest + supertest 自动化测试
│   └─ app.test.ts
│
├─ .env                          # DB_HOST / DB_USER / DB_PASS / PORT ...
├─ tsconfig.json                 # TypeScript 编译配置
├─ package.json                  # 依赖 & npm scripts
└─ README.md                     # 项目说明 / 接口文档

```


复制好数据库 下载完本项目后 配置node.js环境

更改.env文件为自己的数据库配置文件

回到backend文件夹下 输入npm run dev开始运行
