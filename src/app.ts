/*
 * @Author: M1tsuha
 * @Date: 2025-05-17 15:22:26
 * @LastEditors: M1tsuha
 * @LastEditTime: 2025-05-17 20:52:40
 * @FilePath: \SICISP_WebPOI\backend\src\app.ts
 * @Description: 
 * 
 * Copyright (c) 2025 by ${git_name_email}, All Rights Reserved. 
 */
import express from 'express';
import { sequelize }   from './config/db';
import cors from 'cors';
import { sitesRouter }     from './routes/sites';
import { searchRouter }    from './routes/search';
import { provinceRouter } from './routes/province';
import { bboxRouter } from './routes/bbox';
import { nearbyRouter } from './routes/nearby';

const app = express();
app.use(express.json());
app.use(cors());

// 注册子路由
app.use('/sites',  sitesRouter);
app.use('/search', searchRouter);
app.use('/province', provinceRouter);
app.use('/bbox', bboxRouter);
app.use('/nearby', nearbyRouter);

// 根路由
app.get('/', (_req, res) => {
  res.json({ msg: 'Scenic API OK' });
});

// 启动
const PORT = process.env.PORT || 3000;
sequelize.authenticate().then(() => {
  console.log('✅ DB connected');
  app.listen(PORT, () => console.log('🚀 API listening on', PORT));
});
