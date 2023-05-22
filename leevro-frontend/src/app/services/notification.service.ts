import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(private service: ToastrService) {}

  success(message: string) {
    this.service.success(message, 'Success');
  }

  error(message: string) {
    this.service.error(message, 'Error');
  }

  warning(message: string) {
    this.service.warning(message, 'Warning');
  }

  warningWithTitleAndTimeout(title: string, message: string, timeout: number) {
    this.service.warning(message, title, { timeOut: timeout });
  }
}
