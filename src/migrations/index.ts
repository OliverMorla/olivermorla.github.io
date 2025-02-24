import * as migration_20250223_191731_portfolio from "./20250223_191731_portfolio";

export const migrations = [
  {
    up: migration_20250223_191731_portfolio.up,
    down: migration_20250223_191731_portfolio.down,
    name: "20250223_191731_portfolio",
  },
];
