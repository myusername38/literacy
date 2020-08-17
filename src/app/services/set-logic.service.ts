import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SetLogicService {

  setTiles = [
    { letters: ['a', 'c'], position: 0, format: 'vc', correct: 0 },


  ];

  constructor() { }
}
