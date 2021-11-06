import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { NewTaskComponent } from './dialog/task/new-task/new-task.component';
import { FormsModule } from '@angular/forms'
import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { PagesModule } from './pages/pages.module';
import { RouterModule } from '@angular/router';
import { TokenInterceptor } from './interceptor/token.interceptor';
@NgModule({
  declarations: [
    AppComponent,
    NewTaskComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    HttpClientModule,
    MatCardModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    FormsModule,
    DragDropModule,
    NgxSkeletonLoaderModule,
    PagesModule,
    RouterModule
  ],
  providers: [
    TokenInterceptor, { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true, },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
