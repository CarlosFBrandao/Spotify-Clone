import { CanMatchFn, Router } from '@angular/router';
import { SpotifyService } from '../services/spotify.service';

export const guardLoginGuard: CanMatchFn = async (route, state) => {
  const spotifyService= new SpotifyService();
  const router: Router = new Router();
  
  if(!await spotifyService.inicializarUsuario()){  
    router.navigate(['/login']);
    return false;
  }
  else{
    return true;
  }
};
