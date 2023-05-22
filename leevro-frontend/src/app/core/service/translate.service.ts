import { Injectable } from '@angular/core';
import { Lang } from '../constants';

import { TranslateService as NgxTranslateService } from '@ngx-translate/core'

@Injectable()
export class TranslateService {
  constructor(private translate: NgxTranslateService) {}

  public setLang(lang: any = null): void {
    lang = lang ? lang : localStorage.getItem('lang');
    if (!lang) {
      lang = Lang.EN;
    }

    this.translate.use(lang);
    this.saveLang(lang);
  }

  public getLang() {
    const lang = localStorage.getItem(Lang.LANG);

    if (lang) {
      return lang;
    }
    return Lang.EN;
  }

  protected saveLang(lang: any): void {
    localStorage.setItem(Lang.LANG, String(lang));
  }
}
