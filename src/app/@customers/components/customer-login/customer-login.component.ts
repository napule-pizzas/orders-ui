import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarRef, SimpleSnackBar } from '@angular/material/snack-bar';
import { takeUntil, switchMap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { BaseUnsubscriber } from 'src/app/@core/classes/BaseUnsubscriber';
import { LoadingIndicatorService } from 'src/app/@core/services/loading-indicator.service';
import { CustomersService } from '../../services/customers.service';
import { CUSTOMER_ERRORS } from '../../customers.d.type';

@Component({
  selector: 'nap-customer-login',
  templateUrl: './customer-login.component.html',
  styleUrls: ['./customer-login.component.scss']
})
export class CustomerLoginComponent extends BaseUnsubscriber implements OnInit {
  loginForm: FormGroup;
  hidePassword = true;
  isLoading: Subject<boolean> = this.loadingIndicatorService.isLoading;

  private snackbarRef: MatSnackBarRef<SimpleSnackBar>;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private loadingIndicatorService: LoadingIndicatorService,
    private customersService: CustomersService
  ) {
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
              this.onUserUnauthorized();
              break;
            case CUSTOMER_ERRORS.USER_NOT_ACTIVE:
              this.onUserNotActive(err.id);
              break;
            default:
              return;
          }
        }
      );
  }

  private onUserUnauthorized() {
    this.snackBar.open('Usuario o contraseña incorrectos');
  }

  private onUserNotActive(userId: string) {
    this.snackbarRef = this.snackBar.open('Cuenta no activada', 'REENVIAR MENSAJE', {
      duration: 10000
    });
    this.snackbarRef
      .onAction()
      .pipe(
        takeUntil(this.onDestroy$),
        switchMap(() => this.customersService.resendConfirmationEmail(userId))
      )
      .subscribe(() => this.snackBar.open('Mensaje de confirmacion reenviado.'));
  }
}
