import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Game } from './../class/game';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class GamesService {
  url = 'http://localhost:3001/api/v1';
  constructor(private http: Http) { }

  findAll(): Promise<Game[]> {
    return this.http
      .get(`${this.url}/games`)
      .toPromise()
      .then(res => {
        return res.json() as Game[];
      })
      .catch(this.handleError);
  }
  findById(id: string): Promise<Game> {
    return this.http.get(`${this.url}/games/${id}`)
      .toPromise()
      .then(res => {
        return res.json() as Game;
      })
      .catch(this.handleError);
  }

  create(data: FormData): Promise<Game> {
    return this.http
      .post(`${this.url}/games`, data)
      .toPromise()
      .then(res => {
        return res.json().data as Game;
      })
      .catch(this.handleError);
  }

  delete(id: string) {
    return this.http
      .delete(`${this.url}/games/${id}`)
      .toPromise().then(() => {

      }).catch(this.handleError);
  }

  update(id, data: FormData): Promise<Game> {
    return this.http
      .put(`${this.url}/games/${id}`, data)
      .toPromise()
      .then((game) => {
        return game.json() as Game;
      }).catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}