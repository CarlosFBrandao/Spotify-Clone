import { Component, OnDestroy, OnInit } from '@angular/core';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { newMusica } from 'src/app/Common/factores';
import { IMusica } from 'src/app/interfaces/IMusica';
import { PlayerService } from 'src/app/services/player.service';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  musicas: IMusica[] = [];
  playIcone = faPlay;
  musicaAtual: IMusica = newMusica();
  subs: Subscription[] = [];
  teste: string;

  constructor(
    private readonly spotifyService: SpotifyService,
    private readonly playerService: PlayerService,
  ){

  }
  
  ngOnInit(): void {
    this.obterMusica();
    this.obterMusicaAtual();
  }
  
  ngOnDestroy(): void {
    this.subs.forEach(s => s.unsubscribe())
  }

  async obterMusica(){
    this.musicas = await this.spotifyService.buscarMusicasCurtidas();
    console.log(this.musicas)
  }

  obterArtista(musica: IMusica){
    return this.spotifyService.obterArtista(musica);
  }

  async executarMusica(musica: IMusica){
    await this.spotifyService.executarMusica(musica.id);
    this.playerService.definirMusicaAtual(musica);
  }

  obterMusicaAtual(){
    const sub = this.playerService.musicaAtual.subscribe(musica =>
      this.musicaAtual = musica
      );

    this.subs.push(sub);
  }

}
