import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Injectable()
export class SettingsService {
    ajuste: Ajustes = {
        temaUrl: 'assets/css/colors/default-dark.css',
        tema: 'default-dark'
    };

    // @Inject(DOCUMENT) private _document: obtiene referencia del DOM de la pagina
    constructor( @Inject(DOCUMENT) private _document ) {
        this.cargarAjustes();
    }

    guardarAjustes() {
        localStorage.setItem('ajustes', JSON.stringify( this.ajuste ));
    }

    cargarAjustes() {
        if ( localStorage.getItem('ajustes') ) {
            this.ajuste = JSON.parse( localStorage.getItem('ajustes') );
        }

        this.aplicarTema( this.ajuste.tema );
    }

    aplicarTema( tema: string ) {
        const url = `assets/css/colors/${ tema }.css`;
        this._document.getElementById('tema').setAttribute('href', url);

        // guarda los datos en el servicio
        this.ajuste.tema = tema;
        this.ajuste.temaUrl = url;
        this.guardarAjustes();
    }

}

interface Ajustes {
    temaUrl: string;
    tema: string;
}
