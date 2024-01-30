import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router'; 
import { HttpClientModule } from '@angular/common/http';
import {provideClientHydration} from '@angular/platform-browser';

import { FileUploadService } from '@services/file-upload.service';
import { AuthService } from '@services/auth.service';
import { DashboardPageComponent } from '@components/dashboard-page/dashboard-page.component';
import { LoginPageComponent } from '@components/login-page/login-page.component';
import { AppRoutingModule } from './app-routing.module'; 
import { routes } from './app.routes'; 
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { SharedService } from './services/shared.service';
import { FileUploadComponent } from './components/shared/file-upload/file-upload.component';

@NgModule({
  imports: [
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes), 
    AppRoutingModule,
    MaterialModule,
  ],
  declarations: [
    AppComponent,
    LoginPageComponent,
    FileUploadComponent,
    DashboardPageComponent
  ],
  providers: [ AuthService, FileUploadService, SharedService ],
  bootstrap: [ AppComponent ],
  schemas:[ CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
