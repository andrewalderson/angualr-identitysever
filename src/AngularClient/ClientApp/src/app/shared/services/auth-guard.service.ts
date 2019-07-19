import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router, Route, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import 'rxjs/add/operator/first'
import 'rxjs/add/operator/do'

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate, CanLoad {

    constructor(private authService: AuthService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.isAuthenticated();
    }

    canLoad(route: Route) {
        return this.isAuthenticated();
    }

    private isAuthenticated() {
        return this.authService.authenticationChallenge$
            .first()
            .do((authenticated) => {
                if (!authenticated) {
                    this.authService.signin();
                }
            });
    }
}
