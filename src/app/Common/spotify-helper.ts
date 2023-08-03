import { addMilliseconds, format } from "date-fns";
import { IArtista } from "../interfaces/IArtista";
import { IMusica } from "../interfaces/IMusica";
import { IPlaylist } from "../interfaces/IPlaylist";
import { IUsuario } from "../interfaces/IUsuario";


export function SpotifyUserParaUsuario(user: SpotifyApi.CurrentUsersProfileResponse): IUsuario{
   return {
     id: user.id,
     nome: user.display_name,
     imagem: user.images.pop().url
   }
}

export function SpotifyPlaylistParaPlaylist(playlist: SpotifyApi.PlaylistObjectSimplified): IPlaylist{
  return{
    id: playlist.id,
    nome: playlist.name,
    imagemUrl: playlist.images.pop().url
  }
}

export function SpotifyArtistaParaArtista(artista: SpotifyApi.ArtistObjectFull): IArtista{
  return{
    id: artista.id,
    nome: artista.name,
    imagemUrl: artista.images.sort((a,b) => a.width - b.width).pop().url
  }
}

export function SpotifyTraksParaArtista(artista: SpotifyApi.TrackObjectFull): IArtista{
  return{    
    id: artista.id,
    nome: artista.name,
    imagemUrl: artista.album.images.sort((a,b) => a.width - b.width).pop().url
  }
}

export function SpotifyTraksParaMusica(track: SpotifyApi.TrackObjectFull): IMusica{

  const msParaMinutos = (ms: number) =>{
    const data = addMilliseconds(new Date(0), ms);
    return format(data, 'mm:ss');
  }
  return{
    id: track.uri,
    titulo: track.name,
    album:{
      id: track.album.id,
      imagemUrl: track.album.images.sort((a,b) => a.width - b.width).pop().url,
      nome: track.album.name
    },
    artistas: track.artists.map( artista => ({
      id: artista.id,
      nome: artista.name
    })),
    tempo: msParaMinutos(track.duration_ms)
  }
}