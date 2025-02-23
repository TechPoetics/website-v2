import * as migration_20250201_231840 from './20250201_231840';
import * as migration_20250202_222156 from './20250202_222156';
import * as migration_20250214_054839 from './20250214_054839';
import * as migration_20250223_160316 from './20250223_160316';

export const migrations = [
  {
    up: migration_20250201_231840.up,
    down: migration_20250201_231840.down,
    name: '20250201_231840',
  },
  {
    up: migration_20250202_222156.up,
    down: migration_20250202_222156.down,
    name: '20250202_222156',
  },
  {
    up: migration_20250214_054839.up,
    down: migration_20250214_054839.down,
    name: '20250214_054839',
  },
  {
    up: migration_20250223_160316.up,
    down: migration_20250223_160316.down,
    name: '20250223_160316'
  },
];
