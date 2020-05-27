import { Component, OnDestroy, Input } from "@angular/core";

@Component({
  selector: "app-timer",
  template: `<div>TIME: <b>{{counter | date:"mm:ss:SS"}}</b></div>`,
})
export class TimerComponent implements OnDestroy {
  @Input() set start (data: boolean) {
    if (data) {
        this.startTimer();
    } else {
        this.clearTimer();
    }
  }

  timerRef: number;
  counter: number = 0;
  running: boolean = false;
  
  startTimer() {
    this.running = !this.running;
    this.counter = 0;

    if (this.running) {
      const startTime = Date.now() - (this.counter || 0);

      this.timerRef = setInterval(() => {
        this.counter = Date.now() - startTime;
      });
    } else {
      clearInterval(this.timerRef);
    }
  }

  clearTimer() {
    this.running = false;
    
    clearInterval(this.timerRef);
  }

  ngOnDestroy() {
    clearInterval(this.timerRef);
  }
}
