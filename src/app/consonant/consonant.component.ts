import { Component, OnInit } from '@angular/core';
import { Consonant } from '../interfaces/consonant';
import { IsolatedConsonantsService } from '../services/isolated-consonants.service';
import { Tile } from '../interfaces/tile';

@Component({
  selector: 'app-learning',
  templateUrl: './consonant.component.html',
  styleUrls: ['./consonant.component.scss']
})
export class ConsonantComponent implements OnInit {

  displayTiles: Tile[] = [];

  constructor(private isolatedConsonantsService: IsolatedConsonantsService) { }

  ngOnInit() {
    this.displayTiles = this.isolatedConsonantsService.getConsonant();
  }

  correct() {
    this.displayTiles = this.isolatedConsonantsService.correct();
    console.log(this.displayTiles);
  }

  incorrect() {
    this.displayTiles = this.isolatedConsonantsService.incorrect();
  }

}
