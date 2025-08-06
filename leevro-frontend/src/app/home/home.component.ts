import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SamePasswordValidator, noInitialAndFinalWhitespaceValidator, noWhitespaceValidator } from 'src/app/shared/custom-validators';
import { Router } from '@angular/router';
import { HomeService, UserRegistrationDto, UserLoginDto } from '../services/home.service';
import { NotificationService } from '../services/notification.service';
import { MatDatepicker } from '@angular/material/datepicker';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isLogin: boolean = false;
  isRegistration: boolean = false;
  registrationForm: FormGroup;
  loginForm: FormGroup;
  submitting = false;
  startDate = new Date(1990, 0, 1);
  @ViewChild('picker') picker: MatDatepicker<Date>;

  constructor(
    private router: Router,
    private service: HomeService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.createRegistrationForm();
    this.createLoginForm();
  }

  createRegistrationForm() {
    this.registrationForm = new FormGroup(
      {
        nickname: new FormControl(undefined, [
          Validators.required,
          noInitialAndFinalWhitespaceValidator(),
          Validators.maxLength(32),
          noWhitespaceValidator()
        ]),
        password: new FormControl(undefined, [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(80),
          noWhitespaceValidator()
        ]),
        passwordConfirmation: new FormControl(undefined, [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(80),
          noWhitespaceValidator()
        ]),
        dateOfBirth: new FormControl(undefined, [
          Validators.required
        ]),
        name: new FormControl(undefined, [
          Validators.required,
          Validators.maxLength(64),
          noWhitespaceValidator()
        ])
      },
      { validators: SamePasswordValidator }
    );
  }

  createLoginForm() {
    this.loginForm = new FormGroup({
      nickname: new FormControl(undefined, [
        Validators.required,
        noInitialAndFinalWhitespaceValidator(),
        Validators.maxLength(32),
        noWhitespaceValidator()
      ]),
      password: new FormControl(undefined, [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(80),
        noWhitespaceValidator()
      ])
    });
  }

  onLoginClick() {
    this.isLogin = true;
  }

  onRegisterClick() {
    this.isRegistration = true;
  }

  onReturnClick() {
    this.isRegistration = false;
    this.isLogin = false;
  }

  onGoogleLoginClick() {
    this.service.loginWithGoogle().subscribe(
      response => {
        // Handle the response if needed
      },
      error => {
        // Handle any errors that occurred during the request
        console.error(error);
      }
    );
  }

  openDatePicker() {
    this.picker.open();
  }

  submitRegistration() {
    if (this.registrationForm.valid && !this.submitting) {
      this.submitting = true;
      
      const formValue = this.registrationForm.value;
      const userData: UserRegistrationDto = {
        nickname: formValue.nickname,
        name: formValue.name,
        dateOfBirth: formValue.dateOfBirth.toISOString().split('T')[0], // Convert to YYYY-MM-DD format
        password: formValue.password,
        passwordConfirmation: formValue.passwordConfirmation
      };

      this.service.registerUser(userData).subscribe({
        next: (response) => {
          this.notificationService.success(`User ${response.nickname} created successfully! Welcome to Leevro!`);
          // Store the nickname after successful registration
          sessionStorage.setItem('userNickname', response.nickname);
          // Navigate to dashboard after successful registration
          this.router.navigate(['/dashboard']);
          this.submitting = false;
        },
        error: (error) => {
          console.error('Registration error:', error);
          this.notificationService.error(error.error?.message || 'Registration failed. Please try again.');
          this.submitting = false;
        }
      });
    } else {
      this.notificationService.error('Please fill all required fields correctly.');
    }
  }

  submitLogin() {
    if (this.loginForm.valid && !this.submitting) {
      this.submitting = true;
      
      const loginData: UserLoginDto = {
        nickname: this.loginForm.value.nickname,
        password: this.loginForm.value.password
      };

      this.service.loginUser(loginData).subscribe({
        next: (response) => {
          this.notificationService.success('Login successful! Welcome back!');
          // Store session ID and user nickname
          if (response.sessionId) {
            sessionStorage.setItem('sessionId', response.sessionId);
          }
          // Store the nickname from the form since login was successful
          sessionStorage.setItem('userNickname', loginData.nickname);
          
          // Reset form states and navigate to dashboard
          this.isLogin = false;
          this.isRegistration = false;
          this.submitting = false;
          
          // Navigate to dashboard
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          console.error('Login error:', error);
          this.notificationService.error('Invalid credentials. Please try again.');
          this.submitting = false;
        }
      });
    } else {
      this.notificationService.error('Please fill all required fields correctly.');
    }
  }

}
