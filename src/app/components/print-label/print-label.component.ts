import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-print-label',
  templateUrl: './print-label.component.html',
  styleUrls: ['./print-label.component.css']
})
export class PrintLabelComponent implements OnInit {

  skuNo: string = "";
  itemDesc: string = "";
  color: string = "";
  quantity: number = 0;
  size: string = "";
  asnNo: string = "";
  netWeight: number = 0;
  grWeight: number = 0;

  constructor(
    public dialogRef: MatDialogRef<PrintLabelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) { 
    this.skuNo = data.skuNo;
    this.itemDesc = data.itemDesc;
    this.color = data.color;
    this.quantity = data.quantity;
    this.asnNo = data.asnNo;
    this.size = data.size;
    this.netWeight = data.netWeight;
    this.grWeight = data.grWeight;
  }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  printLabel() {
    window.print();
  }

}

export interface DialogData {
  skuNo: string;
  color: string;
  itemDesc: string;
  asnNo: string; 
  quantity: number;
  size: string;
  netWeight: number;
  grWeight: number;
}
