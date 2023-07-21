import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-pokemon-content',
  templateUrl: './pokemon-content.component.html',
  styleUrls: ['./pokemon-content.component.scss']
})
export class PokemonContentComponent {
@Input() content : any;

constructor(private location: Location){

}
goBack(): void {
  this.location.back();
}
}
