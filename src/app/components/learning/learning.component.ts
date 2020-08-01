import { Component, OnInit } from '@angular/core';
import { Vowel } from '../../interfaces/vowel';
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

  constructor(private isolatedVowelsService: IsolatedVowelsService, private isolatedConsonantsService: IsolatedConsonantsService) { }

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
