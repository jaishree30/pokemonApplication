import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {UserServiceService} from '../../../core/services/user-service.service';
import { Evolution } from '../../../core/interface/evolution.interface';
import { Location } from '@angular/common';


@Component({
  selector: 'app-pokemon-evolution',
  templateUrl: './pokemon-evolution.component.html',
  styleUrls: ['./pokemon-evolution.component.scss']
})
export class PokemonEvolutionComponent implements OnInit {
  selectedPokemonId: any;
  evolutionChain: Evolution[] = [];

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
    this.pokemonService.getPokemonSpecies(name).subscribe(
      (response) => {
        const chainUrl = response.evolution_chain.url;
        this.pokemonService.getPokemonDetails(chainUrl).subscribe(
          (evolutionData) => {
            this.parseEvolutionChain(evolutionData);
          },
          (error) => {
            console.log('Error fetching Pokémon details:', error);
          }
        );
      },
      (error) => {
        console.log('Error fetching Pokémon evolution chain:', error);
      }
    );
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
}
