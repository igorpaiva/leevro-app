import { Injectable } from '@angular/core';
import { BaseService } from '../core/service/base.service';
import { SERVER_ADDRESS, LEEVRO_API } from '../api';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface UserRegistrationDto {
  nickname: string;
  name: string;
  dateOfBirth: string;
  password: string;
  passwordConfirmation: string;
}

export interface UserLoginDto {
  nickname: string;
  password: string;
}

export interface LoginResponseDto {
  sessionId: string;
}

export interface UserCreatedDto {
  nickname: string;
}

@Injectable({
  providedIn: 'root'
})
export class HomeService extends BaseService {
  private GOOGLE_LOGIN_API = SERVER_ADDRESS + '/oauth2/authorization/google';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  
  constructor() {
    super();
  }

  protected override getOptions() {
    return this.httpOptions;
  }

  protected override getServerURL(): string {
    return '/api'; // Using relative URL with proxy
  }

  registerUser(userData: UserRegistrationDto): Observable<UserCreatedDto> {
    const registrationData = {
      nickname: userData.nickname,
      name: userData.name,
      dateOfBirth: userData.dateOfBirth,
      password: userData.password
    };
    return this.http.post<UserCreatedDto>(this.getServerURL() + '/registration', registrationData, this.getOptions());
  }

  loginUser(loginData: UserLoginDto): Observable<LoginResponseDto> {
    return this.http.post<LoginResponseDto>(this.getServerURL() + '/login', loginData, this.getOptions());
  }

  loginWithGoogle() {
    return this.http.get<any>(this.GOOGLE_LOGIN_API);
  }
}
