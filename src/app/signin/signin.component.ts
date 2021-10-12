import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { PermissionService } from '../shared/permission.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  message: string;
  isLoginError: boolean = false;
  userClaims: any;
  
  constructor(private permissionService: PermissionService, private router: Router,public dialogRef: MatDialogRef<SigninComponent> ) { }

  ngOnInit() {
    this.permissionService.userloging = '';
    // sessionStorage.setItem('susername', '');
    // let userloging = sessionStorage.getItem('susername');
    // console.log(userloging);
    // console.log('anaya');
    // localStorage.clear();
    // localStorage.removeItem('username');
    // sessionStorage.clear();
  }
  onSubmit(userName:any, password:any) {
    let userloging = localStorage.getItem('username');
    this.permissionService.userAuthentication(userName, password).subscribe((data: any) => {
      localStorage.setItem('userToken', data.access_token);
      localStorage.setItem('username',userName)
      this.permissionService.getUserClaims().subscribe((data: any) => {
        this.userClaims = data;
        this.permissionService.userloging = this.userClaims.name;
        console.log(this.permissionService.userloging);
        localStorage.setItem('name', this.userClaims.name)
        localStorage.setItem('age', this.userClaims.age);
        localStorage.setItem('gender', this.userClaims.gender)
        localStorage.setItem('phoneNo', this.userClaims.phoneNo)
        localStorage.setItem('emailAdd', this.userClaims.emailAdd)
        
        // this.permissionService.GetSubMenuData(this.userClaims.usercode, "p");
      });
      //this.permissionService.changeMessage(this.userClaims.usercode);
      //  this.permissionService.GetMenuData(this.userClaims.usercode,"L");
      //  this.permissionService.GetSubMenuData(this.userClaims.usercode,"L");
      this.router.navigate(['/Booklabtest']);
      alert("log in successfully")
      this.dialogRef.close();
      //this.toastr.success(data.access_token);
    },
      (err: HttpErrorResponse) => {
        this.isLoginError = true;
      });
  }
  //onSubmitPN(patientNo:any,OnlineCode:any){

  //}
onClick(): void {
  this.dialogRef.close();
}
}
