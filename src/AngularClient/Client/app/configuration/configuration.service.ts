import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { AppConfig } from './app.config';

@Injectable()
export class ConfigurationService {

    private static url = '/configuration';

    constructor(private http: HttpClient) { }

    private _config: AppConfig;

    get config(): AppConfig {
        return this._config;
    }

    load() {
        return new Promise((resolve, reject) => {
            this.http.get<AppConfig>(ConfigurationService.url)
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
