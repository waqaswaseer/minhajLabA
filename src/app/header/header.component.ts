import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BookLabTestComponent } from '../book-lab-test/book-lab-test.component';
import { PermissionService } from '../shared/permission.service';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { SigninComponent } from '../signin/signin.component';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userClaims: any;
  isLoggedIn$: Observable<boolean>;
  authService: any;
  message:string;
  username : string;
  isloaded : Promise<boolean>

  constructor(public dialog: MatDialog,public permissionService: PermissionService, private router: Router) { }

  ngOnInit(): void {
    if (this.loginchk == 'username') {
      // console.log("one");
      localStorage.getItem('username');
    }
    else {      
      localStorage.removeItem("username");
    }

  }
  get loginchk(): any {
    return localStorage.getItem('username');
  }
  
  signUpDialogue() {
    this.dialog.open(SignUpComponent);
  }
  signInDialogue() {
    this.dialog.open(SigninComponent);
  }
  bookingDialogue() {
    this.dialog.open(SigninComponent);
  }
  logout(){
    localStorage.removeItem("username");
    this.router.navigate(['/home']);
  }
}
