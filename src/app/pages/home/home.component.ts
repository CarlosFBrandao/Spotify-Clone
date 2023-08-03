import { Component, OnInit } from '@angular/core';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { IMusica } from 'src/app/interfaces/IMusica';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  musicas: IMusica[] = [];
  playIcone = faPlay;

  constructor(
    private spotifyService: SpotifyService
  ){

  }

  ngOnInit(): void {
    this.obterMusica();
  }

  async obterMusica(){
    this.musicas = await this.spotifyService.buscarMusicasCurtidas();
    console.log(this.musicas)
  }

  obterArtista(musica: IMusica){
    return this.spotifyService.obterArtista(musica); //
  }

  async executarMusica(musicaId: string){
    await this.spotifyService.executarMusica(musicaId);
  }

}
