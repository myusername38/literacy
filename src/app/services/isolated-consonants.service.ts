import { Injectable } from '@angular/core';
import { Consonant } from '../interfaces/consonant';
import { Tile } from '../interfaces/tile';

@Injectable({
  providedIn: 'root'
})
export class IsolatedConsonantsService {
  timesCorrect = 2; // number to hit for the consonant to be correct for the session
  minShown = 5; // min number to show at one time
  showAgain = 0;
  startingGroup = 2;

  introduceConsonants: Consonant[] = null;
  correctConsonants: Consonant[] = [];
  learningConsonants: Consonant[] = null;
  incorrectConsonants: Consonant[] = null;

  consonantGroup = 1;
  prevConsonant: Consonant = null;
  inOrder = true;

  userConsonants: Consonant[] = [
  { consonant: 'h', display: 'h', consonantGroup: 1, correct: 0, position: 0 },
  { consonant: 'm', display: 'm', consonantGroup: 2, correct: 0, position: 1 },
  { consonant: 'n', display: 'n', consonantGroup: 2, correct: 0, position: 2 },
  { consonant: 'p', display: 'p', consonantGroup: 3, correct: 0, position: 3 },
  { consonant: 'b', display: 'b', consonantGroup: 3, correct: 0, position: 4 },
  { consonant: 't', display: 't', consonantGroup: 3, correct: 0, position: 5 },
  { consonant: 'd', display: 'd', consonantGroup: 3, correct: 0, position: 6 },
  { consonant: 's', display: 's', consonantGroup: 4, correct: 0, position: 7 },
  { consonant: 'z', display: 'z', consonantGroup: 4, correct: 0, position: 8 },
  { consonant: 'f', display: 'f', consonantGroup: 5, correct: 0, position: 9 },
  { consonant: 'v', display: 'v', consonantGroup: 5, correct: 0, position: 10 },
  { consonant: 'k', display: 'k', consonantGroup: 6, correct: 0, position: 11 },
  { consonant: 'c', display: 'c', consonantGroup: 6, correct: 0, position: 12 },
  { consonant: 'g', display: 'g', consonantGroup: 6, correct: 0, position: 13 },
  { consonant: 'w', display: 'w', consonantGroup: 7, correct: 0, position: 14 },
  { consonant: 'l', display: 'l', consonantGroup: 7, correct: 0, position: 15 },
  { consonant: 'r', display: 'r', consonantGroup: 7, correct: 0, position: 16 },
  { consonant: 'sh', display: 'sh', consonantGroup: 8, correct: 0, position: 17 },
  { consonant: 'j', display: 'j', consonantGroup: 8, correct: 0, position: 18 },
  { consonant: 'x', display: 'x', consonantGroup: 9, correct: 0, position: 19 },
  { consonant: 'y', display: 'y', consonantGroup: 9, correct: 0, position: 20 },
  { consonant: 'ch', display: 'ch', consonantGroup: 10, correct: 0, position: 21 },
  { consonant: 'th', display: 'th', consonantGroup: 11, correct: 0, position: 22 },
  { consonant: 'ck', display: 'ck', consonantGroup: 12, correct: 0, position: 23 },
  { consonant: 'gh', display: 'gh', consonantGroup: 12, correct: 0, position: 24 },
  { consonant: 'ng', display: 'ng', consonantGroup: 13, correct: 0, position: 25 },
  { consonant: 'ph', display: 'ph', consonantGroup: 13, correct: 0, position: 26 },
  { consonant: 'tw', display: 'tw', consonantGroup: 13, correct: 0, position: 27 },
  { consonant: 'wh', display: 'wh', consonantGroup: 14, correct: 0, position: 28 },
  { consonant: 'gu', display: 'gu', consonantGroup: 14, correct: 0, position: 29 },
  ];

  constructor() { }

  initUserData() {
    // check to see if user data
  }

  initLearningConsonants() {
    this.learningConsonants = [];
    this.introduceConsonants = this.userConsonants.filter(consonant => consonant.consonantGroup <= this.startingGroup);
    this.introduceConsonants = this.introduceConsonants.sort((a, b) => b.position - a.position);
    console.log(this.introduceConsonants);
  }

  getConsonant() {
    if (!this.introduceConsonants && !this.learningConsonants) {
      this.initLearningConsonants();
    }
    if (this.introduceConsonants) {
      this.prevConsonant = this.introduceConsonants.pop();
      this.learningConsonants.push(this.prevConsonant);
      if (!this.introduceConsonants[0]) {  // don't know if i need this right now
        this.introduceConsonants = null;
      }
      const rt = { id: this.prevConsonant.consonant, display: this.prevConsonant.display, color: '#54C6EB' } as Tile;
      return [rt];
    }
    let nextConsonant = null;
    let consonantSet = this.learningConsonants;
    if (this.incorrectConsonants) {
      consonantSet = this.learningConsonants.concat(this.incorrectConsonants);
    }
    // doubling the odds the incorrect ones show up
    nextConsonant = consonantSet[Math.floor(Math.random() * consonantSet.length)];
    while (this.prevConsonant && nextConsonant.consonant === this.prevConsonant.consonant) {
      nextConsonant = consonantSet[Math.floor(Math.random() * consonantSet.length)];
    }
    this.prevConsonant = nextConsonant;
    const returnTile = { id: nextConsonant.consonant, display: nextConsonant.display, color: '#54C6EB' } as Tile;
    return [returnTile];
  }

  correct() {
    this.prevConsonant.correct++;
    if (this.introduceConsonants) {
      return this.getConsonant(); // do nothing;
    }

    if (this.prevConsonant.correct > this.timesCorrect) {
      const checkConsonants = this.learningConsonants.filter(consonant => consonant.consonantGroup === this.prevConsonant.consonantGroup);
      let completeGroup = true;
      checkConsonants.forEach(consonant => {
        if (consonant.correct <= this.timesCorrect) {
          completeGroup = false;
        }
      });
      if (completeGroup && checkConsonants[0]) {
        this.correctConsonants = this.correctConsonants.concat(checkConsonants);
        this.learningConsonants = this.learningConsonants.filter(con => con.consonantGroup !== this.prevConsonant.consonantGroup);
        this.addNextGroup();
      }
    }
    return this.getConsonant();
  }

  addNextGroup() {
    let highGroup = this.learningConsonants[0].consonantGroup;
    this.learningConsonants.forEach(consonant => {
      if (consonant.consonantGroup > highGroup) {
        highGroup = consonant.consonantGroup;
      }
    });
    if (highGroup >= this.userConsonants[this.userConsonants.length - 1].consonantGroup) {
      return; // done, no more to add
    }
    this.introduceConsonants = this.userConsonants.filter(consonant => consonant.consonantGroup === (highGroup + 1));
    this.introduceConsonants = this.introduceConsonants.sort((a, b) => b.position - a.position);
  }

  incorrect() {
    const incorrectConsonant = this.prevConsonant;
    incorrectConsonant.correct > 2 ? incorrectConsonant.correct -= 2 : incorrectConsonant.correct--;
    if (incorrectConsonant.correct < -2) {
      incorrectConsonant.correct = -2;
    }

    if (!this.incorrectConsonants) {
      this.incorrectConsonants = [incorrectConsonant];
    } else if (!this.incorrectConsonants.includes(incorrectConsonant)) {
      this.incorrectConsonants.push(incorrectConsonant);
    }

    if (incorrectConsonant.correct < this.showAgain) {
      /* if its be or d make sure both are added */
      this.correctConsonants = this.correctConsonants.filter(consonant => consonant.position !== incorrectConsonant.position);
      this.learningConsonants.push(incorrectConsonant);
    }
    return this.getConsonant();
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
