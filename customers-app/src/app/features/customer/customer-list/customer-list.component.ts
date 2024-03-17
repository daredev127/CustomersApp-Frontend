import { Component } from '@angular/core';
import { CustomerService } from '../../../apis/customer.service';
import { Customer } from '../../../shared/types/customer/customer';
import { ErrorMessages } from '../../../error-handling/error-messages';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.css',
})
export class CustomerListComponent {
  customers: Customer[] = [];

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.customerService.getCustomers().subscribe(
      (res) => {
        this.customers = res;
      },
      (errorResponse) => {
        window.alert(
          errorResponse.error.message || ErrorMessages.SERVER_CONNECTION_ERROR
        );
      }
    );
  }
}
