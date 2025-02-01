import * as migration_20250201_231840 from './20250201_231840';

export const migrations = [
  {
    up: migration_20250201_231840.up,
    down: migration_20250201_231840.down,
    name: '20250201_231840'
  },
];
