import { Routes } from '@angular/router';
import { CustomerListComponent } from './features/customer/customer-list/customer-list.component';
import { CustomerDetailsComponent } from './features/customer/customer-details/customer-details.component';
import { NewCustomerComponent } from './features/customer/new-customer/new-customer.component';

export const routes: Routes = [
  { path: '', component: CustomerListComponent },
  { path: 'customer/:id', component: CustomerDetailsComponent },
  { path: 'new-customer', component: NewCustomerComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
