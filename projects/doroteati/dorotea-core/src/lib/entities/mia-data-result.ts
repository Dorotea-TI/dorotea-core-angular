import { Subject } from "rxjs";

export class MiaDataResult {
    static STATUS_PENDING = 0;
    static STATUS_SEARCHING = 1;
    static STATUS_READY = 2;
  
    key: string = '';
    status: number = 0;
    obs?: Subject<any>;
    result?: any;
  }