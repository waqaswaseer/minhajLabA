import {NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import {MatButtonModule} from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { MatCarouselModule } from '@ngmodule/material-carousel';
import { SignUpComponent } from './sign-up/sign-up.component';
import {MatDialogModule} from "@angular/material/dialog";
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import { AvailibeTestsComponent } from './availibe-tests/availibe-tests.component';
import { SigninComponent } from './signin/signin.component';
import { BookLabTestComponent } from './book-lab-test/book-lab-test.component';
import { FooterComponent } from './footer/footer.component';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    SignUpComponent,
    AvailibeTestsComponent,
    SigninComponent,
    BookLabTestComponent,
    FooterComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCarouselModule.forRoot(),
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatSelectModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    NgxMatFileInputModule
  ],
  entryComponents:[
    SignUpComponent
  ],
  providers: [],
  bootstrap: [AppComponent],

})
export class AppModule { }
