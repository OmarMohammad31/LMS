import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from './guards/auth.guard';
import { SessionListComponent } from './components/sessions/session-list/session-list.component';
import { SessionCreateComponent } from './components/sessions/session-create/session-create.component';
import { SessionRosterComponent } from './components/sessions/session-roster/session-roster.component';
import { RequestCreateComponent } from './components/tutoring/request-create/request-create.component';
import { RequestListComponent } from './components/tutoring/request-list/request-list.component';
import { MyRequestsComponent } from './components/tutoring/my-requests/my-requests.component';
import { UsersDebugComponent } from './components/admin/users-debug/users-debug.component';
import { SharedModule } from './shared/shared.module';
import { AuthInterceptor } from './interceptors/auth.interceptor';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'sessions', component: SessionListComponent, canActivate: [AuthGuard] },
  { path: 'sessions/new', component: SessionCreateComponent, canActivate: [AuthGuard] },
  { path: 'sessions/:id/roster', component: SessionRosterComponent, canActivate: [AuthGuard] },
  { path: 'tutoring/new', component: RequestCreateComponent, canActivate: [AuthGuard] },
  { path: 'tutoring/open', component: RequestListComponent, canActivate: [AuthGuard] },
  { path: 'tutoring/mine', component: MyRequestsComponent, canActivate: [AuthGuard] },
  { path: 'debug/users', component: UsersDebugComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    SessionListComponent,
    SessionCreateComponent,
    SessionRosterComponent,
    RequestCreateComponent,
    RequestListComponent,
    MyRequestsComponent,
    UsersDebugComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    SharedModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
