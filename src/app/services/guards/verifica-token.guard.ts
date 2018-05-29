import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
// se cambia la implementacion de CanActivate a CanActivateChild para manejar el token en todas las paginas hijas
export class VerificaTokenGuard implements CanActivateChild {

    constructor(public _usuarioService: UsuarioService) {}

    canActivateChild(): Promise<boolean> | boolean {
        const token = this._usuarioService.token;

        // atob() => es una funcion nativa que decodifica un string construido en base64
        const payload = JSON.parse( atob( token.split('.')[1] ) );
        const expirado = this.expirado(payload.exp);

        if (expirado) {
            this._usuarioService.logout();
            return false;
        }

        // si el token es valido verifica si expirara en 4 horas mas
        return this.verificaRenueva(payload.exp);
    }

    verificaRenueva(fechaExp: number): Promise<boolean> {
        return new Promise((resolve, reject) => {
            // construye la fecha expiracion que esta en segundos en fecha en milisegundos
            const tokenExp = new Date( fechaExp * 1000);
            const ahora = new Date();

            // al tiempo actual le suma 2 horas convertidas en milisegundos
            ahora.setTime( ahora.getTime() + (2 * 60 * 60 * 1000));
            // console.log(tokenExp);
            // console.log(ahora);

            // si el token expirara en mas de 4 horas, no se hace renovacion del token
            if (tokenExp.getTime() > ahora.getTime()) {
                resolve(true);
            } else {
                this._usuarioService.renuevaToken()
                    .subscribe(() => {
                        resolve(true);
                    }, () => {
                        this._usuarioService.logout();
                        reject(false);
                    });
            }


            resolve(true);
        });
    }

    expirado(fechaExp: number) {
        // obtiene fecha actual en segundos
        const ahora = new Date().getTime() / 1000;

        if (fechaExp < ahora) {
            return true;
        } else {
            return false;
        }
    }
}
