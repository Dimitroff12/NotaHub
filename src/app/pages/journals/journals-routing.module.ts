import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JournalsPage } from './journals.page';

const routes: Routes = [
  {
    path: '',
    component: JournalsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JournalsPageRoutingModule {}
