import { Component, OnInit } from '@angular/core';
import { LabservicsService } from '../shared/labservics.service';
import { Labtest, Testbooking } from '../shared/labtest.model';

@Component({
  selector: 'app-availibe-tests',
  templateUrl: './availibe-tests.component.html',
  styleUrls: ['./availibe-tests.component.css']
})
export class AvailibeTestsComponent implements OnInit {
  itemLists: Labtest[]
  formData: Testbooking;
  isValid: boolean = true;
  constructor(public gservice: LabservicsService) { }

  ngOnInit(): void {
    this.gservice.GetAlllabtest().subscribe((res => this.itemLists = res as Labtest[]))
  //   if (this.data.orderItemIndex == null)
  //     this.formData = {
  //       name: '',
  //       age: 0,
  //       phoneNo: '',
  //       Prescription: '',
  //       Test: '',
  //       address: '',
  //       totalBill:0,
  //     }
  //   else
  //     this.formData = Object.assign({}, this.gservice.orderItems[this.data.orderItemIndex]);
  // }
  // updatePrice(ctrl: any) {
  //   if (ctrl.selectedIndex == 0) {
  //     this.formData.Price = 0;
  //     this.formData.ItemName = '';
  //   }
  //   else {
  //     this.formData.Price = this.itemLists[ctrl.selectedIndex - 1].price;
  //     this.formData.ItemName = this.itemLists[ctrl.selectedIndex - 1].Name;
  //   }
  //   this.updateTotal();
  // }
  // updateTotal() {
  //   this.formData.Total = parseFloat((this.formData.Quantity * this.formData.Price).toFixed(2))
   }

}
