import { EnvironmentTypes } from './constants.types';

export const MENU_TYPE = {
  SIDEBAR: 'SIDEBAR',
  CONTENT: 'CONTENT',
} as const;

export const ENV_KEYS: EnvironmentTypes = {
  BASE_API_URL: process.env.NEXT_PUBLIC_API_URL || '',
};

