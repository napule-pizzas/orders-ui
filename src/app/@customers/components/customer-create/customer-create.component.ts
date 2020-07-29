import { Component, OnInit, Output, EventEmitter, ViewEncapsulation, ViewChild, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, throwError } from 'rxjs';
import { takeUntil, switchMap, map, catchError } from 'rxjs/operators';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { NapuleValidators } from 'src/app/@core/classes/custom.validators';
import { BaseUnsubscriber } from 'src/app/@core/classes/BaseUnsubscriber';
import { OrdersService } from 'src/app/@orders/services/orders.service';
import { CustomersService } from '../../services/customers.service';
import { ICustomer } from '../../customer.model';
import {
  MatPasswordStrengthComponent,
} from '@angular-material-extensions/password-strength';

function existingEmailValidator(control: AbstractControl): Observable<ValidationErrors | null> {
  return this.customersService.emailExists(control.value).pipe(
    map(exists => (exists ? { emailUsed: true } : null)),
    catchError(err => throwError(err))
  );
}

@Component({
  selector: 'nap-customer-create',
  templateUrl: './customer-create.component.html',
  styleUrls: ['./customer-create.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CustomerCreateComponent extends BaseUnsubscriber implements OnInit, AfterViewInit {
  @Output()
  cancel: EventEmitter<void> = new EventEmitter<void>();
  customerForm: FormGroup;
  showPasswordInfo: boolean;
  cities: Array<{ name: string; zipCode: string }>;

  @ViewChild('passwordComponent', { static: true })
  passwordComponent: MatPasswordStrengthComponent;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private recaptchaV3Service: ReCaptchaV3Service,
    private orderService: OrdersService,
    private customersService: CustomersService
  ) {
    super();
  }

  ngOnInit(): void {
    this.customerForm = this.fb.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      phone: this.fb.group(
        {
          areaCode: [null, Validators.required],
          localNumber: [null, Validators.required]
        },
        { validators: NapuleValidators.phone_ar }
      ),
      email: [
        null,
        {
          validators: [Validators.required, Validators.email],
          asyncValidators: existingEmailValidator.bind(this),
          updateOn: 'blur'
        }
      ],
      address: this.fb.group({
        street: [null, Validators.required],
        number: [null, Validators.required],
        city: [null, Validators.required]
      })
    });

    this.cities = this.customersService.cities;
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.customerForm.addControl('password', this.passwordComponent.passwordFormControl);
      this.customerForm.addControl('confirmation', this.passwordComponent.passwordConfirmationFormControl);
    }, 0);
  }

  get passwordControl() {
    return this.customerForm.get('password');
  }

  get confirmationControl() {
    return this.customerForm.get('confirmation');
  }

  get localNumber() {
    return this.customerForm.get('phone.localNumber');
  }

  get phone() {
    return this.customerForm.get('phone');
  }

  onPhoneInput() {
    if (this.phone.hasError('phone') && (this.phone.touched || this.phone.dirty)) {
      this.localNumber.setErrors([{ phone: true }]);
    }
  }

  onSubmit() {
    const intendedAction = 'register';
    this.recaptchaV3Service
      .execute(intendedAction)
      .pipe(
        takeUntil(this.onDestroy$),
        switchMap((token: string) => {
          return this.customersService.createCustomer(this.customerForm.value, { token, intendedAction });
        })
      )
      .subscribe(
        (customer: ICustomer) => {
          this.snackBar.open(`${customer.firstName} gracias por registrate. Revisá el correo.`);
          this.orderService.initializeOrder();
        },
        err => {
          if (err.path === 'user.email' && err.kind === 'unique') {
            this.snackBar.open('Correo electrónico ya registrado');
          } else {
            this.snackBar.open('Oops, algo salio mal');
          }
        }
      );
  }

  goBack() {
    this.cancel.emit();
  }
}
