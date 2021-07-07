import { NgModule } from '@angular/core';

/* Angular material modules used in the project */

import { MatButtonModule } from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
@NgModule({
  imports: [MatButtonModule,MatTableModule,MatPaginatorModule,MatSortModule,MatFormFieldModule,MatInputModule,MatIconModule,MatSelectModule],
  exports: [MatButtonModule,MatTableModule,MatPaginatorModule,MatSortModule,MatFormFieldModule,MatInputModule,MatIconModule,MatSelectModule],
})
export class AppMaterialModule {}