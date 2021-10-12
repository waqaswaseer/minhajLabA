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
  isValid: boolean = true;
  constructor(public gservice: LabservicsService) { }

  ngOnInit(): void {
    this.gservice.GetAlllabtest().subscribe((res => this.itemLists = res as Labtest[]))
  
   }

}
