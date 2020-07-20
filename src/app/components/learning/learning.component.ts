import { Component, OnInit } from '@angular/core';
import { Vowel } from '../../interfaces/vowel';

@Component({
  selector: 'app-learning',
  templateUrl: './learning.component.html',
  styleUrls: ['./learning.component.scss']
})
export class LearningComponent implements OnInit {

  correctPerSession = 2; // number to hit for the vowel to be correct for the session
  incorrectPerSession = -3; // incorrect times per session for the vowel to be sent back
  correctSessions = 2; // number of sessions to be able to move on to the next level
  hoursBetweenSessions = 12; // the hours between users being able to get sessions correct
  top = ['u', 'a', 'e', 'o', 'oo', 'o_o'];
  leftBottom = ['ai', 'ay', 'ie', 'ee', 'ea', 'ue', 'oa', 'oe'];
  rightLowerBottom = ['au', 'aw', 'ou', 'oy', 'oi'];
  rightUpperBottom = ['or', 'ar', 'ir', 'er', 'ur'];
  incorrectVowels: Vowel[] = null;
  vowelGroup = 1;
  displayVowel: Vowel = null;
  prevVowel: Vowel = null;
  inOrder = true;

  userVowels: Vowel[] = [
{ vowel: 'i', display: 'i', vowelGroup: 1, correct: 0, sessionsCorrect: 0, correctDate: 0, level: 0, consonantLevel: 0, position: 0 },
{ vowel: 'e', display: 'e', vowelGroup: 1, correct: 0, sessionsCorrect: 0, correctDate: 0, level: 0, consonantLevel: 0, position: 1 },
{ vowel: 'a', display: 'a', vowelGroup: 1, correct: 0, sessionsCorrect: 0, correctDate: 0, level: 0, consonantLevel: 0, position: 2 },
{ vowel: 'u', display: 'u', vowelGroup: 1, correct: 0, sessionsCorrect: 0, correctDate: 0, level: 0, consonantLevel: 0, position: 3 },
{ vowel: 'o', display: 'o', vowelGroup: 1, correct: 0, sessionsCorrect: 0, correctDate: 0, level: 0, consonantLevel: 0, position: 4 },
{ vowel: 'oo', display: 'oo', vowelGroup: 1, correct: 0, sessionsCorrect: 0, correctDate: 0, level: 0, consonantLevel: 0, position: 5 },
{ vowel: 'o_o', display: 'oo L', vowelGroup: 1, correct: 0, sessionsCorrect: 0, correctDate: 0, level: 0, consonantLevel: 0, position: 6 },
{ vowel: 'ai', display: 'ai', vowelGroup: 2, correct: 0, sessionsCorrect: 0, correctDate: 0, level: 0, consonantLevel: 0, position: 7 },
{ vowel: 'ay', display: 'ay', vowelGroup: 2, correct: 0, sessionsCorrect: 0, correctDate: 0, level: 0, consonantLevel: 0, position: 8 },
{ vowel: 'ie', display: 'ie', vowelGroup: 2, correct: 0, sessionsCorrect: 0, correctDate: 0, level: 0, consonantLevel: 0, position: 9 },
{ vowel: 'ee', display: 'ee', vowelGroup: 2, correct: 0, sessionsCorrect: 0, correctDate: 0, level: 0, consonantLevel: 0, position: 10 },
{ vowel: 'ea', display: 'ea', vowelGroup: 2, correct: 0, sessionsCorrect: 0, correctDate: 0, level: 0, consonantLevel: 0, position: 11 },
{ vowel: 'ue', display: 'ue', vowelGroup: 2, correct: 0, sessionsCorrect: 0, correctDate: 0, level: 0, consonantLevel: 0, position: 12 },
{ vowel: 'oa', display: 'oa', vowelGroup: 2, correct: 0, sessionsCorrect: 0, correctDate: 0, level: 0, consonantLevel: 0, position: 13 },
{ vowel: 'oe', display: 'eu', vowelGroup: 2, correct: 0, sessionsCorrect: 0, correctDate: 0, level: 0, consonantLevel: 0, position: 14 },
{ vowel: 'au', display: 'au', vowelGroup: 3, correct: 0, sessionsCorrect: 0, correctDate: 0, level: 0, consonantLevel: 0, position: 15 },
{ vowel: 'aw', display: 'aw', vowelGroup: 3, correct: 0, sessionsCorrect: 0, correctDate: 0, level: 0, consonantLevel: 0, position: 16 },
{ vowel: 'ou', display: 'ou', vowelGroup: 3, correct: 0, sessionsCorrect: 0, correctDate: 0, level: 0, consonantLevel: 0, position: 17 },
{ vowel: 'oy', display: 'oy', vowelGroup: 3, correct: 0, sessionsCorrect: 0, correctDate: 0, level: 0, consonantLevel: 0, position: 18 },
{ vowel: 'oi', display: 'oi', vowelGroup: 3, correct: 0, sessionsCorrect: 0, correctDate: 0, level: 0, consonantLevel: 0, position: 19 },
{ vowel: 'or', display: 'or', vowelGroup: 4, correct: 0, sessionsCorrect: 0, correctDate: 0, level: 0, consonantLevel: 0, position: 20 },
{ vowel: 'ar', display: 'ar', vowelGroup: 4, correct: 0, sessionsCorrect: 0, correctDate: 0, level: 0, consonantLevel: 0, position: 21 },
{ vowel: 'ir', display: 'ir', vowelGroup: 4, correct: 0, sessionsCorrect: 0, correctDate: 0, level: 0, consonantLevel: 0, position: 22 },
{ vowel: 'er', display: 'er', vowelGroup: 4, correct: 0, sessionsCorrect: 0, correctDate: 0, level: 0, consonantLevel: 0, position: 23 },
{ vowel: 'ur', display: 'eu', vowelGroup: 4, correct: 0, sessionsCorrect: 0, correctDate: 0, level: 0, consonantLevel: 0, position: 24 },
  ];

  constructor() { }

  ngOnInit() {
    this.showVowel();
  }

  getVowelSet(vg = this.vowelGroup) {
    return this.userVowels.filter(v => v.vowelGroup === vg);
  }

  showVowel() {
    this.displayVowel = this.getVowel();
  }

  getVowel() {
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
          this.vowelGroup = 1;
          this.prevVowel = this.userVowels.find(v => v.position === 0);
          return this.prevVowel;
        }
        nextVowel = this.userVowels.find(v => v.position === this.prevVowel.position + 1);
      } else {
        nextVowel = this.userVowels.find(v => v.position === 0);
      }
    }
    this.prevVowel = nextVowel;
    return nextVowel;
  }

  correct(vowel, level) {
    const correctVowel = this.userVowels.find(v => v.vowel === vowel);
    if (vowel.level < level || this.inOrder) {
      this.showVowel();
      return; // do nothing cuz this was just review. This is what is suppose to happen
    }
    if (this.incorrectVowels) {
      this.incorrectVowels = this.incorrectVowels.filter(v => v.vowel !== correctVowel.vowel);
    }
    if (correctVowel.correct < 0) {
      correctVowel.correct = 0;
    }
    correctVowel.correct++;
    if (correctVowel.correct >= this.correctPerSession) {
      const sessionCorrectDate = correctVowel.correctDate + (this.hoursBetweenSessions * 60 * 60 * 1000); // the date to get session correct
      if (sessionCorrectDate < Date.now()) {
        correctVowel.sessionsCorrect++; // adding session correct
        correctVowel.correctDate = Date.now();
        if (correctVowel.sessionsCorrect >= this.correctSessions) {
          correctVowel.level++; // increaing the level
          const vowelSet = this.getVowelSet(vowel.vowelGroup);
          let nextSet = true;
          vowelSet.forEach(v => {
              if (v.level !== correctVowel.level) {
                nextSet = false;
              }
          });
          if (nextSet) {
            this.vowelGroup <= 3 ? this.vowelGroup++ : this.vowelGroup = 1; // looping to the next vowel group;
            this.incorrectVowels = []; // resettingTheIncorrectVowels
          }
          /* Maybe add a congrats for upgrading the vowel */
        }
      }
      this.nextSet();
    }
    this.showVowel();
  }


  /* Goes to the next set if all vowels are correct enough */
  nextSet(vg = this.vowelGroup) {
    const vowelSet = this.getVowelSet(vg);
    let nextSet = true;
    vowelSet.forEach(v => {
        if (v.correct < this.correctPerSession) {
          nextSet = false;
        }
    });
    if (nextSet) {
      this.vowelGroup <= 3 ? this.vowelGroup++ : this.vowelGroup = 1; // looping to the next vowel group;
      this.incorrectVowels = [];
      vowelSet.map(v => {
        v.correct = 0;
        return v;
      });
    }
  }

  incorrect(vowel) {
    if (this.inOrder) {
      this.showVowel();
      return; // don't do anything on the in order one
    }
    const incorrectVowel = this.userVowels.find(v => v.vowel === vowel.vowel);
    incorrectVowel.correct > 2 ? incorrectVowel.correct -= 2 : incorrectVowel.correct--;
    if (incorrectVowel.correct < -2) {
      incorrectVowel.correct = -2;
    }

    if (incorrectVowel.correct <= this.incorrectPerSession) {
      incorrectVowel.correct = 0; // resetting the correct
      incorrectVowel.correctDate = 0; // setting the correct date to 0 so the kid can get it correct again soon
      incorrectVowel.level--;
    }

    if (!this.incorrectVowels) {
      this.incorrectVowels = [vowel];
    } else if (!this.incorrectVowels.includes(vowel)) {
      this.incorrectVowels.push(vowel);
    }
    this.showVowel();
  }

  updateVowels(vowel: Vowel) {
    this.userVowels.map(v => { // updating the vowels
      if (v.vowel === vowel.vowel) {
        v = vowel;
      }
      return v;
    });
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
