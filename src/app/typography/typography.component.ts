import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { ApiAccessProvider } from 'app/providers/api-access';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-typography',
  templateUrl: './typography.component.html',
  styleUrls: ['./typography.component.css'],
  providers: [ApiAccessProvider]
})
export class TypographyComponent implements OnInit {

  fileToUpload: File = null;

  public skuDataList: any[] = [];
  public skuMasterList: any[] = [];

  constructor(
    private apiUrl: ApiAccessProvider,
    private snackbar: MatSnackBar,
  ) { }

  ngOnInit() {
  }

  handleFileInput(files: FileList) {
    //this.fileToUpload = files.item(0);
    this.onFileChange(files);
  }

  onFileChange(event: any) {
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(event.target);
    if (target.files.length !== 1) {
      throw new Error('Cannot use multiple files');
    }
    const reader: FileReader = new FileReader();
    reader.readAsBinaryString(target.files[0]);
    reader.onload = (e: any) => {
      /* create workbook */
      const binarystr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(binarystr, { type: 'binary' });

      /* selected the first sheet */
      const wsname: string = wb.SheetNames[0];
      const ws: XLSX.WorkSheet = wb.Sheets[wsname];

      /* save data */
      const data = XLSX.utils.sheet_to_json(ws); // to get 2d array pass 2nd parameter as object {header: 1}
      console.log(data); // Data will be logged in array format containing objects
      this.setSkuTableList(data);
    };
 }

  setSkuTableList(data: any[]) {
    if(data && data.length > 0) {
      data.forEach(element => {
        element.skuNo =  element.skuNo.toString();
        this.skuMasterList.push(element);
      });
      this.skuDataList = data;
    }
  }

  saveMasterList() {
    this.apiUrl.postSkuMaster(this.skuMasterList).subscribe(res =>{
      if(res) {
        if(res.status == "success") {
          this.snackbar.open("Success", "SKU list has been uploaded successfully into Database.", {duration: 3000});
          this.clearTable();
        } else {
          this.snackbar.open("Error", "Unable to upload SKU list into Database.", {duration: 3000});
        }
      }
    });
  }

  clearTable() {
    this.skuDataList = [];
    this.skuMasterList = [];
  }

}
