import { Router, Request, Response } from 'express';
import { Op } from 'sequelize';
import { Site } from '../models/site.model';

export const bboxRouter = Router();

/** GET /bbox?lng1=..&lat1=..&lng2=..&lat2=.. */
bboxRouter.get('/', async (req: Request, res: Response): Promise<void> => {
  const { lng1, lat1, lng2, lat2 } = req.query;

  // 参数校验
  const nums = [lng1, lat1, lng2, lat2].map(Number);
  if (nums.some(n => Number.isNaN(n))) {
    res.status(400).json({
      status: 400,
      code: 1401,
      message: 'Missing or invalid lng/lat parameters',
      help: 'https://api.example.com/docs/errors#1401',
      data: null
    });
    return;
  }

  // 归一化 min/max
  const [minLng, maxLng] = [Math.min(nums[0], nums[2]), Math.max(nums[0], nums[2])];
  const [minLat, maxLat] = [Math.min(nums[1], nums[3]), Math.max(nums[1], nums[3])];

  try {
    const rows = await Site.findAll({
      where: {
        lng: { [Op.between]: [minLng, maxLng] },
        lat: { [Op.between]: [minLat, maxLat] }
      },
      order: [['level', 'DESC'], ['name', 'ASC']]
    });

    if (rows.length === 0) {
      res.status(404).json({
        status: 404,
        code: 1402,
        message: 'No POI found in given bbox',
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
