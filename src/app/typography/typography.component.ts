import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { ApiAccessProvider } from 'app/providers/api-access';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-typography',
  templateUrl: './typography.component.html',
  styleUrls: ['./typography.component.css'],
  providers: [ApiAccessProvider]
})
export class TypographyComponent implements OnInit {

  fileToUpload: File = null;
  selectedFile: File[] = [];

  public skuDataList: any[] = [];
  public skuMasterList: any[] = [];

  constructor(
    private apiUrl: ApiAccessProvider,
    private snackbar: MatSnackBar,
    private httpClient: HttpClient
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
        let dbsData = {
          skuNo: element['SKU#']? element['SKU#'].toString(): "",
          upcNo: element['UPC#'],
          asnNo: element['ASN .NO'],
          designNo: element['MAXICAN DESIGN NO'],
          itemDesc: element['ITEM DESCRIPTION'],
          size: element['SIZE (IN)'],
          color: element['COLOR'],
          netWeightItem: element['NET WT (KGS) OF ITEM'],
          grWeightItem: element['GR WT (KGS) OF ITEM'],
          tolerance: element['Tollarance'],
          orderQty: element['order qty'],
          qtyPerCtn: element['Qty per ctn'],
          foldSize: element['FOLD SIZE (LXWXH) INCHES'],
          ctnLength: element['CARTON SIZE (INCHES) L'],
          ctnWidth: element['CARTON SIZE (INCHES W'],
          ctnHeight: element['CARTON SIZE (INCHES) H'],
          cbmCtn: element['CBM/CARTON'],
          netWeightCtn: element['net weight'],
          grWeightCtn: element['GR WT OF CTN (KGS)'],
          buyer: element['Buyer'],
          packAccess: ""
        }
        if(dbsData.skuNo) {
          this.skuMasterList.push(dbsData);
          this.skuDataList.push(dbsData);
        }
      });
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

  public onFileChanged(event) {
    //Select File
    this.selectedFile = event.target.files;
  }

  onUpload() {
    Array.from(this.selectedFile).forEach(element => {
      let fileName = element.name.split('.');
      let skuNo = fileName[0];
      //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
      const uploadImageData = new FormData();
      uploadImageData.append('imageFile', element, element.name);
      this.apiUrl.uploadImage(skuNo, uploadImageData).subscribe(response =>{
        if(response) {
          if (response.status == "success") {
            this.snackbar.open("Success", 'Image uploaded successfully', {duration: 3000});
            this.selectedFile = null;
          } else {
            this.snackbar.open("Success", 'Image not uploaded successfully', {duration: 3000});
          }
        }
      });
    });
  }


}
