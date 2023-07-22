import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {UserServiceService} from '../../../core/services/user-service.service';
import { Evolution } from '../../../core/interface/evolution.interface';
import { Location } from '@angular/common';
import { Subscription, switchMap } from 'rxjs';


@Component({
  selector: 'app-pokemon-evolution',
  templateUrl: './pokemon-evolution.component.html',
  styleUrls: ['./pokemon-evolution.component.scss']
})
export class PokemonEvolutionComponent implements OnInit {
  selectedPokemonId: any;
  evolutionChain: Evolution[] = [];
  private pokemonEvolutionSubscription: Subscription | undefined;

  constructor(private route: ActivatedRoute, private pokemonService: UserServiceService,private location: Location) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.selectedPokemonId = params['id'];
      this.getPokemonEvolutionChain(this.selectedPokemonId);
    });
  }
  goBack(): void {
    this.location.back();
  }
  lastPokemon(evolution: any): boolean {
    return this.evolutionChain.indexOf(evolution) === this.evolutionChain.length - 1;
  }

  getPokemonEvolutionChain(name: string): void {
    this.pokemonEvolutionSubscription =   this.pokemonService.getPokemonSpecies(name).pipe(
      switchMap(
        (response: any) => {
          const chainUrl = response.evolution_chain.url;
          return this.pokemonService.getPokemonDetails(chainUrl)
        })
    ).subscribe({
      next: (evolutionData) => {
        this.parseEvolutionChain(evolutionData);
      },
      error: (error) => {
        console.error('Error fetching Pokémon data:', error);
      },
    })
  }
  

  parseEvolutionChain(evolutionData: any): void {
    this.evolutionChain = [];
    // Extract the evolution chain data
    const chain = evolutionData.chain;
    this.parseChainRecursive(chain);
  }

  parseChainRecursive(chain: any): void {
    let level = chain.evolution_details.length>0?chain.evolution_details[0].min_level:0;
    this.evolutionChain.push({
      id: chain.species.url.split('/')[6],
      name: chain.species.name,
      level: level,
    });

    if (chain.evolves_to.length > 0) {
      this.parseChainRecursive(chain.evolves_to[0]);
    }
  }
  ngOnDestroy() {
    if (this.pokemonEvolutionSubscription) {
      this.pokemonEvolutionSubscription.unsubscribe();
    }
  }

}
