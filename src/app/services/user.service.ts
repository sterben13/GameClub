import { User } from './../class/user';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class UserService {
  private url: string = 'http://localhost:3001/api/v1';

  constructor(private http: Http) {

  }

  create(data: FormData): Promise<User> {
    return this.http
      .post(`${this.url}/users`, data)
      .toPromise()
      .then(res => {
        console.log(res);
        return res.json() as User;
      })
      .catch(this.handleError);
  }

  findall(): Promise<User[]> {
    return this.http
      .get(`${this.url}/users`)
      .toPromise()
      .then(res => {
        return res.json() as User[];
      })
      .catch(this.handleError);
  }

  delete(id: string) {
    return this.http
      .delete(`${this.url}/users/${id}`)
      .toPromise().then(() => {

      }).catch(this.handleError);
  }

  findById(id: string): Promise<User> {
    return this.http
      .get(`${this.url}/users/${id}`)
      .toPromise()
      .then(res => {
        return res.json() as User;
      })
      .catch(this.handleError);
  }

  update(id, data: FormData): Promise<User> {
    return this.http
      .put(`${this.url}/users/${id}`, data)
      .toPromise()
      .then((user) => {
        return user.json() as User;
      }).catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}