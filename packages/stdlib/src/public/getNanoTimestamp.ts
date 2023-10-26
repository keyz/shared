import * as process from "process";

export function getNanoTimestamp(): string {
  return String(process.hrtime.bigint());
}
