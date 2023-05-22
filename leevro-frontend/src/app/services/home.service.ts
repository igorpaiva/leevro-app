import { Injectable } from '@angular/core';
import { BaseService } from '../core/service/base.service';
import { SERVER_ADDRESS, LEEVRO_API } from '../api';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HomeService extends BaseService {
  private HOME_API = LEEVRO_API.API_CONTEXT_PATH + '/home';
  private GOOGLE_LOGIN_API = SERVER_ADDRESS + '/oauth2/authorization/google';
  private httpOptions = {
    headers: new HttpHeaders({

    })
  };
  constructor() {
    super();
  }

  protected override getOptions() {
    return undefined;
  }

  protected override getServerURL(): string {
    return 'http://localhost:8080/api';
  }

  loginWithGoogle() {
    return this.http.get<any>(this.GOOGLE_LOGIN_API);
  }
}
