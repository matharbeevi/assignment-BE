import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {

  uri = '/business';
  versionuri = '/getversion';

  constructor(private http: HttpClient) { }

  addBusiness(reference, account_no, description, start_bal,mutation, end_bal) {
    const obj = {
      reference: reference,
      account_no: account_no,
      description: description,
      start_bal: start_bal,
      mutation: mutation, 
      end_bal: end_bal
    };
    this.http.post(`${this.uri}/add`, obj)
        .subscribe(res => console.log('Done'));
  }

  getBusinesses() {
    return this
           .http
           .get(`${this.uri}`);
  }

  getVersion() {
    return this
           .http
           .get(`${this.versionuri}`);
  }

  editBusiness(id) {
    return this
            .http
            .get(`${this.uri}/edit/${id}`);
    }
}
