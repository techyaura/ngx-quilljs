import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { QuilljsModule } from '../../projects/quilljs/src/public-api';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    QuilljsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
