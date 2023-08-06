import { Injectable } from '@angular/core';
import { SpotifyConfiguration } from 'src/environments/enviroment.pod';
import Spotify from 'spotify-web-api-js';
import { IUsuario } from '../interfaces/IUsuario';
import { SpotifyArtistaParaArtista, SpotifyPlaylistParaPlaylist, SpotifyTraksParaArtista, SpotifyTraksParaMusica, SpotifyUserParaUsuario } from '../Common/spotify-helper';
import { Router } from '@angular/router';
import { IPlaylist } from '../interfaces/IPlaylist';
import { IArtista } from '../interfaces/IArtista';
import { IMusica } from '../interfaces/IMusica';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  spotifyApi: Spotify.SpotifyWebApiJs = new Spotify();
  usuario: IUsuario = null;  
  private router: Router = new Router();

  constructor(
  ) {
  }

  obterUrlLogin(): string {
    const authEndpoint = `${SpotifyConfiguration.authEndpoint}?`;
    const clientId = `client_id=${SpotifyConfiguration.clientId}&`;
    const redirectUrl = `redirect_uri=${SpotifyConfiguration.redirectUrl}&`;
    const scopes = `scope=${SpotifyConfiguration.scopes.join('%20')}&`;
    const resonseType = `response_type=token&show_dialog=true`;
    return authEndpoint + clientId + redirectUrl + scopes + resonseType;
  }

  obterTokenUrlCallback() {
    if (!window.location.hash) {
      return '';
    }
    const params = window.location.hash.substring(1).split('&');
    return params[0].split('=')[1];
  }

  obterArtista(musica: IMusica){
    return musica.artistas.map(artista => artista.nome).join(', ')
  }

  async inicializarUsuario() {
    if(this.usuario)
      return true;

    const token = localStorage.getItem('token');

    if(!token){          
      return false;
    }
    try {

      this.definirAccessToken(token);
      await this.obterSpotifyUsuario();
      return !!this.usuario;

    }catch(ex){
      return false;
    }
  }

  async obterSpotifyUsuario(){
    const userInfo = await this.spotifyApi.getMe();    
    this.usuario = SpotifyUserParaUsuario(userInfo);
  }

  definirAccessToken(token: string){
    this.spotifyApi.setAccessToken(token);
    localStorage.setItem('token', token);
  }

  naoAutenticado() {    
    this.router.navigate(['/login']);
    localStorage.clear();
    return false;
  }

  async buscarPlaylistUsuario(offset: number = 0, limit:number = 50): Promise<IPlaylist[]>{

    if(!this.usuario){
      await this.obterSpotifyUsuario();
    }
    const playlist = await this.spotifyApi.getUserPlaylists(this.usuario?.id, {
      offset,
      limit
    });
    return playlist.items.map(SpotifyPlaylistParaPlaylist);

  }

  async BuscarTopArtistas(limit = 10):Promise<IArtista[]>{
    const artistas = await this.spotifyApi.getMyTopArtists({limit})
    return artistas.items.map(SpotifyArtistaParaArtista); 
  }

  async BuscarTopMusicas(limit = 10):Promise<IMusica[]>{
    const musicas = await this.spotifyApi.getMyTopTracks({limit});
    console.log(musicas);
    return musicas.items.map(SpotifyTraksParaMusica);
  }

  async buscarMusicasCurtidas(offset = 0, limit = 50):Promise<IMusica[]>{

    const musicas = await this.spotifyApi.getMySavedTracks({offset, limit});
    return musicas.items.map(x => SpotifyTraksParaMusica(x.track));

  }

  async executarMusica(musicaId: string){
    await this.spotifyApi.queue(musicaId);
    await this.spotifyApi.skipToNext();
  }

  async obterMusicaAtual(): Promise<IMusica>{
    const musica =  await this.spotifyApi.getMyCurrentPlayingTrack();
    return SpotifyTraksParaMusica(musica.item);
  }
}
