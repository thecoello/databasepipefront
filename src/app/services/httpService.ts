import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class HttpService {
    private url:string =  'http://127.0.0.1:8000/api'
    
    constructor(private http: HttpClient) { }

    getDataBase():Observable<any>{
        return this.http.get(`${this.url}/pipereports`)
    }


}