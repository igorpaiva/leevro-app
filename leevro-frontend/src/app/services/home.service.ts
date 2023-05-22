import { Injectable } from '@angular/core';
import { BaseService } from '../core/service/base.service';

@Injectable({
  providedIn: 'root'
})
export class HomeService extends BaseService {
  constructor() {
    super();
  }

  protected override getOptions() {
    return undefined;
  }

  protected override getServerURL(): string {
    return 'http://localhost:8080/api';
  }
}
