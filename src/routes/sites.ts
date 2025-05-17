/*
 * @Author: M1tsuha
 * @Date: 2025-05-16 14:08:14
 * @LastEditors: M1tsuha
 * @LastEditTime: 2025-05-17 21:00:43
 * @FilePath: \SICISP_WebPOI\backend\src\routes\sites.ts
 * @Description: 
 * 
 * Copyright (c) 2025 by ${git_name_email}, All Rights Reserved. 
 */
import { Router, Request, Response } from 'express';
import { literal } from 'sequelize';
import { Site } from '../models/site.model';

export const sitesRouter = Router();

/* ───────── 1. /sites/with-photos 先注册，避免被 :id 吞掉 ───────── */
sitesRouter.get('/with-photos', async (_req: Request, res: Response): Promise<void> => {
  try {
    const rows = await Site.findAll({
      where: literal('JSON_LENGTH(photo_urls) > 0'),
      order: [['photo_count', 'DESC'], ['name', 'ASC']]
    });

    if (rows.length === 0) {
      res.status(404).json({
        status: 404,
        code: 1402,
        message: 'No POI contains photos',
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

/* ─────────  /sites/no-photos  ───────── */
sitesRouter.get('/no-photos', async (_req: Request, res: Response): Promise<void> => {
  try {
    const rows = await Site.findAll({
      where: literal('JSON_LENGTH(photo_urls) = 0'),
      order: [['name', 'ASC']]
    });

    if (rows.length === 0) {
      res.status(404).json({
        status: 404,
        code: 1402,
        message: 'All POIs contain photos',
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


/* ───────── 2. /sites/:id  单条详情 ───────── */
sitesRouter.get('/:id', async (req: Request, res: Response): Promise<void> => {
  const id = Number(req.params.id);
  if (Number.isNaN(id)) {
    res.status(400).json({
      status: 400,
      code: 1401,
      message: 'Invalid id',
      help: 'https://api.example.com/docs/errors#1401',
      data: null
    });
    return;
  }

  const site = await Site.findByPk(id);
  if (!site) {
    res.status(404).json({
      status: 404,
      code: 1402,
      message: 'Site not found',
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
    data: site.get({ plain: true })
  });
});

