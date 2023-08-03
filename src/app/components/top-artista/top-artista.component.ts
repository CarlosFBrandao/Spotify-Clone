import { Component, OnInit } from '@angular/core';
import { newArtista } from 'src/app/Common/factores';
import { IArtista } from 'src/app/interfaces/IArtista';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-top-artista',
  templateUrl: './top-artista.component.html',
  styleUrls: ['./top-artista.component.scss']
})
export class TopArtistaComponent implements OnInit {

  topArtista: IArtista = newArtista();
  titulo: string = "";

  constructor(
    private spotifyService: SpotifyService
  ){

  }
  ngOnInit(): void {
    this.buscarArtista();
  }

  async buscarArtista(){
    const artistas = await this.spotifyService.BuscarTopArtistas();
    if(artistas.length > 0){
      this.topArtista = artistas.pop();
      this.titulo = "Seu Top Artista";
    }
    else{
      this.buscarMusicas();
      this.titulo = "Sua Top Musica"
    }
  }

  async buscarMusicas(){
    const musicas = (await this.spotifyService.BuscarTopMusicas()).pop()
    
    console.log(musicas);
    this.topArtista = {
      id: musicas.id,
      nome: musicas.album.nome,
      artista: this.spotifyService.obterArtista(musicas),
      imagemUrl: musicas.album.imagemUrl
    }    

  }
}
