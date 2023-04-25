import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WriteMarkComponent } from './write-mark.component';

const routes: Routes = [{ path: '', component: WriteMarkComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WriteMarkRoutingModule { }
