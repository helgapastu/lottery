import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { Status } from './data-types';
import { UserStatus } from './data-types';

@Component({
  selector: 'app-lottery',
  templateUrl: './lottery.component.html',
  styleUrls: ['./lottery.component.scss']
})
export class LotteryComponent implements OnInit {
  public users = [];
  public selectedStatus: Status;
  public fillingTime: number = 2000;
  public runningTime: number = 2000;
  public usersCount: number = 10;
  public wonPercentage: number = 20;
  public startTimer: boolean = false;

  private usersDataSource = [];
  private timerRef: ReturnType<typeof setInterval>;

  constructor(private service: DataService) { }

  ngOnInit(): void {
    this.service.getUsers().subscribe((users: any) => {
      this.usersDataSource = users;
    });
  }

  public start(): void {
    if (this.usersCount === 0 || this.timerRef) {
      return;
    }

    this.toggleTimer();
    this.fillContainer();
    this.runCalculation();
    this.finish();
  }

  private fillContainer(): void {
    this.users = [];
    this.selectedStatus = Status.Filling;

    if (this.fillingTime > 0) {
      let index = 0;
      const time = this.fillingTime / this.usersCount;

      this.timerRef = setInterval(() => {
        if (index < this.usersCount) {
          this.users.push({ ...this.usersDataSource[index], status: UserStatus.Default });

          index++;
        }
      }, time);
    } else {
      for (let i = 0; i < this.usersCount; i++) {
        this.users.push({ ...this.usersDataSource[i], status: UserStatus.Default });
      }
    }
  }

  private runCalculation(): void {
    setTimeout(() => {
      clearInterval(this.timerRef);
      this.selectedStatus = Status.Running;

      this.service.calculateUsers(this.users, this.wonPercentage);
    }, this.fillingTime);
  }

  private finish(): void {
    setTimeout(() => {
      this.selectedStatus = Status.Finish;
      this.timerRef = null;

      this.users = this.service.getCalculatedUsers();
      this.toggleTimer();
    }, this.fillingTime + this.runningTime + 10);
  }

  private toggleTimer(): void {
    this.startTimer = !this.startTimer;
  }
}

