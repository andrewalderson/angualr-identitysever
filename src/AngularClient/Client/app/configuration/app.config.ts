import { InjectionToken } from '@angular/core';

export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');

export interface AppConfig {
    readonly baseUrl: string;
    readonly identityUrl: string;
}