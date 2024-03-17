import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from '../../../apis/customer.service';
import { Customer } from '../../../shared/types/customer/customer';
import { ErrorMessages } from '../../../error-handling/error-messages';

@Component({
  selector: 'app-new-customer',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './new-customer.component.html',
  styleUrl: './new-customer.component.css',
})
export class NewCustomerComponent {
  newCustomerForm!: FormGroup;
  customer: Customer = new Customer();
  submitted: boolean = false;
  loadAPI!: Promise<any>;

  constructor(
    private customerService: CustomerService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.setupCustomerForm();
  }

  get fc() {
    return this.newCustomerForm.controls;
  }

  setupCustomerForm() {
    this.newCustomerForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.maxLength(50)]],
      lastName: ['', [Validators.required, Validators.maxLength(50)]],
      email: [
        '',
        [
          Validators.required,
          Validators.maxLength(50),
          Validators.pattern(`^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$`),
        ],
      ],
      mobileNumber: [
        '',
        [Validators.required, Validators.pattern('^\\d{10}$')],
      ],
      address: ['', [Validators.required, Validators.maxLength(250)]],
    });
  }

  addNewCustomer() {
    this.submitted = true;
    if (this.newCustomerForm.invalid) {
      window.alert(ErrorMessages.INVALID_INPUTS);
      return;
    }

    this.customer.firstName = this.fc['firstName'].value;
    this.customer.lastName = this.fc['lastName'].value;
    this.customer.email = this.fc['email'].value;
    this.customer.mobileNumber = this.fc['mobileNumber'].value;
    this.customer.address = this.fc['address'].value;

    this.customerService.addNewCustomer(this.customer).subscribe({
      next: () => {
        this.router.navigateByUrl('');
      },
      error: (errorResponse) => {
        window.alert(
          errorResponse.error.message || ErrorMessages.SERVER_CONNECTION_ERROR
        );
      },
    });
  }
}
