import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseURL = 'http://localhost:3000/api';
  constructor(private http: HttpClient) { }

  get(url) {
    return this.http.get(`${this.baseURL}/${url}`);
  }
  post(url,body) {
    return this.http.post(`${this.baseURL}/${url}`,body);
  }
  put(url,body) {
    return this.http.put(`${this.baseURL}/${url}`,body);
  }
  delete(url) {
    return this.http.delete(`${this.baseURL}/${url}`);
  }
}
