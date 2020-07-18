import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BaseUnsubscriber } from 'src/app/@core/classes/BaseUnsubscriber';
import { CustomersService } from '../../services/customers.service';
import { takeUntil } from 'rxjs/operators';
import { CUSTOMER_ERRORS } from '../../customers.d.type';
import { BREAKPOINT } from '@angular/flex-layout';

@Component({
  selector: 'nap-customer-login',
  templateUrl: './customer-login.component.html',
  styleUrls: ['./customer-login.component.scss']
})
export class CustomerLoginComponent extends BaseUnsubscriber implements OnInit {
  loginForm: FormGroup;
  errorMessage: string;
  hidePassword = true;

  constructor(private fb: FormBuilder, private customersService: CustomersService) {
    super();
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(12)]]
    });
  }

  onSubmit() {
    const { username, password } = this.loginForm.value;
    this.customersService
      .login(username, password)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(
        response => {
          localStorage.setItem('jwt-token', response.token);
          this.customersService.customer.next(response.user);
        },
        err => {
          switch (err.msg) {
            case CUSTOMER_ERRORS.USER_UNAUTHORIZED:
              this.errorMessage = 'Usuario o contraseña incorrectos';
              break;
            default:
              return;
          }
        }
      );
  }
}
