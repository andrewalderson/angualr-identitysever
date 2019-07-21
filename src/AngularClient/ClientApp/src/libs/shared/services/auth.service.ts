import { Injectable, Inject, Optional } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { UserManager, User } from 'oidc-client';
import { APP_CONFIG, AppConfig } from 'libs/configuration';

@Injectable()
export class AuthService {

    constructor( @Inject(APP_CONFIG) appConfig: AppConfig) {

        this.userManager = new UserManager(
            {
                authority: appConfig.identityUrl,
                client_id: 'angular-client',
                redirect_uri: appConfig.baseUrl + "/signin-callback",
                post_logout_redirect_uri: appConfig.baseUrl  + "/signout-callback",
                response_type: 'id_token token',

                scope: 'openid profile',

                loadUserInfo: true,
                silent_redirect_uri: appConfig.baseUrl  + "/renew-callback-oidc.html",

                automaticSilentRenew: true,

                revokeAccessTokenOnSignout: true,

                filterProtocolClaims: true,

                monitorSession: false
            });

        this.userManager.clearStaleState();

        this.userManager.events.addUserLoaded((user) => {
            this.updateUser(user);
        });

        this.userManager.events.addUserUnloaded(() => {
            this.updateUser();
        });

        this.userManager.events.addUserSignedOut(() => {
            this.updateUser();
        });

        this.userManager.getUser().then(user => {
            if (user) {
                if (user.expired) {
                    this.renewToken();
                } else {
                    this.updateUser(user);
                }
            } else {
                this.updateUser();
            }
        }).catch((err) => {
            console.log(err);
        });
    }

    private userManager: UserManager;

    readonly authenticationChallenge$ = new ReplaySubject<boolean>(1);

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

    signinCallback() {
        this.userManager.signinRedirectCallback();
    }

    signout() {
        this.userManager.signoutRedirect();
    }

    signoutCallback() {
        this.userManager.signoutRedirectCallback();
    }

    renewToken() {
        this.userManager.signinSilent()
            .then((user) => {
                this.updateUser(user);
            })
            .catch(error => {
                console.log(error);
            });
    }

    private updateUser(user: User = null) {
        this._user = user;
        this.authenticationChallenge$.next(user !== null);
    }
}
