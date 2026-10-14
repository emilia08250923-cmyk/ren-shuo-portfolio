import chuanYue from './chuan-yue-assets.json';
import heart from './heart-assets.json';
import hunYin from './hun-yin-assets.json';
import niuTou from './niu-tou-assets.json';
import ootd from './ootd-assets.json';
import tvc1 from './tvc-1-assets.json';
import tvc2 from './tvc-2-assets.json';
import tvc3 from './tvc-3-assets.json';
import tvc4 from './tvc-4-assets.json';
import xiangFeng from './xiang-feng-assets.json';
import yiCheng from './yi-cheng-jue-xing-assets.json';
import yueJie from './yue-jie-assets.json';
import yun from './yun-shang-xian-tu-assets.json';
import zhenRen from './zhen-ren-ge-dou-assets.json';
import type { ProjectImage } from './projects';
export const videoAssets: Record<string, {images: ProjectImage[]; script: string[]}> = {
  'chuan-yue-fan-pai': chuanYue, heart, 'hun-yin-bei-pan': hunYin,
  'niu-tou-ren': niuTou, ootd, 'tvc-1': tvc1, 'tvc-2': tvc2, 'tvc-3': tvc3, 'tvc-4': tvc4,
  'xiang-feng': xiangFeng, 'yi-cheng-jue-xing': yiCheng, 'yue-jie-guan-xi': yueJie,
  'yun-shang-xian-tu': yun, 'zhen-ren-ge-dou': zhenRen,
};
