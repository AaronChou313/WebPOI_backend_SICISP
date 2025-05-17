/*
 * @Author: M1tsuha
 * @Date: 2025-05-17 20:51:30
 * @LastEditors: M1tsuha
 * @LastEditTime: 2025-05-17 20:52:01
 * @FilePath: \SICISP_WebPOI\backend\src\routes\nearby.ts
 * @Description: 
 * 
 * Copyright (c) 2025 by ${git_name_email}, All Rights Reserved. 
 */
import { Router, Request, Response } from 'express';
import { Op, fn, col, literal } from 'sequelize';
import { Site } from '../models/site.model';

export const nearbyRouter = Router();

/** GET /nearby?lng=&lat=&radius=  —— 圆形范围查询 */
nearbyRouter.get('/', async (req: Request, res: Response): Promise<void> => {
  const lng = Number(req.query.lng);
  const lat = Number(req.query.lat);
  const radius = Number(req.query.radius);        // meters

  if ([lng, lat, radius].some(Number.isNaN)) {
    res.status(400).json({
      status: 400,
      code: 1401,
      message: 'Missing or invalid lng/lat/radius',
      help: 'https://api.example.com/docs/errors#1401',
      data: null
    });
    return;
  }

  if (radius <= 0 || radius > 50000) {
    res.status(400).json({
      status: 400,
      code: 1403,
      message: 'Radius must be 0–50000 meters',
      help: 'https://api.example.com/docs/errors#1403',
      data: null
    });
    return;
  }

  try {
    const rows = await Site.findAll({
      attributes: {
        include: [
          // 距离字段（米）
          [literal(`ST_Distance_Sphere(Point(lng, lat), Point(${lng}, ${lat}))`), 'distance']
        ]
      },
      where: literal(`ST_Distance_Sphere(Point(lng, lat), Point(${lng}, ${lat})) <= ${radius}`),
      order: literal('distance ASC')
    });

    if (rows.length === 0) {
      res.status(404).json({
        status: 404,
        code: 1402,
        message: 'No POI found in given circle',
        help: 'https://api.example.com/docs/errors#1402',
        data: null
      });
      return;
    }

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
