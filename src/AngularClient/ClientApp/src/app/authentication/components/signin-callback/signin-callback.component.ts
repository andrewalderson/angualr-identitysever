import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

import { AuthService } from 'libs/shared';

@Component({
  selector: 'app-signin-callback',
  template: '',
})
export class SigninCallbackComponent implements OnInit {

    constructor(private authService: AuthService, private router: Router) {}

    ngOnInit() {
        this.authService.authenticationChallenge$.subscribe((isAuthenticated) => {
              if (isAuthenticated) {
                  this.router.navigate(['/'], { replaceUrl: true });
              }
            },
            (err) => {
                console.log(err);
            });
        this.authService.signinCallback()
  }

}
