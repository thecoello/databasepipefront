import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../models/user";

@Injectable()
export class HttpService {
  private url: string = 'http://127.0.0.1:8000/api'

  headers: any = {
    'Accept': 'multipart/form-data',
  }

  _headers: any = {
    'Authorization': localStorage.getItem('token'),
    'Accept': 'application/json',
    'userid': localStorage.getItem('userid')
  }

  constructor(private http: HttpClient) { }

  getDataBase(): Observable<any> {
    return this.http.get(`${this.url}/pipereports`)
  }

  uploadFile(body: FormData): Observable<any> {
    return this.http.post(`${this.url}/pipereport`, body)
  }

  createUser(body: User): Observable<any> {
    return this.http.post(`${this.url}/user`, body)
  }

  getUsers(url: string): Observable<any> {
    return this.http.get(`${this.url}${url}`)
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.url}/user/${id}`)
  }
  setNewPassword(id: number): Observable<any> {
    return this.http.get(`${this.url}/setnewpassword/${id}`)
  }


}