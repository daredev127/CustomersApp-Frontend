import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Customer } from '../shared/types/customer/customer';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  constructor(private http: HttpClient) {}

  getCustomers(): Observable<Customer[]> {
    return this.http.get<Customer[]>(environment.CUSTOMER_API_URL);
  }

  getCustomerById(id: string): Observable<Customer> {
    return this.http.get<Customer>(environment.CUSTOMER_API_URL + id);
  }

  addNewCustomer(customer: Customer): Observable<Customer> {
    return this.http.post<Customer>(environment.CUSTOMER_API_URL, customer);
  }
}
