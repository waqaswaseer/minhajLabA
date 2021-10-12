import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable, Subject } from 'rxjs';
import { LabservicsService } from '../shared/labservics.service';
import { NotificationService } from '../shared/notification.service';
import { map, startWith } from 'rxjs/operators';
import { Labtest, Testbooking } from '../shared/labtest.model';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { PermissionService } from '../shared/permission.service';

@Component({
  selector: 'app-book-lab-test',
  templateUrl: './book-lab-test.component.html',
  styleUrls: ['./book-lab-test.component.css']

})
export class BookLabTestComponent implements OnInit {
  allTest: Labtest[]
  filteredOptions: Observable<Labtest[]>;
  list: any;
  userClaims: any;
  constructor(public gservice: LabservicsService, private notificationService: NotificationService, private permissionService: PermissionService,) { }

  // ============================= working  on form as global variables ================================
  BookLabTest: FormGroup;
  name: string;
  age: number;
  phone: string;
  Prescription: ImageData;
  address: string;
  test = new FormControl('');

  //======================== Labtest Object in array======================// 

  //======================== pushing Object in array End here ======================// 
  ngOnInit(): void {
    this.BookLabTest = new FormGroup({
      name: new FormControl(this.username),
      age: new FormControl(''),
      phoneNo: new FormControl(''),
      Prescription: new FormControl(''),
      Test: new FormControl(''),
      address: new FormControl('')
    })
    console.log(this.username)
    this.gservice.GetAlllabtest().subscribe((res: any) => {
      this.allTest = res;
      this.filteredOptions = this.test.valueChanges.pipe(startWith(''), map(value => this.filter(value)))
    })
    this.permissionService.getUserClaims().subscribe((data: any) => {
      this.userClaims = data;
      //this.user = this.userClaims.name;
      // console.log(this.permissionService.userloging);
    })

  }

  private filter(inputStr: string): Labtest[] {
    return this.allTest.filter(option => option.testname.toLowerCase().includes(inputStr))
  }
  testselecion(event: MatAutocompleteSelectedEvent) {
    const selectedValue = event.option.value;
    this.BookLabTest.controls["Test"].setValue(selectedValue.testname);
  }

  resetpage() {

  }
  displayFn(subject: any): string {
    return subject ? subject.testname : ''
  }
  onSubmit(BookLabTest: FormGroup) {
    if (this.BookLabTest.valid) {
      this.gservice.LabTestData = this.BookLabTest.getRawValue()
      console.log(this.gservice.LabTestData)

      //============================ pushing Object in array ============================// 
      // this.gservice.LabTestData.push(this.BookLabTest.getRawValue())
      // this.gservice.LabTestData.push(this.BookLabTest.getRawValue())
      // console.log(this.gservice.LabTestData)
      //======================== pushing Object in array End here ======================// 

      this.gservice.LabtestBooking().subscribe(Response => {
        if (Response != 0) {
          console.log(Response.toString());
          this.notificationService.success(':: Your order is placed successfully');
          this.clearpage();
        }
        else {
          this.notificationService.warn(':: Invalid Data');
        }
      })
      //console.log(this)
    }
  }

  clearpage() {
    alert('do i clear this page')
  }
  get username(){
    return localStorage.getItem('username')
  }
}
