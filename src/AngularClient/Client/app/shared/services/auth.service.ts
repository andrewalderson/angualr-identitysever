import { Injectable, Inject, Optional } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';
import { UserManager, User } from 'oidc-client';
import { APP_CONFIG, AppConfig } from 'configuration';

@Injectable()
export class AuthService {

    constructor( @Inject(APP_CONFIG) appConfig: AppConfig) {

        this.userManager = new UserManager(
            {
                authority: appConfig.identityUrl,
                client_id: 'angular-client',
                redirect_uri: appConfig.baseUrl + "/signin-callback-oidc.html",
                post_logout_redirect_uri: appConfig.baseUrl  + "/signout-callback-oidc.html",
                response_type: 'id_token token',

                scope: 'openid profile',

                loadUserInfo: true,
                silent_redirect_uri: appConfig.baseUrl  + "/renew-callback-oidc.html",

                automaticSilentRenew: true,

                revokeAccessTokenOnSignout: true,

                filterProtocolClaims: true
            });

        this.userManager.getUser().then(user => {
            this._user = user;
            this.authenticationChallenge$.next(user !== null);
        }).catch((err) => {
            console.log(err);
        });
    }

    private userManager: UserManager;

    readonly authenticationChallenge$ = new Subject<boolean>();

    private _user: User;

    get user(): User {
        return this._user;
    }

    get accessToken(): string {
        return this.user!.access_token;
    }

    signin() {
        this.userManager.signinRedirect();
    }

    signout() {
        this.userManager.signoutRedirect();
    }
}
