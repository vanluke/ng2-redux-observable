import { Component } from '@angular/core';
import { EventEmitter } from 'events';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import './_app.scss';

@Component({
  selector: 'app',
  template: `<div class="c-app">
    <h1 class="c-app__header c-app__header--main"></h1>
     <nav class="c-app__nav">
       <a [routerLink]="['/']" class="c-app__link">Home</a>
       <a [routerLink]="['/about']" class="c-app__link">About</a>
       <a [routerLink]="['/posts']" class="c-app__link">Posts</a>
     </nav>
    <router-outlet></router-outlet>
  </div>
`,
})
export class AppComponent {
}
