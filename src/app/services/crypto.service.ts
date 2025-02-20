import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CryptoService {

  constructor(private httpClient: HttpClient) { }

  getAmmount(currency: string) : Observable<any> {
    return this.httpClient.get<any>(`https://api.frontendeval.com/fake/crypto/${currency}`);
  }
}
