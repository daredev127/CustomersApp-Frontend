import { Component, ViewChild } from '@angular/core';
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
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-new-customer',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './new-customer.component.html',
  styleUrl: './new-customer.component.css',
})
export class NewCustomerComponent {
  @ViewChild('address') addressInput: any;
  newCustomerForm!: FormGroup;
  customer: Customer = new Customer();
  submitted: boolean = false;
  loadAPI!: Promise<any>;

  constructor(
    private customerService: CustomerService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.loadAPI = new Promise((resolve) => {
      let script = this.loadGooglePlacesScript();
      if (script) {
        script.onload = () => {
          resolve(true);
        };
      } else {
        resolve(true);
      }
    });
  }

  ngOnInit(): void {
    this.setupCustomerForm();
  }

  ngAfterViewInit() {
    this.loadAPI.then((flag) => {
      this.getPlaceAutocomplete();
    });
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

  getPlaceAutocomplete() {
    const autocomplete = new google.maps.places.Autocomplete(
      this.addressInput.nativeElement,
      {
        componentRestrictions: { country: 'AU' },
        types: ['address'],
      }
    );
    google.maps.event.addListener(autocomplete, 'place_changed', () => {
      const place = autocomplete.getPlace();
      this.fc['address'].setValue(place['formatted_address']!.toString());
    });
  }

  loadGooglePlacesScript() {
    console.log('loading');
    let script = undefined;
    let googlePlacesScriptExists =
      this.checkIfGooglePlacesScriptAlreadyExists();
    if (!googlePlacesScriptExists) {
      script = document.createElement('script');
      script.defer = false;
      script.src = `https://maps.googleapis.com/maps/api/js?libraries=places&key=${environment.GOOGLE_PLACES_KEY}`;
      const head = document.getElementsByTagName('head')[0];
      if (head !== null && head !== undefined) {
        document.head.appendChild(script);
      }
    }

    return script;
  }

  checkIfGooglePlacesScriptAlreadyExists(): boolean {
    const scripts = document.getElementsByTagName('script');
    for (let i = 0; i < scripts.length; ++i) {
      if (
        scripts[i].getAttribute('src') != null &&
        scripts[i].getAttribute('src')!.includes('googleapis')
      ) {
        return true;
      }
    }
    return false;
  }
}
