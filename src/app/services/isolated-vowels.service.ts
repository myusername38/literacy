import { Injectable } from '@angular/core';
import { Vowel } from '../interfaces/vowel';
import { Tile } from '../interfaces/tile';

@Injectable({
  providedIn: 'root'
})
export class IsolatedVowelsService {

  timesCorrect = 2; // number to hit for the vowel to be correct for the session

  incorrectVowels: Vowel[] = null;
  vowelGroup = 1;
  displayVowel: Vowel = null;
  prevVowel: Vowel = null;
  inOrder = true;
  passed = false;

  userVowels: Vowel[] = [
  { vowel: 'i', display: 'i', vowelGroup: 1, correct: 0, position: 0 },
  { vowel: 'e', display: 'e', vowelGroup: 1, correct: 0, position: 1 },
  { vowel: 'a', display: 'a', vowelGroup: 1, correct: 0, position: 2 },
  { vowel: 'u', display: 'u', vowelGroup: 1, correct: 0, position: 3 },
  { vowel: 'o', display: 'o', vowelGroup: 1, correct: 0, position: 4 },
  { vowel: 'oo', display: 'oo', vowelGroup: 1, correct: 0, position: 5 },
  { vowel: 'o_o', display: 'oo L', vowelGroup: 1, correct: 0, position: 6 },
  { vowel: 'ai', display: 'ai', vowelGroup: 2, correct: 0, position: 7 },
  { vowel: 'ay', display: 'ay', vowelGroup: 2, correct: 0, position: 8 },
  { vowel: 'ie', display: 'ie', vowelGroup: 2, correct: 0, position: 9 },
  { vowel: 'ee', display: 'ee', vowelGroup: 2, correct: 0, position: 10 },
  { vowel: 'ea', display: 'ea', vowelGroup: 2, correct: 0, position: 11 },
  { vowel: 'ue', display: 'ue', vowelGroup: 2, correct: 0, position: 12 },
  { vowel: 'oa', display: 'oa', vowelGroup: 2, correct: 0, position: 13 },
  { vowel: 'oe', display: 'oe', vowelGroup: 2, correct: 0, position: 14 },
  { vowel: 'au', display: 'au', vowelGroup: 3, correct: 0, position: 15 },
  { vowel: 'aw', display: 'aw', vowelGroup: 3, correct: 0, position: 16 },
  { vowel: 'ou', display: 'ou', vowelGroup: 3, correct: 0, position: 17 },
  { vowel: 'oy', display: 'oy', vowelGroup: 3, correct: 0, position: 18 },
  { vowel: 'oi', display: 'oi', vowelGroup: 3, correct: 0, position: 19 },
  { vowel: 'or', display: 'or', vowelGroup: 4, correct: 0, position: 20 },
  { vowel: 'ar', display: 'ar', vowelGroup: 4, correct: 0, position: 21 },
  { vowel: 'ir', display: 'ir', vowelGroup: 4, correct: 0, position: 22 },
  { vowel: 'er', display: 'er', vowelGroup: 4, correct: 0, position: 23 },
  { vowel: 'ur', display: 'ur', vowelGroup: 4, correct: 0, position: 24 },
];

  constructor() { }

  initUserData() {
    // check to see if user data
  }

  getVowelSet(vg = this.vowelGroup) {
    return this.userVowels.filter(v => v.vowelGroup === vg);
  }

  getVowel() {
    if (this.passed) {
      return [{ id: 'passed', display: 'passed', color: '#ffffff' }]; // passed the set
    }
    let nextVowel = null;
    if (!this.inOrder) {
      let vowelSet = null;
      this.incorrectVowels ? vowelSet = this.getVowelSet().concat(this.incorrectVowels) : vowelSet = this.getVowelSet();
      // doubling the ods the incorrect ones show up
      nextVowel = vowelSet[Math.floor(Math.random() * vowelSet.length)];
      while (this.prevVowel && nextVowel.vowel === this.prevVowel.vowel) {
        nextVowel = vowelSet[Math.floor(Math.random() * vowelSet.length)];
      }
    } else {
      if (this.prevVowel) {
        if (this.prevVowel.position === this.userVowels.length - 1) { // at the end
            this.inOrder = false;
            nextVowel = this.userVowels.find(v => v.position === 0); // starting from the beginning again
        } else {
          nextVowel = this.userVowels.find(v => v.position === this.prevVowel.position + 1);
        }
      } else {
        nextVowel = this.userVowels.find(v => v.position === 0); // starting at the beginning
      }
    }
    this.prevVowel = nextVowel;
    const returnTile = { id: nextVowel.vowel, display: nextVowel.display, color: this.getColor(nextVowel) } as Tile;
    return [returnTile];
  }

  correct() {
    const correctVowel = this.userVowels.find(v => v.vowel === this.prevVowel.vowel);
    if (this.inOrder) {
      return this.getVowel(); // do nothing cuz this was just review. This is what is suppose to happen
    }
    correctVowel.correct++;
    if (this.incorrectVowels) {
      this.incorrectVowels = this.incorrectVowels.filter(v => v.vowel !== correctVowel.vowel);
    }
    if (correctVowel.correct < 0) {
      correctVowel.correct = 0;
    }
    this.nextSet();
    return this.getVowel() as Tile[];
  }

  /* Goes to the next set if all vowels are correct enough */
  nextSet(vg = this.vowelGroup) {
    const vowelSet = this.getVowelSet(vg);
    let nextSet = true;
    vowelSet.forEach(v => {
      if (v.correct < this.timesCorrect) {
        nextSet = false;
      }
    });
    if (nextSet && !this.inOrder && this.vowelGroup <= 3) {
      this.vowelGroup <= 3 ? this.vowelGroup++ : this.vowelGroup = 1; // looping to the next vowel group;
      this.incorrectVowels = [];
    } else if (nextSet && this.vowelGroup > 3) {
      this.passed = true;
    }
  }

  incorrect() {
    if (this.inOrder) {
      return this.getVowel(); // don't do anything on the in order one
    }
    const incorrectVowel = this.userVowels.find(v => v.vowel === this.prevVowel.vowel);
    incorrectVowel.correct > 2 ? incorrectVowel.correct -= 2 : incorrectVowel.correct--;
    if (incorrectVowel.correct < -2) {
      incorrectVowel.correct = -2;
    }
    if (!this.incorrectVowels) {
      this.incorrectVowels = [this.prevVowel];
    } else if (!this.incorrectVowels.includes(this.prevVowel)) {
      this.incorrectVowels.push(this.prevVowel);
    }
    return this.getVowel() as Tile[];
  }

  getColor(vowel: Vowel) {
    switch (vowel.vowelGroup) {
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
