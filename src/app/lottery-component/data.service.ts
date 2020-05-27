import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserStatus } from './data-types';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private usersCopy = [];

  constructor(private http: HttpClient) { }

  public getUsers () {
    return this.http.get('https://jsonplaceholder.typicode.com/users');
  }

  public calculateUsers (users, wonPercentage) {
    this.usersCopy = JSON.parse(JSON.stringify(users))

    let count = Math.round(wonPercentage * this.usersCopy.length / 100);

    for (let i = 0; i < count; i++) {
      const user = this.usersCopy[Math.floor(Math.random() * this.usersCopy.length)];

      if (user.status === UserStatus.Default) {
        user.status = UserStatus.Won;
      } else {
        count++;
      }
    }

    for (let user of this.usersCopy) {
      if (user.status === UserStatus.Default) {
        user.status = UserStatus.Loss
      }
    }
  }

  public getCalculatedUsers() {
    return this.usersCopy;
  }
}
