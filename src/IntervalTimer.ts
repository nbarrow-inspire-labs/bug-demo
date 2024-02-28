class IntervalTimer {

  private readonly id: string;
  private readonly _debug: boolean;
  private readonly ref: WeakRef<Object>;
  private readonly timer: NodeJS.Timeout;
  private count: number = 0;

  /**
   * Creates a new IntervalTimer. Should never be instantiated directly,
   * as saving any reference to this would cause the de-referencing and
   * destructing effects to fail.
   * @param obj {Object} the object to watch for destructing
   * @param callback {() => void} the function to call on every interval
   * @param ms {number} the number of seconds between intervals
   * @param opts
   * @private no reference should ever be saved
   */
  private constructor(obj: Object, callback: () => void, ms?: number, opts?: {
    debug: boolean;
  }) {
    this._debug = !!opts?.debug;
    this.id = this.makeID();
    this.ref = new WeakRef(obj);
    this.timer = setInterval(() => this.tick(callback), ms);
  }

  /**
   * Safely schedule `callback` at a fixed interval, cancelling when `obj`
   * is de-referenced and ready for garbage collection
   * @param obj {Object} the object to watch for destructing
   * @param callback {() => void} the function to call on every interval
   * @param ms {number} the number of seconds between intervals
   * @param opts
   */
  public static schedule = (obj: Object, callback: () => void, ms?: number, opts?: {
    debug: boolean;
  }): void => {
    new IntervalTimer(obj, callback, ms, opts);
  };

  private tick = (callback: () => void): void => {

    this.count++;
    this.debug(`running interval ${this.count}`);

    // execute the callback if not cancelled and still referenced
    if (this.ref.deref() !== undefined) {
      this.debug("executing callback");
      callback();
    } else {
      this.debug("no reference detected (clearing interval timer)");
      clearInterval(this.timer);
    }
  };

  private debug = (msg: string) => {
    if(this._debug) console.log(`[IntervalTimer@${this.id}] ${msg}`);
  };

  private makeID = (): string => ("xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
      let r = Math.random() * 16 | 0, v = c == "x" ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    })
  );
}