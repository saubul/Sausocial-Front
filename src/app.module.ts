import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app/component/app/app.component';
import { NavigationComponent } from './app/component/navigation/navigation.component';
import { MainComponent } from './app/component/main/main.component';
import { LoginComponent } from './app/component/auth/login/login.component';
import { SignUpComponent } from './app/component/auth/signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {  NgxWebstorageModule } from 'ngx-webstorage';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TokenInterceptor } from './app/token-interceptor';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SubredditSideBarComponent } from './app/component/subreddit-package/subreddit-side-bar/subreddit-side-bar.component';
import { CreatePostComponent } from './app/component/post-package/create-post/create-post.component';
import { SideBarComponent } from './app/component/side-bar/side-bar.component';
import { CreateSubredditComponent } from './app/component/subreddit-package/create-subreddit/create-subreddit.component';
import { PostListComponent } from './app/component/post-package/post-list/post-list.component';
import { ListSubredditComponent } from './app/component/subreddit-package/list-subreddit/list-subreddit.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import { ViewPostComponent } from './app/component/post-package/view-post/view-post.component';
import { UserProfileComponent } from './app/component/user-profile/user-profile.component';
import { FilterPostsComponent } from './app/component/post-package/filter-posts/filter-posts.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatFormField, MatFormFieldModule, MatInputModule, MatNativeDateModule } from '@angular/material';


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    MainComponent,
    LoginComponent,
    SignUpComponent,
    PostListComponent,
    SubredditSideBarComponent,
    CreateSubredditComponent,
    CreatePostComponent,
    SideBarComponent,
    ListSubredditComponent,
    ViewPostComponent,
    UserProfileComponent,
    FilterPostsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxWebstorageModule.forRoot(),
    BrowserAnimationsModule,
    FontAwesomeModule,
    EditorModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule
  ],
  exports: [
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
