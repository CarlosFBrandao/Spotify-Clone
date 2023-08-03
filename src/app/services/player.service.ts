import { Injectable } from '@angular/core';
import { IMusica } from '../interfaces/IMusica';
import { newMusica } from '../Common/factores';
import { BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  musicaAtual = new BehaviorSubject<IMusica>(newMusica());

  constructor() { }
}
