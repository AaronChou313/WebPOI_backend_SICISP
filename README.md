# WebPOI_backend_SICISP
### 数据库文件 scenic_site_json.sql

进入自己的数据库中直接运行该sql文件即可复制数据库（本人数据库命名为webpoi）

### 项目文件目录

backend/
├─ src/
│  ├─ app.ts                 -创建 Express 实例、注册中间件和所有路由
│  │
│  ├─ config/
│  │   └─ db.ts              -Sequelize 初始化 + 导出 sequelize 实例
│  │
│  ├─ models/
│  │   └─ site.model.ts      -定义 poi_site 表的 Sequelize Model
│  │
│  ├─ routes/                -路由分组（按业务域拆分）
│  │   ├─ sites.ts           -sites        (id, with-photos, no-photos)
│  │   ├─ search.ts          -search       (关键词)
│  │   ├─ province.ts        -province     (单省 & 有/无图)
│  │   ├─ bbox.ts            -bbox         (矩形框)
│  │   └─ nearby.ts          -nearby       (圆形范围)
│  │
│  ├─ utils/
│  │   └─ paginator.ts       -通用分页计算 { limit, offset }
│  │
│  ├─ services/              -可选：复杂业务逻辑再下沉一层
│  │   └─ site.service.ts
│  │
│  └─ types/                 -全局 TS 类型声明（若需要）
│      └─ index.d.ts
│
├─ test/                     -Jest + supertest 集成/单元测试
│   └─ app.test.ts
│
├─ .env                      -DB_HOST=… PORT=…
├─ tsconfig.json             -TypeScript 编译选项
├─ package.json              -脚本 & 依赖
└─ README.md                 -项目说明



复制好数据库 下载完本项目后 配置node.js环境

更改.env文件为自己的数据库配置文件

回到backend文件夹下 输入npm run dev开始运行
