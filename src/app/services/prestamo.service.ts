import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Prestamo } from './../class/prestamo';

@Injectable()
export class PrestamoService {
  url: string = 'http://localhost:3001'
  constructor(
    private http: Http
  ) { }

  findAll(): Promise<Prestamo[]> {
    return this.http
      .get(`${this.url}/api/v1/prestamos`)
      .toPromise()
      .then(res => {
        return res.json() as Prestamo[];
      })
      .catch(this.handleError);
  }
  
  create(data): Promise<Prestamo> {
    return this.http
      .post(`${this.url}/api/v1/prestamos`, data)
      .toPromise()
      .then(res => {
        return res.json() as Prestamo;
      })
      .catch(this.handleError);
  }

  prestamosByUser(id): Promise<Prestamo[]>{
    console.log(`${this.url}/api/v1/prestamos/user/${id}`);
    return this.http
      .get(`${this.url}/api/v1/prestamos/user/${id}`,)
      .toPromise()
      .then(res => {
        console.log(res);
        return res.json() as Prestamo[];
      })
      .catch(this.handleError);;
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
