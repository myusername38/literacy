import { Injectable } from '@angular/core';
import { Consonant } from '../interfaces/consonant';
import { Tile } from '../interfaces/tile';

@Injectable({
  providedIn: 'root'
})
export class IsolatedConsonantsService {
  timesCorrect = 3; // number to hit for the consonant to be correct for the session
  minShown = 5; // min number to show at one time
  showAgain = 0;
  startingGroup = 2;
  correctOdds = 8.5;

  introduceConsonants: Consonant[] = null;
  correctConsonants: Consonant[] = [];
  learningConsonants: Consonant[] = null;
  incorrectConsonants: Consonant[] = null;

  consonantGroup = 1;
  prevConsonant: Consonant = null;
  inOrder = true;

  userConsonants: Consonant[] = [
  { consonant: 'h', display: 'h', consonantGroup: 1, correct: 0, position: 0, family: 0 },
  { consonant: 'm', display: 'm', consonantGroup: 2, correct: 0, position: 1, family: 0 },
  { consonant: 'n', display: 'n', consonantGroup: 2, correct: 0, position: 2, family: 0 },
  { consonant: 'p', display: 'p', consonantGroup: 3, correct: 0, position: 3, family: 1 },
  { consonant: 'b', display: 'b', consonantGroup: 3, correct: 0, position: 4, family: 2 },
  { consonant: 't', display: 't', consonantGroup: 3, correct: 0, position: 5, family: 1 },
  { consonant: 'd', display: 'd', consonantGroup: 3, correct: 0, position: 6, family: 2 },
  { consonant: 's', display: 's', consonantGroup: 4, correct: 0, position: 7, family: 1 },
  { consonant: 'z', display: 'z', consonantGroup: 4, correct: 0, position: 8, family: 2 },
  { consonant: 'f', display: 'f', consonantGroup: 5, correct: 0, position: 9, family: 1 },
  { consonant: 'v', display: 'v', consonantGroup: 5, correct: 0, position: 10, family: 2 },
  { consonant: 'k', display: 'k', consonantGroup: 6, correct: 0, position: 11, family: 1 },
  { consonant: 'c', display: 'c', consonantGroup: 6, correct: 0, position: 12, family: 1 },
  { consonant: 'g', display: 'g', consonantGroup: 6, correct: 0, position: 13, family: 2 },
  { consonant: 'w', display: 'w', consonantGroup: 7, correct: 0, position: 14, family: 0 },
  { consonant: 'l', display: 'l', consonantGroup: 7, correct: 0, position: 15, family: 0 },
  { consonant: 'r', display: 'r', consonantGroup: 7, correct: 0, position: 16, family: 0 },
  { consonant: 'sh', display: 'sh', consonantGroup: 8, correct: 0, position: 17, family: 0 },
  { consonant: 'ch', display: 'ch', consonantGroup: 8, correct: 0, position: 18, family: 0 },
  { consonant: 'j', display: 'j', consonantGroup: 8, correct: 0, position: 19, family: 0 },
  { consonant: 'x', display: 'x', consonantGroup: 9, correct: 0, position: 20, family: 0 },
  { consonant: 'y', display: 'y', consonantGroup: 9, correct: 0, position: 21, family: 0 },
  { consonant: 'wh', display: 'wh', consonantGroup: 10, correct: 0, position: 22, family: 0 },
  { consonant: 'tw', display: 'tw', consonantGroup: 10, correct: 0, position: 23, family: 0 },
  { consonant: 'th', display: 'th', consonantGroup: 11, correct: 0, position: 24, family: 0 },
  { consonant: 'th', display: 'th_', consonantGroup: 11, correct: 0, position: 25, family: 0 },
  { consonant: 'qu', display: 'qu', consonantGroup: 11, correct: 0, position: 26, family: 0 },
  { consonant: 'gh', display: 'gh', consonantGroup: 11, correct: 0, position: 27, family: 0 },
  { consonant: 'ph', display: 'ph', consonantGroup: 12, correct: 0, position: 28, family: 0 },
  { consonant: 'ck', display: 'ck', consonantGroup: 12, correct: 0, position: 29, family: 0 },
  { consonant: 'ng', display: 'ng', consonantGroup: 12, correct: 0, position: 30, family: 0 },
  ];

  constructor() { }

  initUserData() {
    // check to see if user data
  }

  initLearningConsonants() {
    this.learningConsonants = [];
    this.introduceConsonants = this.userConsonants.filter(consonant => consonant.consonantGroup <= this.startingGroup);
    this.introduceConsonants = this.introduceConsonants.sort((a, b) => b.position - a.position);
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
      const rt = { id: this.prevConsonant.consonant, display: this.prevConsonant.display, color: this.getColor(this.prevConsonant) };
      return [rt];
    }
    let nextConsonant = null;
    let consonantSet = null;
    let correctCon = false;
    if (this.correctConsonants.length > 4 && Math.random() * 10 > this.correctOdds) {
      consonantSet = this.correctConsonants;
      correctCon = true;
    } else {
      this.incorrectConsonants ? consonantSet = this.learningConsonants.concat(this.incorrectConsonants)
                               : consonantSet = this.learningConsonants;
    }
    if (!consonantSet[0]) {
      return [{ id: 'passed', display: 'passed', color: '#ffffff' }];
    }
    // doubling the odds the incorrect ones show up
    nextConsonant = consonantSet[Math.floor(Math.random() * consonantSet.length)];
    while (this.prevConsonant && nextConsonant.consonant === this.prevConsonant.consonant) {
      nextConsonant = consonantSet[Math.floor(Math.random() * consonantSet.length)];
    }
    this.prevConsonant = nextConsonant;
    const returnTile = { id: nextConsonant.consonant, display: nextConsonant.display, color: this.getColor(this.prevConsonant) };
    return [returnTile];
  }

  correct() {
    this.prevConsonant.correct++;
    if (this.introduceConsonants) {
      return this.getConsonant(); // do nothing;
    }

    if (this.incorrectConsonants) {
      this.incorrectConsonants = this.incorrectConsonants.filter(consonant => consonant.position !== this.prevConsonant.position);
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
        this.addNextGroup(this.prevConsonant.consonantGroup);
      }
    }
    return this.getConsonant();
  }

  addNextGroup(hg = this.learningConsonants[0].consonantGroup) {
    let highGroup = hg;
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

    if (incorrectConsonant.correct < this.showAgain && this.correctConsonants.includes(incorrectConsonant)) {
      /* if its be or d make sure both are added */
      if (incorrectConsonant.consonant === 'b' || incorrectConsonant.consonant === 'd') {
        this.correctConsonants = this.correctConsonants.filter(consonant => consonant.consonant !== 'b' && consonant.consonant !== 'd');
        this.learningConsonants.push(this.userConsonants.find(consonant => consonant.consonant === 'b'));
        this.learningConsonants.push(this.userConsonants.find(consonant => consonant.consonant === 'd'));
      } else {
        this.correctConsonants = this.correctConsonants.filter(consonant => consonant.position !== incorrectConsonant.position);
        this.learningConsonants.push(incorrectConsonant);
      }
    }
    return this.getConsonant();
  }

  getColor(consonant: Consonant) {
    switch (consonant.family) {
    case 1:
      return '#3891A6';
    case 2:
      return '#F2C14E';
    default:
      return '#000000';
    }
  }
}
