import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { UserServiceService } from '../../../core/services/user-service.service';
import { Subscription, switchMap } from 'rxjs';

@Component({
  selector: 'app-picture-grid-view',
  templateUrl: './picture-grid-view.component.html',
  styleUrls: ['./picture-grid-view.component.scss']
})
export class PictureGridViewComponent implements OnInit {
  allPokemonData: any[] = [];
  pokemonData = [];
  itemsPerPage = 12;
  totalCount: number;
  currentPage = 0;
  pageSizeOptions: number[] = [6, 12, 24];
  private pokemonSubscription: Subscription | undefined;

  constructor(private userService: UserServiceService, private router: Router) {

  }
  ngOnInit() {
    this.getImageData();

  }
  getImageData() {
    let pokemonData: any[];
    this.totalCount = 0;
    const offset = this.currentPage * this.itemsPerPage;
    this.pokemonSubscription = this.userService.getPokemons(offset, this.itemsPerPage).pipe(
      switchMap(
        (response: any) => {
          pokemonData = response.results;
          this.totalCount = response.count;
          const imageUrls: any[] = pokemonData.map((pokemon: any) => pokemon.url);
          return this.userService.getAllPokemonImages(imageUrls);
        })
    ).subscribe({
      next: (images: string[]) => {
        // Combine Pokemon data with the corresponding images
        this.allPokemonData = pokemonData.map((pokemon: any, index: number) => {
          return { ...pokemon, imageURL: images[index] };
        });
      },
      error: (error) => {
        console.error('Error fetching Pokémon data:', error);
      },
    })
  }
  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.itemsPerPage = event.pageSize;
    this.getImageData();
  }
  sendDataToReceiver(data: any) {
    this.router.navigate(['/image', data.id], { state: data });
  }

  ngOnDestroy() {
    if (this.pokemonSubscription) {
      this.pokemonSubscription.unsubscribe();
    }
  }

}