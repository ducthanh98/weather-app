import { Injectable } from '@angular/core';
import { ApiService } from '../utils/services/api.service';
import { Subject, of } from 'rxjs';
import { takeUntil, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  subject$ = new Subject();


  constructor(private api: ApiService) { }

  login({ username , password }) {
    return this.api.post('auth/login', { username, password })
      .pipe(
        takeUntil(this.subject$),
        catchError(error => of({ error }))
      )
  }

  register({ username, password }) {
    return this.api.post('auth/register', { username, password })
      .pipe(
        takeUntil(this.subject$),
        catchError(error => of({ error }))
      )
  }

  unsubcribe() {
    this.subject$.next();
  }
}
