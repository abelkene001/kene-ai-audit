// Registry for all sectors
import { retailSector } from './retail';
import { realEstateSector } from './real-estate';
import { defaultSector } from './default';
import { SectorConfig } from '../types';

export const sectors: Record<string, SectorConfig> = {
    "Retail & E-commerce": retailSector,
    "Real Estate & Development": realEstateSector,
    "Default": defaultSector
};

export const getSectorConfig = (industry: string): SectorConfig => {
    return sectors[industry] || sectors["Default"];
};
