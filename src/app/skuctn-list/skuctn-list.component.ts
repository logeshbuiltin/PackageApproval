import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiAccessProvider } from 'app/providers/api-access';
import { MatSelect } from '@angular/material/select';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
import { ReplaySubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-skuctn-list',
  templateUrl: './skuctn-list.component.html',
  styleUrls: ['./skuctn-list.component.css'],
  providers: [ApiAccessProvider]
})
export class SkuctnListComponent implements OnInit {

  public skuDataList: any[] = [];
  public buyerList: any[] = [];
  buyerNo: string = "none";

  skuDetailsForm = this.formBuilder.group({
    buyerNo: new FormControl('', Validators.required),
  });


  @ViewChild("skuSelect") skuSelect: MatSelect;
  public skuFilterCtrl: FormControl = new FormControl();
  public skuSelectCtrl: FormControl = new FormControl();
  public filterSkus: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);

  protected _onDestroy = new Subject<void>();

  constructor(
    private apiUrl: ApiAccessProvider,
    private formBuilder: FormBuilder,
    private snackbar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.getAllItemSku();
    this.getSkuNoList();
    this.setInitialize();
  }

  setInitialize() {
    this.skuFilterCtrl.valueChanges
     .pipe(takeUntil(this._onDestroy))
     .subscribe(() => {
       this.filterSku();
    });
  }

  filterSku() {
    if (!this.buyerList) {
      return;
    }
    // get the search keyword
    let search = this.skuFilterCtrl.value;
    if (!search) {
      this.filterSkus.next(this.buyerList.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filterSkus.next(
      this.buyerList.filter(e => e.toLowerCase().indexOf(search) > -1)
    );
  }

  getSkuNoList() {
    this.apiUrl.getAllBuyerList().subscribe(res =>{
      if(res && res.length > 0) {
        this.buyerList = res;
        this.buyerList.push("none");
        this.buyerList.sort();
        this.filterSkus.next(this.buyerList.slice());
      }
    });
  }

  setSelectionLength(event, sku) {
    sku.ctnLength = event.value.length;
  }

  getAllItemSku() {
    if(this.buyerNo == "none"){this.buyerNo = null;}
    this.apiUrl.getAllItemBuyerList(this.buyerNo).subscribe(res =>{
      if(res && res.length > 0) {
        res.forEach(element => {
          let totalCtn = this.getCount(element.skuNo, res);
          const data = {
            skuNo: element.skuNo,
            asnNo: element.asnNo,
            itemDesc: element.itemDesc,
            color: element.color,
            ctnNo: element.ctnNo,
            ctnNoList: [],
            selectedCtn: [],
            ctnLength: 0,
            netWeight: element.netWeight,
            tolerance: element.tolerance,
            ctnCount: element.ctnCount,
            cbm: element.cbm*totalCtn,
            checked: false
          }
          let itemInList = this.skuDataList.find(s => s.skuNo == data.skuNo);
          if(itemInList) {
            itemInList.ctnNoList.push(data.ctnNo);
          } else {
            data.ctnNoList.push(element.ctnNo);
            this.skuDataList.push(data);
          }
        });
      }
    });
  }

  getCount(skuNo, objects) {
    return objects.filter(obj => obj.skuNo === skuNo).length;
  }

  onCheckAll(event) {
    if(event.checked) {
      this.skuDataList.forEach(element => {
        element.checked = true;
      });
    } else {
      this.skuDataList.forEach(element => {
        element.checked = false;
      });
    }
  }

  getSkuItemDetails() {
    this.skuDataList = [];
    this.getAllItemSku();
  }

  updateItemList() {
    let updatelist = [];
    this.skuDataList.forEach(element => {
      if(element.checked) {
        element.selectedCtn.forEach(ctnNo => {
          let data = {
            skuNo: element.skuNo,
            asnNo: element.asnNo,
            itemDesc: element.itemDesc,
            color: element.color,
            ctnNo: ctnNo,
            netWeight: element.netWeight,
            tolerance: element.tolerance,
            ctnCount: element.ctnCount,
          }
          updatelist.push(data);
        });
      }
    });
    if(updatelist.length > 0) {
      this.apiUrl.putSkuItem(this.buyerNo, updatelist).subscribe(res =>{
        if(res && res.status) {
          this.snackbar.open("Success", "Items have been shipped successfully.", {duration: 3000});
        } else {
          this.snackbar.open("Error", "Items can not be shipped.", {duration: 3000});
        }
        this.getSkuItemDetails();
      });
    }
  }

}
