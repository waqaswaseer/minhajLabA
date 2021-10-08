import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Labtest, Testbooking } from './labtest.model';
import { signup } from './registration.model';

@Injectable({
  providedIn: 'root'
})
export class LabservicsService {
  UserData : signup
  LabTestData: Testbooking
  readonly rootUrl = 'http://localhost:7569/';
  constructor(private http: HttpClient) { }
  private subject = new Subject<any>();
  sendClickEvent() {
    this.subject.next(0);
  }
  getClickEvent(): Observable<any> {
    return this.subject.asObservable();
  }

  // ===============================  User Registration for Signup  =================================


  userSignUp() {
    var body = {
      ...this.UserData,
    };
    //console.log(body)
    return this.http.post(this.rootUrl + 'api/signup', body);
  }
  // ===============================  Availible LabTests  =================================

  GetAlllabtest():Observable<Labtest[]> {
    return this.http.get<Labtest[]>(this.rootUrl + 'api/labtest');
  }

  // ===============================  LabTest Booking =================================

  sendClickEvent1() {
    this.subject.next(0);
  }
  getClickEvent1(): Observable<any> {
    return this.subject.asObservable();
  }
  Labtestnooking() {
    var body = {
      ...this.LabTestData,
    };
    console.log(body)
    return this.http.post(this.rootUrl + 'api/booklabtest', body);
  }
}
