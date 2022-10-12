import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app/component/app/app.component';
import { LoginComponent } from './app/component/auth/login/login.component';
import { SignUpComponent } from './app/component/auth/signup/signup.component';
import { CreatePostComponent } from './app/component/post-package/create-post/create-post.component';
import { MainComponent } from './app/component/main/main.component';
import { CreateSubredditComponent } from './app/component/subreddit-package/create-subreddit/create-subreddit.component';
import { ListSubredditComponent } from './app/component/subreddit-package/list-subreddit/list-subreddit.component';
import { ViewPostComponent } from './app/component/post-package/view-post/view-post.component';
import { UserProfileComponent } from './app/component/user-profile/user-profile.component';

const routes: Routes = [
  { path: '', component: MainComponent},
  { path: 'login', component: LoginComponent},
  { path: 'signUp', component: SignUpComponent},
  { path: 'create-post', component: CreatePostComponent},
  { path: 'create-subreddit', component: CreateSubredditComponent},
  { path: 'list-subreddits', component: ListSubredditComponent},
  { path: 'view-post/:id', component: ViewPostComponent},
  { path: 'user-profile/:username', component: UserProfileComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
