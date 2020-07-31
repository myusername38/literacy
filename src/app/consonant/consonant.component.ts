import { Component, OnInit } from '@angular/core';
import { IsolatedConsonantsService } from '../services/isolated-consonants.service';
import { Tile } from '../interfaces/tile';

@Component({
  selector: 'app-consonant-learning',
  templateUrl: 'consonant.component.html',
  styleUrls: ['consonant.component.scss']
})
export class ConsonantComponent implements OnInit {

  displayTiles: Tile[] = [];

  constructor(private isolatedConsonantsService: IsolatedConsonantsService) { }

  ngOnInit() {
    this.displayTiles = this.isolatedConsonantsService.getNextConsonant();
  }

  correct() {
    this.displayTiles = this.isolatedConsonantsService.correct();
    console.log(this.displayTiles);
  }

  incorrect() {
    this.displayTiles = this.isolatedConsonantsService.incorrect();
  }

}
