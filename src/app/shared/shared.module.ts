// General Modules
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// Flex-Layout
import { FlexLayoutModule } from '@angular/flex-layout';
// Material Module set
import { MaterialModule } from './material.module';
import { StoreModule } from '@ngrx/store';

@NgModule({
  declarations: [],
  imports: [
    // General Modules
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    // Flex-Layout
    FlexLayoutModule,
    // Material Module set
    MaterialModule,
    // NGRX set
    StoreModule/* .forRoot(reducers, { metaReducers }) */
  ],
  exports: [
    // General Modules
    FormsModule,
    ReactiveFormsModule,
    // Flex-Layout
    FlexLayoutModule,
    // Material Module set
    MaterialModule,
    // NGRX set
    StoreModule/* .forRoot(reducers, { metaReducers }) */
  ]
})
export class SharedModule { }
