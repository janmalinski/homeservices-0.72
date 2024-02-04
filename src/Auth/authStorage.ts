import { buildSecureStorage } from '@src/utils/Storage';

export const accessTokenStorage = buildSecureStorage('ACCESS_TOKEN');
export const refreshTokenStorage = buildSecureStorage('REFRESH_TOKEN');
export const accessTokenExpiresAtStorage = buildSecureStorage('ACCESS_TOKEN_EXPIRES_AT');
