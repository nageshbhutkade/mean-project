import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { SignupComponent } from './signup/signup.component';
import { FormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../angular-material.module';


@NgModule({
  declarations: [SignupComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    AngularMaterialModule
  ]
})
export class AuthModule { }
