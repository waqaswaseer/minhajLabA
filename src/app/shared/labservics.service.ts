import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {  Labtest, Orderdetails } from './labtest.model';
import { signup } from './registration.model';

@Injectable({
  providedIn: 'root'
})
export class LabservicsService {
  UserData : signup
  Orderdetails : Orderdetails

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
    return this.http.post(this.rootUrl + 'api/signup', body);
  }
  // ===============================  Availible LabTests  =================================

  GetAlllabtest():Observable<Labtest[]> {
    return this.http.get<Labtest[]>(this.rootUrl + 'api/labtest');
  }

   // ===============================  Order Details booked  =================================

   GetOrderdetails(username:string|null):Observable<Orderdetails[]> {
    return this.http.get<Orderdetails[]>(this.rootUrl + 'api/booktests'+"/"+username);
  }

  
   // ===============================  add to bucket  =================================

   addtobucket() {
    return this.http.post(this.rootUrl + 'api/addbucket/', this.Orderdetails);
  }

  // =============================== ending add to bucket =================================
  // ===============================  LabTest Booking =================================
  sendClickEvent1() {
    this.subject.next(0);
  }
  getClickEvent1(): Observable<any> {
    return this.subject.asObservable();
  }
  Orderdetailsfn() {
    var body = {
      ...this.Orderdetails,
    };
    console.log(body)
    return this.http.post(this.rootUrl + 'api/orderdetails', body);
  }
}
