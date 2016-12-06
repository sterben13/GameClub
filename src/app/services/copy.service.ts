import { Copia } from './../class/copia';
import { Headers, Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class CopyService {
  private url: string = 'http://localhost:3001/api/v1';

  constructor(
    private http: Http
  ) { }

  create(data): Promise<Copia> {
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });
    return this.http
      .post(`${this.url}/copias`, data, headers)
      .toPromise()
      .then(res => {
        console.log(res);
        return res.json() as Copia;
      })
      .catch(this.handleError);
  }

  all(id:string): Promise<Copia[]> {
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });
    return this.http
    .get(`${this.url}/copias/all/${id}`)
    .toPromise()
    .then((res)=>{
      return res.json() as Copia[];
    }).catch(this.handleError);
  }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
