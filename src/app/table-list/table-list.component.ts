import { Component, OnInit } from '@angular/core';
import { ApiAccessProvider } from 'app/providers/api-access';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css'],
  providers: [ApiAccessProvider]
})
export class TableListComponent implements OnInit {

  public skuDataList: any[] = [];

  constructor(
    private apiUrl: ApiAccessProvider,
    private snackbar: MatSnackBar,
  ) { }

  ngOnInit() {
    this.initializeList();
  }

  initializeList() {
    this.apiUrl.getSkuList().subscribe(res =>{
      if(res && res.length > 0) {
        res.forEach(element => {
          const data = {
            skuNo: element.skuNo,
            upcNo: element.upcNo,
            asnNo: element.asnNo,
            designNo: element.designNo,
            itemDesc: element.itemDesc,
            size: element.size,
            gsm: element.gsm,
            gsf: element.gsf,
            itemType: element.itemType,
            color: element.color,
            netWeight: element.netWeight,
            tolerance: element.tolerance,
            ip: element.ip,
            mp: element.mp,
            id: element.id
          }
          this.skuDataList.push(data);
        });
      }
    });
  }

  deleteMasterSku(element) {
    this.apiUrl.deleteSkuMaster(element.skuNo).subscribe(res =>{
      if(res) {
        if(res.status == "success") {
          this.snackbar.open("Deleted", "SKU has been deleted successfully.", {duration: 3000});
          this.clearTable();
          this.initializeList();
        } else {
          this.snackbar.open("Error", "unable to delete SKU.", {duration: 3000});
        }
      } else {
        this.snackbar.open("Error", "unable to delete SKU.", {duration: 3000});
      }
    });
  }

  clearTable() {
    this.skuDataList = [];
  }

}
