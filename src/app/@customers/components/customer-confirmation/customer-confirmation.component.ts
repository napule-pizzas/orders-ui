import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Observable, combineLatest } from 'rxjs';
import { takeUntil, switchMap } from 'rxjs/operators';
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
  isVerified = false;

  private customer$: Observable<ICustomer>;
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private customersService: CustomersService
  ) {
    super();
  }

  ngOnInit(): void {
    this.confirmationForm = this.fb.group({
      username: [null, [Validators.required, Validators.email]],
      token: [null, Validators.required]
    });

    this.customer$ = this.activatedRoute.data.pipe(switchMap<Data, Observable<ICustomer>>(data => data.customer$));

    combineLatest([this.activatedRoute.paramMap, this.customer$])
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(
        ([params, customer]) => {
          this.customer = customer;
          this.confirmationForm.get('token').setValue(params.get('token'));
        },
        err => {
          if (err.type === CUSTOMER_ERRORS.ALREADY_VERIFIED) {
            this.isVerified = true;
          }
        }
      );
  }

  onSubmit() {
    this.customersService
      .confirmCustomer(this.confirmationForm.value)
      .pipe(takeUntil(this.onDestroy$))
      .subscribe(() => {
        this.router.navigate(['/']);
      });
  }
}
