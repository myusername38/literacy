import { Injectable } from '@angular/core';
import { Consonant } from '../interfaces/consonant';
import { Tile } from '../interfaces/tile';
import { ConsonantComponent } from '../consonant/consonant.component';

@Injectable({
  providedIn: 'root'
})
export class IsolatedConsonantsService {

  timesCorrect = 2; // number to hit for the consonant to be correct for the session

  incorrectConsonants: Consonant[] = null;
  consonantGroup = 1;
  displayConsonant: Consonant = null;
  prevConsonant: Consonant = null;
  inOrder = true;
  complete = [];
  incomplete = [];
  first = 1;


  userConsonants: Consonant[] = [
  { consonant: 'h', display: 'h', consonantGroup: 1, correct: 0, shown: 0, position: 0 },
  { consonant: 'm', display: 'm', consonantGroup: 2, correct: 0, shown: 0, position: 1 },
  { consonant: 'n', display: 'n', consonantGroup: 2, correct: 0, shown: 0, position: 2 },
  { consonant: 'p', display: 'p', consonantGroup: 3, correct: 0, shown: 0, position: 3 },
  { consonant: 'b', display: 'b', consonantGroup: 3, correct: 0, shown: 0, position: 4 },
  { consonant: 't', display: 't', consonantGroup: 4, correct: 0, shown: 0, position: 5 },
  { consonant: 'd', display: 'd', consonantGroup: 4, correct: 0, shown: 0, position: 6 },
  { consonant: 's', display: 's', consonantGroup: 5, correct: 0, shown: 0, position: 7 },
  { consonant: 'z', display: 'z', consonantGroup: 5, correct: 0, shown: 0, position: 8 },
  { consonant: 'f', display: 'f', consonantGroup: 6, correct: 0, shown: 0, position: 9 },
  { consonant: 'v', display: 'v', consonantGroup: 6, correct: 0, shown: 0, position: 10 },
  { consonant: 'k', display: 'k', consonantGroup: 7, correct: 0, shown: 0, position: 11 },
  { consonant: 'c', display: 'c', consonantGroup: 7, correct: 0, shown: 0, position: 12 },
  { consonant: 'g', display: 'g', consonantGroup: 7, correct: 0, shown: 0, position: 13 },
  { consonant: 'w', display: 'w', consonantGroup: 8, correct: 0, shown: 0, position: 14 },
  { consonant: 'l', display: 'l', consonantGroup: 8, correct: 0, shown: 0, position: 15 },
  { consonant: 'r', display: 'r', consonantGroup: 8, correct: 0, shown: 0, position: 16 },
  { consonant: 'sh', display: 'sh', consonantGroup: 9, correct: 0, shown: 0, position: 17 },
  { consonant: 'j', display: 'j', consonantGroup: 9, correct: 0, shown: 0, position: 18 },
  { consonant: 'x', display: 'x', consonantGroup: 10, correct: 0, shown: 0, position: 19 },
  { consonant: 'y', display: 'y', consonantGroup: 10, correct: 0, shown: 0, position: 20 },
  { consonant: 'ch', display: 'ch', consonantGroup: 11, correct: 0, shown: 0, position: 21 },
  { consonant: 'th', display: 'th', consonantGroup: 12, correct: 0, shown: 0, position: 22 },
  { consonant: 'ck', display: 'ck', consonantGroup: 13, correct: 0, shown: 0, position: 23 },
  { consonant: 'gh', display: 'gh', consonantGroup: 13, correct: 0, shown: 0, position: 24 },
  { consonant: 'ng', display: 'ng', consonantGroup: 14, correct: 0, shown: 0, position: 25 },
  { consonant: 'ph', display: 'ph', consonantGroup: 14, correct: 0, shown: 0, position: 26 },
  { consonant: 'tw', display: 'tw', consonantGroup: 14, correct: 0, shown: 0, position: 27 },
  { consonant: 'wh', display: 'wh', consonantGroup: 15, correct: 0, shown: 0, position: 28 },
  { consonant: 'gu', display: 'gu', consonantGroup: 15, correct: 0, shown: 0, position: 29 },
  ];

  constructor() { }

  getConsonantSet(vg = this.consonantGroup) {
    return this.userConsonants.filter(v => v.consonantGroup === vg);
  }

  showConsonant() {
    if (this.first === 0) {
      this.displayConsonant = this.userConsonants.find(v => v.position === 0);
      console.log('here');
      this.first = 1;
    } else {
      this.displayConsonant = this.getNextConsonant();
    }
    const returnTile = {
      id: this.displayConsonant.consonant,
      display: this.displayConsonant.display,
      color: this.getColor(this.displayConsonant) } as Tile;
    return [returnTile];
  }

  getConsonantsStatus() {
    this.complete = [];
    this.incomplete = [];
    this.userConsonants.forEach(consonant => {
      if (consonant.consonantGroup > this.consonantGroup) {
        return;
      } else {
        if (consonant.correct >= this.timesCorrect) {
          this.complete[this.complete.length] = consonant;
        } else {
          this.incomplete[this.incomplete.length] = consonant;
        }
      }
    });
  }

  getNextConsonant() {
    this.getConsonantsStatus();
    const letsPick = Math.round(Math.random() * 10);
    if (letsPick <= 2) {
      const pickAgain = Math.round(Math.random() * this.complete.length);
      return this.complete[pickAgain];
    } else {
      const pickAgain = Math.round(Math.random() * this.incomplete.length);
      return this.incomplete[pickAgain];
    }
  }

  correct() {
    const correctConsonant = this.userConsonants.find(v => v.consonant === this.displayConsonant.consonant);
    if (this.inOrder) {
      return this.showConsonant();
    }
    correctConsonant.correct++;
    if (this.incorrectConsonants) {
      this.incorrectConsonants = this.incorrectConsonants.filter(v => v.consonant !== correctConsonant.consonant);
    }
    if (correctConsonant.correct < 0) {
      correctConsonant.correct = 0;
    }
    this.nextSet();
    return this.showConsonant();
  }

  incorrect() {
    if (this.inOrder) {
      return this.showConsonant();
    }
    const incorrectConsonant = this.userConsonants.find(v => v.consonant === this.displayConsonant.consonant);
    incorrectConsonant.correct > 2 ? incorrectConsonant.correct -= 2 : incorrectConsonant.correct--;
    if (incorrectConsonant.correct < -2) {
      incorrectConsonant.correct = -2;
    }
    if (!this.incorrectConsonants) {
      this.incorrectConsonants = [this.displayConsonant];
    } else if (!this.incorrectConsonants.includes(this.displayConsonant)) {
      this.incorrectConsonants.push(this.displayConsonant);
    }
    return this.showConsonant();
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
      this.consonantGroup <= 14 ? this.consonantGroup++ : this.consonantGroup = 1; // looping to the next consonant group;
      this.incorrectConsonants = [];
      consonantSet.map(v => {
        v.correct = 0;
        return v;
      });
    }
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
    case 5:
      return '#006E90';
    case 6:
      return '#F18F01';
    case 7:
      return '#FF5A5F';
    case 8:
      return '#8332AC';
    case 9:
      return '#006E90';
    case 10:
      return '#F18F01';
    case 11:
      return '#FF5A5F';
    case 12:
      return '#8332AC';
    case 13:
      return '#006E90';
    case 14:
      return '#F18F01';
    case 15:
      return '#FF5A5F';
    default:
      return '#fffff';
    }
  }
}

  // getConsonant() {
  //   let nextConsonant = null;
  //   if (!this.inOrder) {
  //     let consonantSet = null;
  //     this.incorrectConsonants ? consonantSet = this.getConsonantSet().concat(this.incorrectConsonants) :
  //       consonantSet = this.getConsonantSet();
  //     // doubling the odds the incorrect ones show up
  //     nextConsonant = consonantSet[Math.floor(Math.random() * consonantSet.length)];
  //     while (this.prevConsonant && nextConsonant.consonant === this.prevConsonant.consonant) {
  //       nextConsonant = consonantSet[Math.floor(Math.random() * consonantSet.length)];
  //     }
  //   } else {
  //     if (this.prevConsonant) {
  //       if (this.prevConsonant.position === this.userConsonants.length - 1) { // at the end
  //         /* REturn done, they are done with the this set */
  //       }
  //       nextConsonant = this.userConsonants.find(v => v.position === this.prevConsonant.position + 1);
  //     } else {
  //       nextConsonant = this.userConsonants.find(v => v.position === 0);
  //     }
  //   }
  //   this.prevConsonant = nextConsonant;
  //   return nextConsonant;
  // }

/* LOGIC

    let complete = [30]; // <--- these two arrays hold all the consonants under their respective area
    let incomplete = [30]; // these will be those kinds of public variables that are part of a class i think they called instance variables


    // WE Run this for loop/clear every time we introduce a new group in

  getConsonantStatus() {
    complete.clear();
    incomplete.clear();
    for (int i = 0; i < 30; i++) {
      if (this.consonant.correct >= timesCorrect) {
        complete[complete.length] = this.consonant;
      } else {
        incomplete[incomplete.length] = this.consonant;
      }
    }
  }

  // OK NOW we got the list so the below is run whenenver we need the next consonant

  getNextConsonant() {
    const letsPick = Math.Random(1,10);
    let consonant;
    if (letsPick <= 2) {
      const pickAgain = Math.Random(1, complete.length);
      consonant = complete[pickAgain];
    } else {
      const pickAgain = Math.Random(1, incomplete.length);
      consonant = complete[pickAgain];
    }
    showConsonant(consonant);
  }

*/
