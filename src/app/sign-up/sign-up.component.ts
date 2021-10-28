import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { LabservicsService } from '../shared/labservics.service';
import { NotificationService } from '../shared/notification.service';
;

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  SIGNUPDETAIL : FormGroup;
  constructor(public gservice:LabservicsService,private notificationService: NotificationService,public dialogRef: MatDialogRef<SignUpComponent>
    ) { }
  ngOnInit(): void {
    this.resetForm()
  }
  onSubmit(SIGNUPDETAIL: FormGroup) {
    if (this.SIGNUPDETAIL.valid) {
      this.gservice.UserData = this.SIGNUPDETAIL.getRawValue()
      console.log(this.gservice.UserData)
      this.gservice.userSignUp().subscribe(Response => {

        if (Response != 0) {
          this.notificationService.success(':: Registered successfully');
        }
        else {
          this.notificationService.warn(':: Invalid Data');
        }
      })
      this.resetForm();
      this.dialogRef.close();
    }
  }
  onClick(): void {
    this.dialogRef.close();
  }
  resetForm(){
    this.SIGNUPDETAIL = new FormGroup({
      name: new FormControl(''),
      age: new FormControl(''),
      gender: new FormControl(''),
      phoneNo: new FormControl(''),
      emailAdd: new FormControl(''),
      password: new FormControl(''),
    })
  }
}

