import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';

declare function init_plugins();
// declar el objeto "gapi" de la liberia de Google cargada en el index.html para el SignIn
declare const gapi: any;

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    email: string;
    recuerdame: boolean = false;
    auth2: any;

    constructor(
        public router: Router,
        public _usuarioService: UsuarioService
    ) { }

    ngOnInit() {
        init_plugins();
        this.googleInit();

        this.email = localStorage.getItem('email') || '';
        if (this.email.length > 1) {
            this.recuerdame = true;
        }
    }

    googleInit() {
        gapi.load('auth2', () => {
            this.auth2 = gapi.auth2.init({
                client_id: '81834698535-2bi8ftec9v07jpu0qvosm3nsk2l3h084.apps.googleusercontent.com',
                cookiepolicy: 'single_host_origin',
                scope: 'profile email'
            });

            // escucha el evento del boton para realizar el inicio de sesion en google
            this.attachSignin( document.getElementById('btnGoogle') );
        });
    }

    attachSignin( element ) {
        this.auth2.attachClickHandler( element, {}, (googleUser) => {
            // let profile = googleUser.getBasicProfile();
            // console.log(profile);

            const token = googleUser.getAuthResponse().id_token;
            this._usuarioService.loginGoogle( token )
                // -- con navegate da un error en el diseño del template, queda todo montado
                // .subscribe( correcto => this.router.navigate(['/dashboard']) );
                // -- se soluciona con una redireccion manual con Vanilla JS
                .subscribe( correcto => window.location.href = '#/dashboard' );
        });
    }

    ingresar( forma: NgForm ) {
        if ( forma.invalid ) {
            return;
        }

        const usuario = new Usuario(
            null,
            forma.value.email,
            forma.value.password
        );

        this._usuarioService.login( usuario, forma.value.recuerdame )
            .subscribe( correcto => this.router.navigate(['/dashboard']) );
    }

}
