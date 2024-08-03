import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://localhost:5001/api/users/';

  private email = new BehaviorSubject<string>('');
  sharedVariable$ = this.email.asObservable();


  constructor(private http: HttpClient) { }

  registerUser(user: any): Observable<any> {
    return this.http.post(this.apiUrl+"register", user);
  }

  registerScorer(user: any): Observable<any> {
    return this.http.post(this.apiUrl+"registerScorer", user);
  }

  checkEmail(email: string): Observable<any> {
    return this.http.get(`${this.apiUrl}checkEmail?email=${email}`);
  }

  checkEmailPassword(user: any): Observable<any> {  
    return this.http.post<boolean>(this.apiUrl+"checkEmailPassword", user);
  }

  getScoreboard(): Observable<any> {
    return this.http.get(this.apiUrl+"GetScoreboard");
  }
  setEmail(value: any): void {
    this.email.next(value);
  }
  saveScore(email:string,value:number): Observable<any> {
    const data={Email : email, Score : value};
    return this.http.post(this.apiUrl+"saveScore",data);
  }
  getScoreboardByEmail(email: string): Observable<any> {
    return this.http.get(`${this.apiUrl}scoreboardData?email=${email}`);
  }

  getEmail(): Observable<any> {
    return this.http.get(`${this.apiUrl}email`);
  }
 

}  
