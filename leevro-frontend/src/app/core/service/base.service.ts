import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { TranslateService } from './translate.service';
import { Observable } from 'rxjs';
import { AppInjector } from '../util/app.injector';

export abstract class BaseService {
  /**
   * Client for the HTTP operations.
   */
  protected http: HttpClient = AppInjector.get(HttpClient);

  /**
   * Service to translate messages.
   */
  protected translateService: TranslateService = AppInjector.get(TranslateService);

  /**
   * HTTP Method GET.
   *
   * @param url - The API resource endpoint
   * @param params - The url HTTP params to go in the endpoint
   * @returns The response of the HTTP call
   */
  get(url: string, customOptions: any = undefined): Observable<object> {
    return this.http.get(this.getServerURL() + url, customOptions ? customOptions : this.getOptions());
  }

  /**
   * HTTP Method POST.
   *
   * @param url - The API resource endpoint
   * @param body - The object to be sent
   * @returns The response of the HTTP call
   */
  post(url: string, body: object = {}, customOptions: any = undefined) {
    return this.http.post(this.getServerURL() + url, body, customOptions ? customOptions : this.getOptions());
  }

  /**
   * HTTP Method PUT.
   *
   * @param url - The API resource endpoint
   * @param body - The object to be sent
   * @returns The response of the HTTP call
   */
  put(url: string, body: object = {}): Observable<object> {
    return this.http.put(this.getServerURL() + url, body, this.getOptions());
  }

  /**
   * HTTP Method PATCH.
   *
   * @param url - The API resource endpoint
   * @param body - The object to be sent
   * @returns The response of the HTTP call
   */
  patch(url: string, body: object = {}): Observable<object> {
    return this.http.patch(this.getServerURL() + url, body, this.getOptions());
  }

  /**
   * HTTP Method DELETE.
   *
   * @param url - The API resource endpoint
   * @returns The response of the HTTP call
   */
  delete(url: string) {
    return this.http.delete(this.getServerURL() + url, this.getOptions());
  }

  /**
   * Executes before the request.
   *
   * @param httpHeaders - The HTTP headers to be customized by the child
   */
  protected customHeaders(httpHeaders: HttpHeaders): void {}

  /**
   * Gets the default headers to request the server.
   *
   * @returns - The HTTP Headers object created
   */
  protected getHeaders() {
    let storageHeader: any = sessionStorage.getItem('token') ? sessionStorage.getItem('token') : '';
    return { Authorization: storageHeader };
  }

  protected getOptions(): any {
    return { headers: this.getHeaders() };
  }

  protected getServerURL(): string {
    return '';
  }

  getParams(): HttpParams | null {
    return null;
  }
}
