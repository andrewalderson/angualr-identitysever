import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent{

    constructor(private router: Router) { }

  signin() {
      this.router.navigate(['/'], { replaceUrl: true });
  }
}
