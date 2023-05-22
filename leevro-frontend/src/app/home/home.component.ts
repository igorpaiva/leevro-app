import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SamePasswordValidator, noInitialAndFinalWhitespaceValidator, noWhitespaceValidator } from 'src/app/shared/custom-validators';
import { Router } from '@angular/router';
import { HomeService } from '../services/home.service';
import { NotificationService } from '../services/notification.service';
import { MatDatepicker } from '@angular/material/datepicker';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isLogin: boolean = false;
  isRegistration: boolean = true;
  registrationForm: FormGroup;
  submitting = false;
  startDate = new Date(1990, 0, 1);
  @ViewChild('picker') picker: MatDatepicker<Date>;

  constructor(
    private router: Router,
    // private service: HomeService,
    // private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.registrationForm = new FormGroup(
      {
        username: new FormControl(undefined, [
          Validators.required,
          noInitialAndFinalWhitespaceValidator(),
          Validators.maxLength(80),
          noWhitespaceValidator()
        ]),
        password: new FormControl(undefined, [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(80),
          noWhitespaceValidator()
        ]),
        confirmationPassword: new FormControl(undefined, [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(80),
          noWhitespaceValidator()
        ])
      },
      { validators: SamePasswordValidator }
    );
  }

  onRegisterClick() {
    this.isRegistration = true;
  }

  onReturnClick() {
    this.isRegistration = false;
    this.isLogin = false;
  }

  openDatePicker() {
    this.picker.open();
  }

  // submitRegistration() {
  //   this.submitting = true;
  //   this.service
  //     .post('/users', { username: this.registrationForm.value.username, password: this.registrationForm.value.password })
  //     .subscribe(
  //       (result: any) => {
  //         this.notificationService.success('User created successfully');
  //         this.router.navigate(['login']);
  //         this.submitting = false;
  //       },
  //       (error: any) => {
  //         this.notificationService.error(error.error.message || error.error);
  //         this.submitting = false;
  //       }
  //     );
  // }

}
