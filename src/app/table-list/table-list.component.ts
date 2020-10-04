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

  //paging
  public pageNo: number = 1;
  public pageSize: number = 20;

  p: any;

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
          this.skuDataList.push(element);
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
