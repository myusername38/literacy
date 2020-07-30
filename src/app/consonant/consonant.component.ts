import { Component, OnInit } from '@angular/core';
import { Consonant } from '../interfaces/consonant';

@Component({
  selector: 'app-learning',
  templateUrl: 'consonant.component.html',
  styleUrls: ['consonant.component.scss']
})
export class ConsonantComponent implements OnInit {

  timesCorrect = 2; // number to hit for the consonant to be correct for the session

  incorrectConsonants: Consonant[] = null;
  consonantGroup = 1;
  displayConsonant: Consonant = null;
  prevConsonant: Consonant = null;
  inOrder = true;

  userConsonants: Consonant[] = [
  { consonant: 'i', display: 'i', consonantGroup: 1, correct: 0, position: 0 },
  { consonant: 'e', display: 'e', consonantGroup: 1, correct: 0, position: 1 },
  { consonant: 'a', display: 'a', consonantGroup: 1, correct: 0, position: 2 },
  { consonant: 'u', display: 'u', consonantGroup: 1, correct: 0, position: 3 },
  { consonant: 'o', display: 'o', consonantGroup: 1, correct: 0, position: 4 },
  { consonant: 'oo', display: 'oo', consonantGroup: 1, correct: 0, position: 5 },
  { consonant: 'o_o', display: 'oo L', consonantGroup: 1, correct: 0, position: 6 },
  { consonant: 'ai', display: 'ai', consonantGroup: 2, correct: 0, position: 7 },
  { consonant: 'ay', display: 'ay', consonantGroup: 2, correct: 0, position: 8 },
  { consonant: 'ie', display: 'ie', consonantGroup: 2, correct: 0, position: 9 },
  { consonant: 'ee', display: 'ee', consonantGroup: 2, correct: 0, position: 10 },
  { consonant: 'ea', display: 'ea', consonantGroup: 2, correct: 0, position: 11 },
  { consonant: 'ue', display: 'ue', consonantGroup: 2, correct: 0, position: 12 },
  { consonant: 'oa', display: 'oa', consonantGroup: 2, correct: 0, position: 13 },
  { consonant: 'oe', display: 'oe', consonantGroup: 2, correct: 0, position: 14 },
  { consonant: 'au', display: 'au', consonantGroup: 3, correct: 0, position: 15 },
  { consonant: 'aw', display: 'aw', consonantGroup: 3, correct: 0, position: 16 },
  { consonant: 'ou', display: 'ou', consonantGroup: 3, correct: 0, position: 17 },
  { consonant: 'oy', display: 'oy', consonantGroup: 3, correct: 0, position: 18 },
  { consonant: 'oi', display: 'oi', consonantGroup: 3, correct: 0, position: 19 },
  { consonant: 'or', display: 'or', consonantGroup: 4, correct: 0, position: 20 },
  { consonant: 'ar', display: 'ar', consonantGroup: 4, correct: 0, position: 21 },
  { consonant: 'ir', display: 'ir', consonantGroup: 4, correct: 0, position: 22 },
  { consonant: 'er', display: 'er', consonantGroup: 4, correct: 0, position: 23 },
  { consonant: 'ur', display: 'ur', consonantGroup: 4, correct: 0, position: 24 },
  ];

  constructor() { }

  ngOnInit() {
    this.showConsonant();
  }

  getConsonantSet(vg = this.consonantGroup) {
    return this.userConsonants.filter(v => v.consonantGroup === vg);
  }

  showConsonant() {
    this.displayConsonant = this.getConsonant();
  }

  getConsonant() {
    let nextConsonant = null;
    if (!this.inOrder) {
      let consonantSet = null;
      this.incorrectConsonants ? consonantSet = this.getConsonantSet().concat(this.incorrectConsonants) :
        consonantSet = this.getConsonantSet();
      // doubling the odds the incorrect ones show up
      nextConsonant = consonantSet[Math.floor(Math.random() * consonantSet.length)];
      while (this.prevConsonant && nextConsonant.consonant === this.prevConsonant.consonant) {
        nextConsonant = consonantSet[Math.floor(Math.random() * consonantSet.length)];
      }
    } else {
      if (this.prevConsonant) {
        if (this.prevConsonant.position === this.userConsonants.length - 1) { // at the end
          /* REturn done, they are done with the this set */
        }
        nextConsonant = this.userConsonants.find(v => v.position === this.prevConsonant.position + 1);
      } else {
        nextConsonant = this.userConsonants.find(v => v.position === 0);
      }
    }
    this.prevConsonant = nextConsonant;
    return nextConsonant;
  }

  correct(consonant) {
    const correctConsonant = this.userConsonants.find(v => v.consonant === consonant);
    if (this.inOrder) {
      this.showConsonant();
      return; // do nothing cuz this was just review. This is what is suppose to happen
    }
    correctConsonant.correct++;
    if (this.incorrectConsonants) {
      this.incorrectConsonants = this.incorrectConsonants.filter(v => v.consonant !== correctConsonant.consonant);
    }
    if (correctConsonant.correct < 0) {
      correctConsonant.correct = 0;
    }
    this.nextSet();
    this.showConsonant();
  }

  /* Goes to the next set if all consonants are correct enough */
  nextSet(vg = this.consonantGroup) {
    const consonantSet = this.getConsonantSet(vg);
    let nextSet = true;
    consonantSet.forEach(v => {
      if (v.correct < this.timesCorrect) {
        nextSet = false;
      }
    });
    if (nextSet) {
      this.consonantGroup <= 3 ? this.consonantGroup++ : this.consonantGroup = 1; // looping to the next consonant group;
      this.incorrectConsonants = [];
      consonantSet.map(v => {
        v.correct = 0;
        return v;
      });
    }
  }

  incorrect(consonant) {
    if (this.inOrder) {
      this.showConsonant();
      return; // don't do anything on the in order one
    }
    const incorrectConsonant = this.userConsonants.find(v => v.consonant === consonant.consonant);
    incorrectConsonant.correct > 2 ? incorrectConsonant.correct -= 2 : incorrectConsonant.correct--;
    if (incorrectConsonant.correct < -2) {
      incorrectConsonant.correct = -2;
    }
    if (!this.incorrectConsonants) {
      this.incorrectConsonants = [consonant];
    } else if (!this.incorrectConsonants.includes(consonant)) {
      this.incorrectConsonants.push(consonant);
    }
    this.showConsonant();
  }

  getColor(consonant: Consonant) {
    switch (consonant.consonantGroup) {
    case 1:
      return '#006E90';
    case 2:
      return '#F18F01';
    case 3:
      return '#FF5A5F';
    case 4:
      return '#8332AC';
    default:
      return '#fffff';
    }
  }

}
