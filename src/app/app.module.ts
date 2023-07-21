import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {CommonModule} from './core/modules/common.module';
import { PokemonContentComponent } from './core/components/pokemon-content/pokemon-content.component';
import { PokemonEvolutionComponent } from './core/components/pokemon-evolution/pokemon-evolution.component'; 
import { PaginationComponent } from './core/components/pagination/pagination.component';
import { PictureGridViewComponent } from './core/components/picture-grid-view/picture-grid-view.component';
import { PictureDetailsComponent } from './core/components/picture-details/picture-details.component'; 

@NgModule({
  declarations: [
    AppComponent,
    PaginationComponent,
    PokemonContentComponent,
    PokemonEvolutionComponent,
    PictureGridViewComponent,
    PictureDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule
   
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
