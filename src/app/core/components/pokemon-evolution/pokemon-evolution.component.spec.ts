import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonEvolutionComponent } from './pokemon-evolution.component';

describe('PokemonEvolutionComponent', () => {
  let component: PokemonEvolutionComponent;
  let fixture: ComponentFixture<PokemonEvolutionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PokemonEvolutionComponent]
    });
    fixture = TestBed.createComponent(PokemonEvolutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
