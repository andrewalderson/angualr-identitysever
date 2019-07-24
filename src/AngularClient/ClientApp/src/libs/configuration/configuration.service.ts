import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AppConfig } from './app.config';
import { BASE_URL } from './tokens';

@Injectable()
export class ConfigurationService {

  static readonly endpoint = '/configuration';

  private clientConfigurationUrl: string;

  constructor(@Inject(BASE_URL) baseUrl: string, private http: HttpClient) {
    this.clientConfigurationUrl = `${baseUrl.replace(/\/$/, '')}${ConfigurationService.endpoint}`;
  }

    private _config: AppConfig;

    get config(): AppConfig {
        return this._config;
    }

    load() {
        return new Promise((resolve, reject) => {
          this.http.get<AppConfig>(this.clientConfigurationUrl)
                .subscribe((data) => {
                    this._config = data;
                    resolve();
                },
                (err) => {
                    console.log(err);
                    reject();
                });
        });
    }

}
