import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { BASE_URL } from "assets/properties";
import { map } from 'rxjs/operators';


@Injectable()
export class ApiAccessProvider {
    static readonly SKU_NO_URL = "/getallskuNo";
    static readonly SKU_DETAILS_URL = "/getskuData/";
    static readonly SKU_CTNNO_URL = "/getctnno/";
    static readonly SKU_LIST_URL = "/getallskuDetails";
    static readonly SKU_ITEM_SAVE_URL = "/postitem/";
    static readonly SKU_MASTER_SAVE_URL = "/postskumaster";
    static readonly SKU_MASTER_DELETE_URL = "/skumasterdelete/";
    static readonly SKU_MASTER_STATUS_UPDATE = "/updateskumaster/";

    constructor(
        public http: HttpClient,
      ) {}


    public getSkuNo() {
        let skuList = [];
        return Observable.create(observer => {
        this.http.get(BASE_URL+ApiAccessProvider.SKU_NO_URL)
        .pipe(map((res: any) => res))
        .subscribe( data => {
            if (data) {
                skuList = data;
            } 
                observer.next(skuList);
                setTimeout(() => {
                    observer.complete();
                }, 5000);
            }, error => {
                observer.next(false);
                setTimeout(() => {
                    observer.complete();
                }, 5000);
            });
        }, err => console.error(err));
    }

    public getSkuData(skuNo) {
        let skuData: any;
        return Observable.create(observer => {
        this.http.get(BASE_URL+ApiAccessProvider.SKU_DETAILS_URL+skuNo)
        .pipe(map((res: any) => res))
        .subscribe( data => {
            if (data) {
                skuData = data;
            } 
            observer.next(skuData);
            setTimeout(() => {
                observer.complete();
            }, 5000);
            }, error => {
                observer.next(false);
                setTimeout(() => {
                    observer.complete();
                }, 5000);
            });
        }, err => console.error(err));
    }

    public getSkuCtnNo(skuNo) {
        let skuCtnNo: any;
        return Observable.create(observer => {
        this.http.get(BASE_URL+ApiAccessProvider.SKU_CTNNO_URL+skuNo)
        .pipe(map((res: any) => res))
        .subscribe( data => {
            if (data) {
                skuCtnNo = data;
            } 
            observer.next(skuCtnNo);
            setTimeout(() => {
                observer.complete();
            }, 5000);
            }, error => {
                observer.next(false);
                setTimeout(() => {
                    observer.complete();
                }, 5000);
            });
        }, err => console.error(err));
    }

    public getSkuList() {
        let skuList: any;
        return Observable.create(observer => {
        this.http.get(BASE_URL+ApiAccessProvider.SKU_LIST_URL)
        .pipe(map((res: any) => res))
        .subscribe( data => {
            if (data) {
                skuList = data;
            } 
            observer.next(skuList);
            setTimeout(() => {
                observer.complete();
            }, 5000);
            }, error => {
                observer.next(false);
                setTimeout(() => {
                    observer.complete();
                }, 5000);
            });
        }, err => console.error(err));
    }

    public postSkuItem(skuNo, itemList) {
        let skuData: any;
        return Observable.create(observer => {
        this.http.post(BASE_URL+ApiAccessProvider.SKU_ITEM_SAVE_URL+skuNo, itemList)
        .pipe(map((res: any) => res))
        .subscribe( data => {
            if (data) {
                skuData = data;
            } 
            observer.next(skuData);
            setTimeout(() => {
                observer.complete();
            }, 5000);
            }, error => {
                observer.next(false);
                setTimeout(() => {
                    observer.complete();
                }, 5000);
            });
        }, err => console.error(err));
    }

    public postSkuMaster(masterList) {
        let skuData: any;
        return Observable.create(observer => {
        this.http.post(BASE_URL+ApiAccessProvider.SKU_MASTER_SAVE_URL, masterList)
        .pipe(map((res: any) => res))
        .subscribe( data => {
            if (data) {
                skuData = data;
            } 
            observer.next(skuData);
            setTimeout(() => {
                observer.complete();
            }, 5000);
            }, error => {
                observer.next(false);
                setTimeout(() => {
                    observer.complete();
                }, 5000);
            });
        }, err => console.error(err));
    }

    public updateSkuMasterStatus(skuNo) {
        let skuData: any;
        return Observable.create(observer => {
        this.http.put(BASE_URL+ApiAccessProvider.SKU_MASTER_STATUS_UPDATE+skuNo, {})
        .pipe(map((res: any) => res))
        .subscribe( data => {
            if (data) {
                skuData = data;
            } 
            observer.next(skuData);
            setTimeout(() => {
                observer.complete();
            }, 5000);
            }, error => {
                observer.next(false);
                setTimeout(() => {
                    observer.complete();
                }, 5000);
            });
        }, err => console.error(err));
    }

    public deleteSkuMaster(skuNo) {
        let skuData: any;
        return Observable.create(observer => {
        this.http.delete(BASE_URL+ApiAccessProvider.SKU_MASTER_DELETE_URL+skuNo)
        .pipe(map((res: any) => res))
        .subscribe( data => {
            if (data) {
                skuData = data;
            } 
            observer.next(skuData);
            setTimeout(() => {
                observer.complete();
            }, 5000);
            }, error => {
                observer.next(false);
                setTimeout(() => {
                    observer.complete();
                }, 5000);
            });
        }, err => console.error(err));
    }

}