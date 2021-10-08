import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable, Subject } from 'rxjs';
import { LabservicsService } from '../shared/labservics.service';
import { NotificationService } from '../shared/notification.service';
import {map, startWith} from 'rxjs/operators'; 
import { Labtest } from '../shared/labtest.model';
import { MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';

@Component({
  selector: 'app-book-lab-test',
  templateUrl: './book-lab-test.component.html',
  styleUrls: ['./book-lab-test.component.css']
})
export class BookLabTestComponent implements OnInit {
  allTest : Labtest []
  Testbooking : FormGroup;
  // BookLabTest = new FormGroup({
  //   name: new FormControl(''),
  //   age: new FormControl(''),
  //   // gender: new FormControl(''),
  //   phoneNo: new FormControl(''),
  //   //Test: new FormControl(''),
  //   Prescription: new FormControl(''),

  //   })


    
  filteredOptions: Observable<Labtest[]>;
  list: any;
  constructor(public gservice:LabservicsService,private notificationService: NotificationService) { }
  
  // ============================= working  on form as global variables ================================
  BookLabTest: FormGroup;
  name:  string;
  age: number;
  phone : string;
  Test = new FormControl('') ;
  Prescription : ImageData;
  address : string;


  ngOnInit(): void {
    this.BookLabTest = new FormGroup({
      name : new FormControl(''),
      age : new FormControl(''),
      phoneNo : new FormControl(''),
      Prescription : new FormControl(''),
      test : new FormControl(''),
      address : new FormControl('')
    })
    this.gservice.GetAlllabtest().subscribe((res: any) => {
      this.allTest = res;
      this.filteredOptions = this.Test.valueChanges.pipe(startWith(''), map(value => this.filter(value)))
    })    
  }
  
  private filter(inputStr: string): Labtest[] {
    return this.allTest.filter(option => option.testname.toLowerCase().includes(inputStr))
  }
  doctorselecion(event: MatAutocompleteSelectedEvent)
  {
    const selectedValue = event.option.value;
    //  this.Testbooking.controls['testcode'].setValue(selectedValue.testcode);
    // this.Testbooking.controls['Test'].setValue(selectedValue.testname);
     this.BookLabTest.controls["test"].setValue(selectedValue.testname);
  }

  resetpage(){
    
  }
  displayFn(subject:any) : string {
    return subject ? subject.testname:''
  }
  onSubmit(BookLabTest: FormGroup) {
    if (this.BookLabTest.valid) {
      this.gservice.LabTestData = this.BookLabTest.getRawValue()
      console.log(this.gservice.LabTestData)
      this.gservice.Labtestnooking().subscribe(Response => {

        if (Response != 0) {
          console.log(Response.toString());
          this.notificationService.success(':: Registered successfully');
          this.clearpage();
        }
        else {
          this.notificationService.warn(':: Invalid Data');
        }
      })
      //this.resetForm();
      //this.dialogRef.close();
    }
  }

  clearpage()
  {
    alert('do clear this page')
  }

  onClick(): void {
    //this.dialogRef.close();
  }

  
  


  
}
