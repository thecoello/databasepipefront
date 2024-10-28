import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../models/user";
import Login from "../models/login";

@Injectable()
export class HttpService {
  private url: string = 'http://127.0.0.1:8000/api'
  id = localStorage.getItem('userid')
  token = localStorage.getItem('token')?.split(' ')[1]

  headers: any = {
    'Authorization': localStorage.getItem('token'),
    'Accept': 'application/json',
    'userid': localStorage.getItem('userid')
  }
  
  constructor(private http: HttpClient) {}

  getDataBase(): Observable<any> {
    return this.http.get(`${this.url}/pipereports`,{headers: this.headers})
  }

  uploadFile(body: FormData): Observable<any> {
    return this.http.post(`${this.url}/pipereport`, body,{headers: this.headers})
  }

  createUser(body: User): Observable<any> {
    return this.http.post(`${this.url}/user`, body,{headers: this.headers})
  }

  getUsers(url: string): Observable<any> {
    return this.http.get(`${this.url}${url}`,{headers: this.headers})
  }

  getUser(id: number): Observable<any> {
    return this.http.get(`${this.url}/user/${id}`,{headers: this.headers})
  }

  updateUser(body: User, id: number): Observable<any> {
    return this.http.put(`${this.url}/user/${id}`, body,{headers: this.headers})
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.url}/user/${id}`,{headers: this.headers})
  }

  setNewPassword(id: number): Observable<any> {
    return this.http.get(`${this.url}/setnewpassword/${id}`,{headers: this.headers})
  }

  login(body: Login): Observable<any> {
    return this.http.post(`${this.url}/login`, body)
  }

  logout(){
    return this.http.get(`${this.url}/logout`,{headers: this.headers})
  }

}