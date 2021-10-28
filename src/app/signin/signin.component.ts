import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PermissionService } from '../shared/permission.service';
import { signup } from '../shared/registration.model';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  message: string;
  isLoginError: boolean = false;
  userClaims: any;
  loadData:Promise<boolean>
  constructor(private permissionService: PermissionService, private router: Router, public dialogRef: MatDialogRef<SigninComponent>) { }

  ngOnInit() {
    this.permissionService.userloging = '';
    this.permissionService.userid = 0 ;
  }
  onSubmit(userName: any, password: any) {
    let userloging = localStorage.getItem('username');
    this.permissionService.userAuthentication(userName, password).subscribe((data: any) => {
      localStorage.setItem('userToken', data.access_token);
      localStorage.setItem('username', userName);
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
      //localStorage.setItem('userId',this.userId);
      this.router.navigate(['/Booklabtest']);
      this.dialogRef.close();
    },
      (err: HttpErrorResponse) => {
        this.isLoginError = true;
      });
  }
  
  onClick(): void {
    this.dialogRef.close();
  }
}
