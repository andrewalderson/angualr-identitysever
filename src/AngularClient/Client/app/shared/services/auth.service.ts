import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';
import { UserManager, User } from 'oidc-client';

// TODO (Andrew Alderson July 12, 2017) move these settings to a config service
const settings: object = {
    authority: 'http://localhost:5001',
    client_id: 'angular-client',
    redirect_uri: window.location.origin + "/signin-callback-oidc.html",
    post_logout_redirect_uri: window.location.origin + "/signout-callback-oidc.html",
    response_type: 'id_token token',

    scope: 'openid profile',

    loadUserInfo: true,
    silent_redirect_uri: window.location.origin + "/renew-callback-oidc.html",

    automaticSilentRenew: true,

    revokeAccessTokenOnSignout: true,

    filterProtocolClaims: true
}

@Injectable()
export class AuthService {

    private userManager: UserManager;

    readonly authenticationChallenge$ = new Subject<boolean>();

    constructor() {
        // TODO (Andrew Alderson July 12, 2017) we should inject a factory that returns a configured UserManager.
        this.userManager = new UserManager(settings);

        this.userManager.getUser().then(user => {
            this._user = user;
            this.authenticationChallenge$.next(user !== null);
        }).catch((err) => {
            console.log(err);
        });
    }

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
