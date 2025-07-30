export class Logger {
  constructor() {}

  public info(message: string) {
    console.log(`[INFO] ${message}`);
  }

  public error(message: string) {
    console.log(`[ERROR] ${message}`);
  }

  public warn(message: string) {
    console.log(`[WARN] ${message}`);
  }
}
