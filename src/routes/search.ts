/*
 * @Author: M1tsuha
 * @Date: 2025-05-17 15:21:08
 * @LastEditors: M1tsuha
 * @LastEditTime: 2025-05-17 18:16:10
 * @FilePath: \SICISP_WebPOI\backend\src\routes\search.ts
 * @Description: 
 * 
 * Copyright (c) 2025 by ${git_name_email}, All Rights Reserved. 
 */
import { Router, Request, Response } from 'express';
import { Op } from 'sequelize';
import { Site } from '../models/site.model';

export const searchRouter = Router();

/** GET /search?q=关键词  —— 按名称模糊匹配，返回前 20 条 */
searchRouter.get('/', async (req: Request, res: Response): Promise<void> => {
  const q = (req.query.q as string)?.trim() || '';

  // 参数缺失
  if (!q) {
    res.status(400).json({
      status: 400,
      code: 1401,
      message: 'Missing parameter: q',
      help: 'https://api.example.com/docs/errors#1401',
      data: null
    });
    return;
  }

  try {
    const rows = await Site.findAll({
      where: { name: { [Op.like]: `%${q}%` } },
      limit: 20,
      order: [['photo_count', 'DESC']]
    });

    res.json({
      status: 200,
      code: 1000,
      message: 'OK',
      help: null,
      data: rows.map(r => r.get({ plain: true }))  
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      status: 500,
      code: 1500,
      message: 'Internal server error',
      help: 'https://api.example.com/docs/errors#1500',
      data: null
    });
  }
});
