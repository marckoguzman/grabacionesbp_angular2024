import { Component } from '@angular/core';
import { signOut } from 'aws-amplify/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public async salga() {
    try {
       await signOut();
    } catch (error) {
      console.log('error signing out: ', error);
    }
  }
}
