import { Injectable } from '@angular/core';
import { IMusica } from '../interfaces/IMusica';
import { newMusica } from '../Common/factores';
import { BehaviorSubject} from 'rxjs';
import { SpotifyService } from './spotify.service';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  musicaAtual = new BehaviorSubject<IMusica>(newMusica());

  constructor(
    private readonly spotifyService: SpotifyService
  ) { 
    this.ObterMusicaAtual();
  }

  async ObterMusicaAtual(){
    const musica = await this.spotifyService.obterMusicaAtual();
    this.definirMusicaAtual(musica);
  }

  definirMusicaAtual(musica: IMusica){
    this.musicaAtual.next(musica);
  }
}
