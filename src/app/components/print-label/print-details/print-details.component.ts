import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-print-details',
  templateUrl: './print-details.component.html',
  styleUrls: ['./print-details.component.css']
})
export class PrintDetailsComponent implements OnInit {

  @Input() dataObject: any;

  skuNo: string = "";
  itemDesc: string = "";
  color: string = "";
  quantity: number = 0;
  size: string = "";
  asnNo: string = "";
  netWeight: number = 0;
  grWeight: number = 0;

  constructor() { }

  ngOnInit(): void {
    this.skuNo = this.dataObject.skuNo;
    this.itemDesc = this.dataObject.itemDesc;
    this.color = this.dataObject.color;
    this.quantity = this.dataObject.quantity;
    this.asnNo = this.dataObject.asnNo;
    this.size = this.dataObject.size;
    this.netWeight = this.dataObject.netWeight;
    this.grWeight = this.dataObject.grWeight;
  }

}
