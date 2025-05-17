import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db';

export interface SiteAttributes {
  site_id: number;
  name: string;
  province: string | null;
  level: string | null;
  lng: number | null;
  lat: number | null;
  photo_urls: any[];          // JSON column
  photo_count: number;        // generated column
  address?: string | null;
  detail?: string | null;
}

export class Site extends Model<SiteAttributes> {}

Site.init(
  {
    site_id: { type: DataTypes.INTEGER, primaryKey: true },
    name:     { type: DataTypes.STRING },
    province: { type: DataTypes.STRING },
    level:    { type: DataTypes.STRING },
    lng:      { type: DataTypes.DECIMAL(10, 6) },
    lat:      { type: DataTypes.DECIMAL(10, 6) },
    photo_urls: { type: DataTypes.JSON },
    photo_count:{ type: DataTypes.VIRTUAL, get() { return this.getDataValue('photo_urls')?.length ?? 0; }},
    address:  { type: DataTypes.STRING },
    detail:   { type: DataTypes.STRING },
  },
  { sequelize, tableName: 'scenic_site_json', timestamps: false }
);
