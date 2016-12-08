import { Copia } from './../class/copia';
import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';

@Injectable()
export class CopySearchService {

  constructor(private http: Http) {}

  search(term: string): Observable<Copia[]> {
    return this.http
               .get('http://localhost:3001/api/v1/copias/search/'+term)
               .map((r: Response) => r.json() as Copia[]);
  }
}