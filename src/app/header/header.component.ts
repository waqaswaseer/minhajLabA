import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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

  constructor(public dialog: MatDialog,public permissionService: PermissionService) { }

  ngOnInit(): void {
    if (this.loginchk == '') {
      // console.log("one");
      localStorage.removeItem("usercode");
    }
    else {
      //this.permissionService.GetMenuData(this.logusercode, "P");

    }

  }
  get loginchk(): any {
    return localStorage.getItem('username');
  }
  get logusercode(): any {
    return localStorage.getItem('usercode');
  }


  signUpDialogue() {
    this.dialog.open(SignUpComponent);
  }
  signInDialogue() {
    this.dialog.open(SigninComponent);
  }
  bookingDialogue() {
    alert('please log in to book your test');
    this.dialog.open(SigninComponent);
  }
}
