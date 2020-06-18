import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {

  public skuDataList: any[] = [];

  constructor() { }

  ngOnInit() {
    this.initializeList();
  }

  initializeList() {
    this.skuDataList = [
      {skuNo: '57000',asnNo: 'B07YHTYSNS',itemDesc: "Kichen Towel",color: "Brown",netWeight: 0.660,grWeight: 0.710,ip: 1,mp: 20},
      {skuNo: '57001',asnNo: 'B08YHTYSNS',itemDesc: "Mat",color: "Brown",netWeight: 0.660,grWeight: 0.710,ip: 1,mp: 20},
      {skuNo: '57002',asnNo: 'B09YHTYSNS',itemDesc: "Fridge Cover",color: "Brown",netWeight: 0.660,grWeight: 0.710,ip: 1,mp: 20},
      {skuNo: '57003',asnNo: 'B02YHTYSNS',itemDesc: "Table Mat",color: "Brown",netWeight: 0.660,grWeight: 0.710,ip: 1,mp: 20},
      {skuNo: '57004',asnNo: 'B03YHTYSNS',itemDesc: "T-shirt",color: "Brown",netWeight: 0.660,grWeight: 0.710,ip: 1,mp: 20},
      {skuNo: '57005',asnNo: 'B04YHTYSNS',itemDesc: "Wipe",color: "Brown",netWeight: 0.660,grWeight: 0.710,ip: 1,mp: 20},
      {skuNo: '57006',asnNo: 'B05YHTYSNS',itemDesc: "Towel",color: "Brown",netWeight: 0.660,grWeight: 0.710,ip: 1,mp: 20},
      {skuNo: '57007',asnNo: 'B06YHTYSNS',itemDesc: "Kichen Towel",color: "Brown",netWeight: 0.660,grWeight: 0.710,ip: 1,mp: 20},
      {skuNo: '57008',asnNo: 'B20YHTYSNS',itemDesc: "Kichen Towel",color: "Brown",netWeight: 0.660,grWeight: 0.710,ip: 1,mp: 20}
    ]
  }

}
