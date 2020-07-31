import { Component, OnInit } from '@angular/core';
import { IsolatedVowelsService } from '../../services/isolated-vowels.service';
import { IsolatedConsonantsService } from '../../services/isolated-consonants.service';
import { Tile } from '../../interfaces/tile';

@Component({
  selector: 'app-learning',
  templateUrl: './learning.component.html',
  styleUrls: ['./learning.component.scss']
})
export class LearningComponent implements OnInit {

  displayTiles: Tile[] = [];

  constructor(private isolatedVowelsService: IsolatedConsonantsService) { }

  ngOnInit() {
    this.displayTiles = this.isolatedVowelsService.showConsonant();
    console.log(this.displayTiles);
    console.log(this.displayTiles[0].color);
  }

  correct() {
    this.displayTiles = this.isolatedVowelsService.correct();
    console.log(this.displayTiles);
  }

  incorrect() {
    this.displayTiles = this.isolatedVowelsService.incorrect();
  }

}
