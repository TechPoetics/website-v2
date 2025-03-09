import * as migration_20250201_231840 from './20250201_231840';
import * as migration_20250202_222156 from './20250202_222156';
import * as migration_20250214_054839 from './20250214_054839';
import * as migration_20250223_160316 from './20250223_160316';
import * as migration_20250226_002124 from './20250226_002124';
import * as migration_20250226_003240 from './20250226_003240';
import * as migration_20250309_052935 from './20250309_052935';

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
    name: '20250223_160316',
  },
  {
    up: migration_20250226_002124.up,
    down: migration_20250226_002124.down,
    name: '20250226_002124',
  },
  {
    up: migration_20250226_003240.up,
    down: migration_20250226_003240.down,
    name: '20250226_003240',
  },
  {
    up: migration_20250309_052935.up,
    down: migration_20250309_052935.down,
    name: '20250309_052935'
  },
];
