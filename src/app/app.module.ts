/**
 * Import Modules
 */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import { NgbModule, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app.routing';

/**
 * Services
 */

import { JwtService } from './infrastructure/jwt.service';
import { MainService } from './infrastructure/api.service';
import { AuthGuardService } from './infrastructure/auth-guard.service';
import { MsgHandelService } from './shared/services/msg-handel.service';
import { AuthService } from './services/authentication.service';
import { JwtTokenValidatorService } from './shared/services/jwt-token-validator.service';
import { LocalStorageHandleService } from './shared/services/local-storage-handle.service';

/**
 * Import Components
 */
import { AppComponent } from './app.component';
import { LayoutComponent } from './shared/layouts/layout.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LayoutComponent,
    FooterComponent,
    NavbarComponent,
    SignupComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NgbModule,
    NgbDatepickerModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    BrowserAnimationsModule,
  ],
  providers: [
    AuthService,
    JwtService,
    MainService,
    AuthGuardService,
    MsgHandelService,
    JwtTokenValidatorService,
    LocalStorageHandleService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
