import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {
  userloging : string ='';
  userid : number = 0;
  readonly rootUrl = 'http://localhost:7569/';
  constructor(private http: HttpClient) { }

  userAuthentication(userName:any, password:any) {
    var data = "username=" + userName + "&password=" + password + "&grant_type=password";
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded','No-Auth':'True' });
    return this.http.post(this.rootUrl + 'token', data, { headers: reqHeader });
  }
  getUserClaims(){
    return this.http.get(this.rootUrl+'api/GetUserClaims',{headers : new HttpHeaders(
      {'Authorization' : 'Bearer ' + localStorage.getItem('userToken')})});
   }
  
  getuserid(username: string | null){
    return this.http.get(this.rootUrl + 'api/getUid/'+ username)
  }
}
