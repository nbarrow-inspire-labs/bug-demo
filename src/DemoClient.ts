const {IntervalTimer} = require("./IntervalTimer");
export class DemoClient {
  constructor() {
    console.log("[DemoClient] created");

    IntervalTimer.schedule(this, () => {
      console.log("[DemoClient] is alive");
    }, 2000, {
      debug: true
    });
  }
}