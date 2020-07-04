import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BaseUnsubscriber } from 'src/app/@core/classes/BaseUnsubscriber';
import { CustomersService } from '../../services/customers.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'nap-customer-login',
  templateUrl: './customer-login.component.html',
  styleUrls: ['./customer-login.component.scss']
})
export class CustomerLoginComponent extends BaseUnsubscriber implements OnInit {
  loginForm: FormGroup;
  hidePassword = true;

  constructor(private fb: FormBuilder, private customersService: CustomersService) {
    super();
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: [null, Validators.required],
      password: [null, Validators.required]
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
        err => console.log(err) // TODO display error message to the user
      );
  }
}
