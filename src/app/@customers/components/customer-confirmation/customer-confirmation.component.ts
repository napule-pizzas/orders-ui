import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { takeUntil } from 'rxjs/operators';
import { BaseUnsubscriber } from 'src/app/@core/classes/BaseUnsubscriber';
import { ICustomer } from '../../customer.model';
import { CustomersService } from '../../services/customers.service';
import { CUSTOMER_ERRORS } from '../../customers.d.type';

@Component({
  selector: 'nap-customer-confirmation',
  templateUrl: './customer-confirmation.component.html',
  styleUrls: ['./customer-confirmation.component.scss']
})
export class CustomerConfirmationComponent extends BaseUnsubscriber implements OnInit {
  confirmationForm: FormGroup;
  customer: ICustomer;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private customersService: CustomersService
  ) {
    super();
  }

  ngOnInit(): void {
    this.confirmationForm = this.fb.group({
      username: [null, [Validators.required, Validators.email]],
      token: [null, Validators.required]
    });

    this.activatedRoute.data.pipe(takeUntil(this.onDestroy$)).subscribe(
      data => {
        const { customerToken } = data;
        this.customer = customerToken.customer;
        this.confirmationForm.get('token').setValue(customerToken.token);
      },
      err => {
        let msg = 'Oops, algo salio mal';
        if (err.type === CUSTOMER_ERRORS.ALREADY_VERIFIED) {
          msg = 'Esta cuenta fue verificada anteriormente';
          this.router.navigate(['/']);
        }
        this.snackBar.open(msg);
      }
    );
  }

  onSubmit() {
    this.customersService
      .confirmCustomer(this.confirmationForm.value)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(() => {
        this.snackBar.open('Cuenta verificada exitosamente!');
        this.router.navigate(['/']);
      });
  }
}
