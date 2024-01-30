import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule }from "@angular/material/card"
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
	exports:[
		MatInputModule,
		MatFormFieldModule,
		MatButtonModule,
		MatIconModule,
		MatToolbarModule,
		MatCardModule,
		MatSnackBarModule,
		MatPaginatorModule,
		MatProgressSpinnerModule
	]
})
export class MaterialModule { }
