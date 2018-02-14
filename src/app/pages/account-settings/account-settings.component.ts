import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services/service.index';

@Component({
    selector: 'app-account-settings',
    templateUrl: './account-settings.component.html',
    styles: []
})
export class AccountSettingsComponent implements OnInit {

    constructor( public _ajustes: SettingsService ) { }

    ngOnInit() {
        this.colocarCheck();
    }

    cambiarColor( tema: string, link: any) {
        // marca con un "check" el tema utilizado
        this.aplicarCheck( link );

        // cambia el tema seleccionado
        this._ajustes.aplicarTema( tema );
    }

    aplicarCheck( link: any ) {
        // obtiene todos los controles que tengan la clase "selector"
        const selectores: any = document.getElementsByClassName('selector');

        // recorre todos los controles para remover la clase "working"
        for (const ref of selectores) {
            ref.classList.remove('working');
        }

        // agrega la clase "working"
        link.classList.add('working');
    }

    colocarCheck() {
        const selectores: any = document.getElementsByClassName('selector');
        const tema = this._ajustes.ajuste.tema;

        for (const ref of selectores) {
            if ( ref.getAttribute('data-theme') === tema ) {
                ref.classList.add('working');
                break;
            }
        }
    }

}
