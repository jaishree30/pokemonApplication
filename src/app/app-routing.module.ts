import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PictureGridViewComponent } from './core/components/picture-grid-view/picture-grid-view.component';
import { PictureDetailsComponent } from './core/components/picture-details/picture-details.component'; 


const routes: Routes = [
  { path: '', redirectTo: '/images', pathMatch: 'full' },
  { path: 'images', component: PictureGridViewComponent },
  { path: 'image/:id', component: PictureDetailsComponent }, // Add the route for the picture-details component
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
