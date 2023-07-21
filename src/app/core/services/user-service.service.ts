import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import {  map } from 'rxjs/operators';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  private apiUrl: string = environment.apiUrl;
  constructor(private http: HttpClient) {
  }

  getPokemons(offset: number, limit: number): Observable<any> {
    const url = `${this.apiUrl + 'pokemon'}?offset=${offset}&limit=${limit}`;
    return this.http.get<any>(url);
  }

  getAllPokemonImages(imageUrls: string[]): Observable<any[]> {
    const imageRequests: Observable<any>[] = imageUrls.map((imageUrl) => this.http.get<any>(imageUrl));

    return forkJoin(imageRequests).pipe(
      map((responses: any[]) => {
        return responses.map((response: any) => response || '');
      })
    );
  }

  getPokemonSpecies(nameOrId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}pokemon-species/${nameOrId}/`);
  }

  getPokemonDetails(url: string): Observable<any> {
    return this.http.get<any>(url);
  }

  getEvolutionChain(url: string): Observable<any> {
    return this.http.get<any>(url);
  }
}

