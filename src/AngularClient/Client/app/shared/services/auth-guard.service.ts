import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router, Route, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuardService implements CanActivate, CanLoad {

    constructor(private authService: AuthService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.isAuthenticated();
    }

    canLoad(route: Route): Observable<boolean> {
        return this.isAuthenticated();
    }

    private isAuthenticated(): Observable<boolean> {
        let isAuthenticated = this.authService.authenticationChallenge$;
        isAuthenticated.subscribe(authenticated => {
            if (!authenticated) {
                this.authService.signin();
            }
        });
        return isAuthenticated;
    }
}
