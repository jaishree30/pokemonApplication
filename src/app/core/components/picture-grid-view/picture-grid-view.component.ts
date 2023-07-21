import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { UserServiceService } from '../../../core/services/user-service.service';

@Component({
  selector: 'app-picture-grid-view',
  templateUrl: './picture-grid-view.component.html',
  styleUrls: ['./picture-grid-view.component.scss']
})
export class PictureGridViewComponent implements OnInit {
  allPokemonData: any[] = [];
  pokemonData = [];
  itemsPerPage = 20;
  totalCount: number;
  currentPage = 0;
  pageSizeOptions: number[] = [6, 12, 24];

  constructor(private userService: UserServiceService, private router: Router) {

  }
  ngOnInit() {
    this.getImageData();
    
  }
  getImageData() {
    this.totalCount = 0;
    const offset = this.currentPage * this.itemsPerPage;
    this.userService.getPokemons(offset, this.itemsPerPage).subscribe(
      (response: any) => {
        this.totalCount = response.count;
        const imageUrls: any[] = response.results.map((pokemon: any) => pokemon.url);
        this.userService.getAllPokemonImages(imageUrls).subscribe(
          (images: any[]) => {
            this.allPokemonData = response.results.map((pokemon: any, index: number) => {
              return { ...pokemon, imageURL: images[index] };
            });
          },
          (error) => {
            console.error('Error fetching Pokémon images:', error);
          }
        );
      },
      (error) => {
        console.error('Error fetching Pokémon data:', error);
      }
    );
  }
  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.itemsPerPage = event.pageSize;
    this.getImageData();
  }
  sendDataToReceiver(data: any) {
    this.router.navigate(['/image', data.id], { state: data });
  }

}