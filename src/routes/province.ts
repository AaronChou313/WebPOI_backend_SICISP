import { Router, Request, Response } from 'express';
import { literal } from 'sequelize';
import { Site } from '../models/site.model';

export const provinceRouter = Router();

/* ───────── 1. /province/:name/with-photos ───────── */
provinceRouter.get(
  '/:name/with-photos',
  async (req: Request, res: Response): Promise<void> => {
    const name = req.params.name.trim();
    const rows = await Site.findAll({
      where: literal(`province = '${name}' AND JSON_LENGTH(photo_urls) > 0`),
      order: [['level', 'DESC'], ['name', 'ASC']]
    });

    if (rows.length === 0) {
      res.status(404).json({
        status: 404,
        code: 1402,
        message: 'No POI found with photos',
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
  }
);

/* ───────── 2. /province/:name/no-photos ───────── */
provinceRouter.get(
  '/:name/no-photos',
  async (req: Request, res: Response): Promise<void> => {
    const name = req.params.name.trim();
    const rows = await Site.findAll({
      where: literal(`province = '${name}' AND JSON_LENGTH(photo_urls) = 0`),
      order: [['name', 'ASC']]
    });

    if (rows.length === 0) {
      res.status(404).json({
        status: 404,
        code: 1402,
        message: 'No POI without photos',
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
  }
);

/* ───────── 3. 原 /province/:name ───────── */
provinceRouter.get(
  '/:name',
  async (req: Request, res: Response): Promise<void> => {
    const name = req.params.name.trim();
    const rows = await Site.findAll({
      where: { province: name },
      order: [['level', 'DESC'], ['name', 'ASC']]
    });

    if (rows.length === 0) {
      res.status(404).json({
        status: 404,
        code: 1402,
        message: 'Province not found',
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
  }
);
