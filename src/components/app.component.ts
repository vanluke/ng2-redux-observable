import { Component } from '@angular/core';
import { EventEmitter } from 'events';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app',
  template: `<div class="container">
    <h1>Welcoome</h1>
     <nav>
       <a [routerLink]="['/']">Home</a>
       <a [routerLink]="['/about']">About</a>
       <a [routerLink]="['/posts']">Posts</a>
     </nav>
     <router-outlet></router-outlet>
  </div>
`,
})
export class AppComponent {
}
