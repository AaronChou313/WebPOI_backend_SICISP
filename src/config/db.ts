// src/config/db.ts
import 'dotenv/config';      // ← 放在第一行，自动调用 dotenv.config()
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

// 🌟 强制读取 .env （指定绝对路径最保险）
const envPath = path.resolve(__dirname, '..', '..', '.env');
console.log('[DEBUG] Reading .env from:', envPath, fs.existsSync(envPath));

dotenv.config({ path: envPath });

console.log('[DEBUG] DB_USER =', process.env.DB_USER);   // ← 应显示 m1tsuha

import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize(
  process.env.DB_NAME!,      // '!' 表示断言已存在
  process.env.DB_USER!,
  process.env.DB_PASS!,
  {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    dialect: 'mysql',
    logging: false,
    dialectOptions: { charset: 'utf8mb4' },
  }
);
