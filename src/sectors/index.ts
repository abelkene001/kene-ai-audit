// Registry for all sectors
import { retailSector } from './retail';
import { defaultSector } from './default';
import { SectorConfig } from '../types';

export const sectors: Record<string, SectorConfig> = {
    "Retail & E-commerce": retailSector,
    "Default": defaultSector
};

export const getSectorConfig = (industry: string): SectorConfig => {
    return sectors[industry] || sectors["Default"];
};
