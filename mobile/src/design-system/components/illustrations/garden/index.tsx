import { memo } from 'react';
import { Seedling } from './Seedling';
import { Leaf } from './Leaf';
import { Sun } from './Sun';
import { Cloud } from './Cloud';
import { Moon } from './Moon';
import { Petal } from './Petal';
import { Stone } from './Stone';
import { Drop } from './Drop';
import { Spark } from './Spark';
import { Crescent } from './Crescent';
import { Fern } from './Fern';
import { Acorn } from './Acorn';

export { Seedling } from './Seedling';
export { Leaf } from './Leaf';
export { Sun } from './Sun';
export { Cloud } from './Cloud';
export { Moon } from './Moon';
export { Petal } from './Petal';
export { Stone } from './Stone';
export { Drop } from './Drop';
export { Spark } from './Spark';
export { Crescent } from './Crescent';
export { Fern } from './Fern';
export { Acorn } from './Acorn';
export { getGardenCellTint } from './tint';

export type GardenIllustrationName =
  | 'seedling'
  | 'leaf'
  | 'sun'
  | 'cloud'
  | 'moon'
  | 'petal'
  | 'stone'
  | 'drop'
  | 'spark'
  | 'crescent'
  | 'fern'
  | 'acorn';

type GardenIllustrationProps = {
  name: GardenIllustrationName;
  size?: number;
};

function GardenIllustrationImpl({ name, size = 60 }: GardenIllustrationProps) {
  switch (name) {
    case 'seedling':
      return <Seedling size={size} />;
    case 'leaf':
      return <Leaf size={size} />;
    case 'sun':
      return <Sun size={size} />;
    case 'cloud':
      return <Cloud size={size} />;
    case 'moon':
      return <Moon size={size} />;
    case 'petal':
      return <Petal size={size} />;
    case 'stone':
      return <Stone size={size} />;
    case 'drop':
      return <Drop size={size} />;
    case 'spark':
      return <Spark size={size} />;
    case 'crescent':
      return <Crescent size={size} />;
    case 'fern':
      return <Fern size={size} />;
    case 'acorn':
      return <Acorn size={size} />;
  }
}

export const GardenIllustration = memo(GardenIllustrationImpl);
