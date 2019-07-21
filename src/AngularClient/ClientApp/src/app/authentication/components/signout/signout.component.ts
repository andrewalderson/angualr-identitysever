import { Component } from '@angular/core';

import { AuthService } from 'libs/shared';

@Component({
  selector: 'signout',
  templateUrl: './signout.component.html',
  styleUrls: ['./signout.component.scss']
})
export class SignoutComponent {

    constructor(private authService: AuthService) { }

    signout() {
        this.authService.signout();
    }

}
