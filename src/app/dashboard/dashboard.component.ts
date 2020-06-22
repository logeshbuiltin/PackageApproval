import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { MatTableDataSource } from '@angular/material/table';
import { ApiAccessProvider } from 'app/providers/api-access';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { PrintLabelComponent } from 'app/components/print-label/print-label.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [ApiAccessProvider]
})
export class DashboardComponent implements OnInit {

  //variables
  skuNo: any = "";
  quantity: number = 0;
  ctnNo: number = 0;
  asnNo: any = "";
  productName: any ="";
  color: any ="";
  packingDate: Date = new Date();
  actWeight: number = 0;
  tolarance: number = 0;

  totalSku: number = 0;
  completedSku: number = 0;

  //image
  myThumbnail: any;
  myFullresImage: any;

  public skuList: any[] = [];
  public ctnList: any[] = [];
  public skuDataList: any[] = [];

  displayedColumns: string[] = [
    "sNo",
    "asnNo",
    "weight",
    "tolerance",
    "status",
  ];

  skuDetailsForm = this.formBuilder.group({
    skuNo: new FormControl('', Validators.required),
    quantity: new FormControl({ value: this.quantity}),
    ctnNo: new FormControl({ value: this.ctnNo}),
    asnNo: new FormControl(''),
    productName: new FormControl(''),
    color: new FormControl(''),
    packingDate: new FormControl(''),
    actWeight: new FormControl(''),
    tolarance: new FormControl('')
  });


  constructor(
    private formBuilder: FormBuilder,
    private apiUrl: ApiAccessProvider,
    private snackbar: MatSnackBar,
    private matDialog: MatDialog 
  ) { }

  ngOnInit() {
    this.updateHeaders();
    this.getSkuList();
  }

  updateHeaders() {
    this.apiUrl.getSkuList().subscribe(res =>{
      if(res && res.length > 0) {
        this.totalSku = res.length;
        this.completedSku = res.filter(function(value){
          return value.status === 'Completed';}).length 
      }
    });
  }

  getSkuList() {
    this.apiUrl.getSkuNo().subscribe(res =>{
      if(res && res.length > 0) {
        this.skuList = res;
        this.skuNo = localStorage.getItem('skuNo');
        if(this.skuNo) {
          this.getSkuDetails();
        }
      }
    });
  }

  getSkuDetails() {
    let skuDetails: any;
    this.apiUrl.getSkuData(this.skuNo).subscribe(res =>{
      if(res && res.skuNo) {
        skuDetails = res;
        this.initializeFields(skuDetails);
        localStorage.setItem('skuNo', this.skuNo);
      }
    });
  }

  initializeFields(skuDetails: any) {
    this.ctnList = [];
    this.myThumbnail = "/assets/img/angular.png"

    this.skuNo = skuDetails.skuNo;
    this.quantity = skuDetails.ip;
    this.ctnNo = skuDetails.mp;
    this.asnNo = skuDetails.asnNo;
    this.productName = skuDetails.itemDesc;
    this.color = skuDetails.color;
    this.packingDate = new Date();
    this.actWeight = skuDetails.netWeight;
    this.tolarance = skuDetails.tolerance;

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
    this.getSkuCtnNo(this.skuNo, skuDetails.mp);
  }

  getSkuCtnNo(skuNo: any, skuCtnNo) {
    let completedCtnList = [];
    this.apiUrl.getSkuCtnNo(this.skuNo).subscribe(res =>{
      if(res && res.length > 0) {
        completedCtnList = res;
      }
      this.updateCtnList(skuCtnNo, completedCtnList);
    });
  }

  updateCtnList(mp: any, completedCtnList) {
    for(let i=1;i<=mp;i++){
      if(completedCtnList.indexOf(i) > -1) {
        console.log("CTN: "+i+" completed");
      } else {
        this.ctnList.push(i);
      }
    }
    if(this.ctnList.length == 0) {
      this.snackbar.open("Details", "SKU# " + this.skuNo +" has been completed and Packed.", {duration: 3000});
    } else {
      this.ctnNo = this.ctnList[0];
      this.setTotalSkuList();
    }
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

  checkAsnNoAndTolerance(element) {
    if(element.asnNo == this.asnNo) {
      element.status = "valid";
      this.calculateTolerance(element);
    } else {
      element.status = "invalid";
    }
  }

  calculateTolerance(element) {
    let tempTol = this.actWeight - element.weight;
    element.tolerance = tempTol;
    if(tempTol > this.tolarance) {
      element.status = "invalid";
    } else if(tempTol < 0) {
      element.status = "invalid";
    } else {
      element.status = "valid";
    } 
  }

  saveItemList() {
    let dataList = [];
    if(this.skuDataList.length > 0){
      if(this.skuDataList.some(s => s.status == "invalid") || this.skuDataList.some(s => s.status == "uncheck")) {
        this.snackbar.open("Error", "Invalid ASN.No or invalid weight has been entered", {duration: 3000});
      } else {
        this.skuDataList.forEach(element => {
          let data = {
            "asnNo": element.asnNo,
            "itemDesc": this.productName,
            "color": this.color,
            "netWeight": element.weight,
            "tolerance": element.tolerance,
            "ctnNo": this.ctnNo,
            "status": element.status,
            "itemSku": this.skuNo
          }
          dataList.push(data);
        });
        this.apiUrl.postSkuItem(this.skuNo, dataList).subscribe(res =>{
          if(res && res.length > 0) {
            this.checkFinalStatus();
            this.clearAndReset();
            this.snackbar.open("Success", "CTN."+ this.ctnNo +" has been completed and kindly pack the box.", {duration: 3000});
            const dialogRef = this.matDialog.open(PrintLabelComponent, {
              width: "50%",
              data: {
                skuNo: this.skuNo,
                color: this.color,
                itemDesc: this.productName,
                asnNo: this.asnNo,
                quantity: this.quantity,
              }
            });
          }
        });
      }
    }
  }

  checkFinalStatus() {
    let ctnIndex = this.ctnList.findIndex(c => c == this.ctnNo);
    let nextIndex = ctnIndex+1;
    if(nextIndex > (this.ctnList.length-1)) {
      this.apiUrl.updateSkuMasterStatus(this.skuNo).subscribe(res =>{
        if(res) {
          console.log(res.status);
        }
      });
    }
  }

  clearAndReset() {
    let ctnIndex = this.ctnList.findIndex(c => c == this.ctnNo);
    let nextIndex = ctnIndex+1;
    if(nextIndex > (this.ctnList.length-1)) {
      this.snackbar.open("Details", "SKU# " + this.skuNo +" has been completed and Packed.", {duration: 3000});
      this.skuDataList = [];
    } else {
      this.ctnNo = this.ctnList[nextIndex];
      this.ctnList.splice(ctnIndex, 1);
      this.skuDataList = [];
      this.setTotalSkuList();
    }
  }

}
