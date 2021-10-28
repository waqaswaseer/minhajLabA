import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable, Subject } from 'rxjs';
import { LabservicsService } from '../shared/labservics.service';
import { NotificationService } from '../shared/notification.service';
import { map, startWith } from 'rxjs/operators';
import { Labtest, Orderdetails } from '../shared/labtest.model';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { PermissionService } from '../shared/permission.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-lab-test',
  templateUrl: './book-lab-test.component.html',
  styleUrls: ['./book-lab-test.component.css']

})
export class BookLabTestComponent implements OnInit {
  allTest: Labtest[]
  orderdetails: Orderdetails[]
  userId:any;
  // ============================= working  on form as global variables ================================
  Orderdetails: FormGroup;
  testcode= new FormControl();
  Test= new FormControl('');
  rate= new FormControl();
  filteredOptions: Observable<Labtest[]>;
  userClaims: any;
  displayFn(subject: any): string {
    return subject ? subject.testname : ''
  }
  constructor(public gservice: LabservicsService,
     private notificationService: NotificationService, 
    private permissionService: PermissionService,
    private router: Router) { }

  //======================== Labtest Object in array======================// 
  //myBucket: FormGroup;
  //======================== pushing Object in array End here ======================// 
  ngOnInit(): void {
    this.getPendingOrders()
    this.createForm();
  }
  getPendingOrders(){
    this.gservice.GetOrderdetails(this.username).subscribe((data: any) => {
      this.orderdetails = data;
    });
  }

  // getuserID(){
  //   return localStorage.getItem('userId')
  // }
  createForm(){
    this.resetPage()
    this.gservice.GetAlllabtest().subscribe((res: any) => {
      this.allTest = res;
      this.filteredOptions = this.Test.valueChanges.pipe(startWith(''), map(value => this.filter(value)));
    });
  }
  private filter(inputStr: string): Labtest[] {
    return this.allTest.filter(option => option.testname.toLowerCase().includes(inputStr))
  }
  testselecion(event: MatAutocompleteSelectedEvent) {
    const selectedValue = event.option.value;
    this.Orderdetails.controls["testname"].setValue(selectedValue.testname);
    this.Orderdetails.controls["rate"].setValue(selectedValue.rate);
    this.Orderdetails.controls["testcode"].setValue(selectedValue.testcode);
  }
  
  addtoBucket(Orderdetails: FormGroup) {
    if (this.Orderdetails.valid) {
      this.gservice.Orderdetails = this.Orderdetails.getRawValue()
      console.log(this.gservice.Orderdetails)
      this.gservice.addtobucket().subscribe(Response => {
        if (Response != 0) {
         this.getPendingOrders()
          this.notificationService.success(':: Your order is placed successfully');
        }
        else {
          this.notificationService.warn(':: Invalid Data');
        }
      })
    }
    this.resetPage()
  }
  resetPage(){
    this.Orderdetails = new FormGroup({
      username: new FormControl(this.username),
      userID: new FormControl(this.userId),
      orderstatus : new FormControl('a'),
      testcode: new FormControl(),
      testname:  new FormControl(''),
      rate: new FormControl(0),      
      status: new FormControl('p', Validators.required),      
      //address: new FormControl(''),
    });
  }
  getUserId(username:string){
    this.permissionService.getuserid(username).subscribe(res =>{
      this.userId = res;
    });
    console.log(this.userId);
  }
  get username() {
    return localStorage.getItem('username')
  }
}
