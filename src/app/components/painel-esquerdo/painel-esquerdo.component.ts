import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faHome, faSearch, faGuitar, faMusic } from '@fortawesome/free-solid-svg-icons';
import { IPlaylist } from 'src/app/interfaces/IPlaylist';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-painel-esquerdo',
  templateUrl: './painel-esquerdo.component.html',
  styleUrls: ['./painel-esquerdo.component.scss']
})
export class PainelEsquerdoComponent implements OnInit{

  menuSelecionado = 'Home';
  playlist: IPlaylist[] = [];

  //icones
  homeIcone = faHome;
  pesquisarIcone = faSearch;
  artistaIcone = faGuitar;
  playListIcone = faMusic;

  constructor(
    private spotifyService: SpotifyService,
    private router: Router
  ){

  }

  botaoClick(botao: string){
    this.menuSelecionado = botao;
    this.router.navigateByUrl('player/home');
  }

  ngOnInit(): void {
    this.buscarPlayLists();
  }

  async buscarPlayLists(){
    this.playlist = await this.spotifyService.buscarPlaylistUsuario();
  }

}
