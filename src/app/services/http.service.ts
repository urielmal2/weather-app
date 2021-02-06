import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class HttpService {

  constructor(private httpClient: HttpClient) {}

  get<T>(url: string, queryParams: any): Observable<any> {

    return this.httpClient.get(url, this.createRequestOptions(queryParams))
      .pipe(catchError(this.handleError));
  }

  private createRequestOptions(queryParams): { headers: any; params: any; } {
    const  headers = new HttpHeaders().set(
      'Access-Control-Allow-Origin',
      'application/json',
    );
    let params = new HttpParams(queryParams);
    Object.keys(queryParams).map(key => params = params.set(key, queryParams[key]));
    return {headers, params};
  }


  private handleError(error: any): any {
    return throwError(error);
  }
}


