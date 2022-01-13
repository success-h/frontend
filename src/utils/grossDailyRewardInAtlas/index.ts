import { ATLAS_DECIMAL } from './../../common/constants/index';
export const grossDailyRewardInAtlas = (rewardRatePerSecond: number) => {
  return (
    Math.round((rewardRatePerSecond / ATLAS_DECIMAL) * 60 * 60 * 24 * ATLAS_DECIMAL) /
    ATLAS_DECIMAL
  );
};