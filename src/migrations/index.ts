import * as migration_20250201_231840 from './20250201_231840';
import * as migration_20250202_222156 from './20250202_222156';

export const migrations = [
  {
    up: migration_20250201_231840.up,
    down: migration_20250201_231840.down,
    name: '20250201_231840',
  },
  {
    up: migration_20250202_222156.up,
    down: migration_20250202_222156.down,
    name: '20250202_222156'
  },
];
