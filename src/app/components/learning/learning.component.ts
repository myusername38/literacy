import { Component, OnInit } from '@angular/core';
import { Vowel } from '../../interfaces/vowel';
import { IsolatedVowelsService } from '../../services/isolated-vowels.service';
import { Tile } from '../../interfaces/tile';

@Component({
  selector: 'app-learning',
  templateUrl: './learning.component.html',
  styleUrls: ['./learning.component.scss']
})
export class LearningComponent implements OnInit {

  displayTiles: Tile[] = [];

  constructor(private isolatedVowelsService: IsolatedVowelsService) { }

  ngOnInit() {
    this.displayTiles = this.isolatedVowelsService.getVowel();
  }

  correct() {
    this.displayTiles = this.isolatedVowelsService.correct();
    console.log(this.displayTiles);
  }

  incorrect() {
    this.displayTiles = this.isolatedVowelsService.incorrect();
  }

}
