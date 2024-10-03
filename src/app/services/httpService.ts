import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class HttpService {
    private url:string =  'http://127.0.0.1:8000/api'

    headers:any = {
        'Accept' : 'multipart/form-data',
      }

      _headers:any = {
        'Authorization' : localStorage.getItem('token'),
        'Accept' : 'application/json',
        'userid' : localStorage.getItem('userid')
      }
    
    constructor(private http: HttpClient) { }

    getDataBase():Observable<any>{
        return this.http.get(`${this.url}/pipereports`)
    }

    uploadFile(body: FormData):Observable<any>{
        return this.http.post(`${this.url}/pipereport`,body)
      }


}