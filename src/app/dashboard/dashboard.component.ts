import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from "@angular/forms";
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  //variables
  skuNo: any;
  quantity: number;
  ctnNo: number;
  asnNo: any;
  productName: any;
  color: any;
  packingDate: Date;
  actWeight: number;
  tolarance: number;

  //image
  myThumbnail: any;
  myFullresImage: any;

  public skuList: any[] = ['57101', '57102', '57103', '57104', '57105'];
  public ctnList: any[] = [1, 2, 3, 4];
  public skuDataList: any[] = []

  displayedColumns: string[] = [
    "sNo",
    "asnNo",
    "weight",
    "tolerance",
    "status",
  ];

  skuDetailsForm = this.formBuilder.group({
    skuNo: new FormControl({}),
    quantity: new FormControl({}),
    ctnNo: new FormControl({}),
    asnNo: new FormControl({}),
    productName: new FormControl({}),
    color: new FormControl({}),
    packingDate: new FormControl({}),
    actWeight: new FormControl({}),
    tolarance: new FormControl({})
  });


  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.initializeFields();
    this.setTotalSkuList();
  }

  setTotalSkuList() {
    this.skuDataList = [];
    if(this.quantity > 0) {
      for(let i=1; i<= this.quantity; i++) {
        const data={
          sNo: i,
          asnNo: "",
          weight: "",
          tolerance: 0,
          status: "uncheck"
        }
        this.skuDataList.push(data);
      }
    }
  }

  initializeFields() {

    this.myThumbnail = "/assets/img/angular.png"

    this.skuNo = '57101';
    this.quantity = 4;
    this.ctnNo = 1;
    this.asnNo = "B07VKHDZXKN";
    this.productName = "Fridge Cover";
    this.color = "SKY Blue";
    this.packingDate = new Date();
    this.actWeight = 2.8;
    this.tolarance = 0.04;

    this.skuDetailsForm.setValue({
      skuNo: this.skuNo,
      quantity: this.quantity,
      ctnNo: this.ctnNo,
      asnNo: this.asnNo,
      productName: this.productName,
      color: this.color,
      packingDate: this.packingDate,
      actWeight: this.actWeight,
      tolarance: this.tolarance
    });
  }

  checkAsnNo(element) {
    if(element.asnNo == this.asnNo) {
      element.status = "valid";
    } else {
      element.status = "invalid";
    }
  }

  calculateTolerance(element) {
    let tempTol = this.actWeight - element.weight;
    if(tempTol > this.tolarance) {
      element.status = "invalid";
    } else if(tempTol < 0) {
      element.status = "invalid";
    } else {
      element.status = "valid";
    }
  }

}
