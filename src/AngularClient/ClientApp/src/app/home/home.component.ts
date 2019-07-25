import { Component } from '@angular/core';
import { AuthService } from 'libs/shared';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(private authService: AuthService) { }

  signout() {
    this.authService.signout();
  }

}
