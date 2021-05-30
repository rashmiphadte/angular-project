import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  baseUrl = 'http://localhost:3003'
  constructor(private http: HttpClient) {
  }
  loginUser(inputs) {
    let headers = new HttpHeaders({
      'Accept': 'application/json, text/plain, application/xml,  */*',
      "Content-Type": "application/json",
      'Access-Control-Allow-Headers': 'Content-Type',
    });
    let options = {
      headers: headers
    }
    return this.http.post<any>(this.baseUrl + '/user/login', inputs, options);
  }
  getEmployeeData() {

    let token = sessionStorage.getItem('token');
    let headers = new HttpHeaders({
      'Accept': 'application/json, text/plain, application/xml,  */*',
      "Content-Type": "application/json",
      'Access-Control-Allow-Headers': 'Content-Type',
      'Authorization': `Bearer ${token}`
    });
    let options = {
      headers: headers
    }
    return this.http.post<any>(this.baseUrl + '/employee', null, options);
  }

  getAllEmployees() {

    let token = sessionStorage.getItem('token');
    let headers = new HttpHeaders({
      'Accept': 'application/json, text/plain, application/xml,  */*',
      "Content-Type": "application/json",
      'Access-Control-Allow-Headers': 'Content-Type',
      'Authorization': `Bearer ${token}`
    });
    let options = {
      headers: headers
    }
    return this.http.get<any>(this.baseUrl + '/employee', options).pipe(map(res => {
      return res;
    }));
  }

  deleteEmployee(id) {
    let token = sessionStorage.getItem('token');
    let headers = new HttpHeaders({
      'Accept': 'application/json, text/plain, application/xml,  */*',
      "Content-Type": "application/json",
      'Access-Control-Allow-Headers': 'Content-Type',
      'Authorization': `Bearer ${token}`
    });
    let options = {
      headers: headers
    }
    return this.http.post<any>(`${this.baseUrl}/employee/delete/${id}`, '', options)
  }

  addEmployee(inputs) {
    let token = sessionStorage.getItem('token');
    let headers = new HttpHeaders({
      'Accept': 'application/json, text/plain, application/xml,  */*',
      "Content-Type": "application/json",
      'Access-Control-Allow-Headers': 'Content-Type',
      'Authorization': `Bearer ${token}`
    });
    let options = {
      headers: headers
    }
    return this.http.post<any>(this.baseUrl + '/employee/add', inputs, options);
  }

  updateEmployee(inputs, id) {
    let token = sessionStorage.getItem('token');
    let headers = new HttpHeaders({
      'Accept': 'application/json, text/plain, application/xml,  */*',
      "Content-Type": "application/json",
      'Access-Control-Allow-Headers': 'Content-Type',
      'Authorization': `Bearer ${token}`
    });
    let options = {
      headers: headers
    }
    return this.http.post<any>(this.baseUrl + '/employee/update/' + id, inputs, options);
  }

  getAllReviews() {

    let token = sessionStorage.getItem('token');
    let headers = new HttpHeaders({
      'Accept': 'application/json, text/plain, application/xml,  */*',
      "Content-Type": "application/json",
      'Access-Control-Allow-Headers': 'Content-Type',
      'Authorization': `Bearer ${token}`
    });
    let options = {
      headers: headers
    }
    return this.http.get<any>(this.baseUrl + '/performance', options).pipe(map(res => {
      return res;
    }));
  }
}
