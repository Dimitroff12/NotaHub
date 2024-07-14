import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JournalPage } from './journal.page';

const routes: Routes = [
  {
    path: '',
    component: JournalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JournalPageRoutingModule {}
