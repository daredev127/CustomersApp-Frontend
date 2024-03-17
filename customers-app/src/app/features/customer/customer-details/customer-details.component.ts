import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from '../../../apis/customer.service';
import { Customer } from '../../../shared/types/customer/customer';
import { ErrorMessages } from '../../../error-handling/error-messages';

@Component({
  selector: 'app-customer-details',
  standalone: true,
  imports: [],
  templateUrl: './customer-details.component.html',
  styleUrl: './customer-details.component.css',
})
export class CustomerDetailsComponent {
  customer!: Customer;

  constructor(
    private customerService: CustomerService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    var id = this.route.snapshot.params['id'];
    this.customerService.getCustomerById(id).subscribe(
      (res) => {
        this.customer = res;
      },
      (errorResponse) => {
        window.alert(
          errorResponse.error.message || ErrorMessages.SERVER_CONNECTION_ERROR
        );
      }
    );
  }
}
