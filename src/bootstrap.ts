import { AppComponent } from './components/app.component';
import { NgModule } from '@angular/core';
import { AboutComponent } from './components/about.component';
import { PostsComponent } from './posts/posts.component';
import { PostComponent } from './posts/post.component';
import createStore from './store/store';
import {
  HttpModule,
  JsonpModule,
 } from '@angular/http';
import {
  platformBrowserDynamic,
} from '@angular/platform-browser-dynamic';
import {
  BrowserModule,
} from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

const appStoreFactory = () => {
  return createStore();
};


@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot([{
      path: 'about',
      component: AboutComponent,
    }, {
      path: 'posts',
      component: PostsComponent,
    }]),
    HttpModule,
    JsonpModule,
  ],
  declarations: [
    AppComponent,
    PostComponent,
    AboutComponent,
    PostsComponent,
  ],
  providers: [
    { provide: 'store', useFactory: appStoreFactory },
  ],
  bootstrap: [AppComponent]
})
class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);
