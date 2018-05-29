import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Usuario } from '../../models/usuario.model';
import { URL_SERVICIOS } from '../../config/config';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class UsuarioService {
    usuario: Usuario;
    token: string;
    menu: any[] = [];

    constructor(
        public http: HttpClient,
        public router: Router,
        public _subirArchivoService: SubirArchivoService
    ) {
        this.cargarStorage();
    }

    renuevaToken() {
        let url = URL_SERVICIOS + '/login/renuevatoken';
        url += '?token=' + this.token;

        return this.http.get(url)
                    .map((resp: any) => {
                        this.token = resp.token;
                        localStorage.setItem('token', this.token);
                        console.log('Token renovado');
                        return true;
                    })
                    .catch( err => {
                        // swal('No se pudo renovar token', 'No fue posible renovar token', 'error');
                        this.logout();
                        return Observable.throw(err);
                    });
    }

    estaLogueado() {
        return this.token.length > 5 ? true : false;
    }

    cargarStorage() {
        if (localStorage.getItem('token')) {
            this.token = localStorage.getItem('token');
            this.usuario = JSON.parse(localStorage.getItem('usuario'));
            this.menu = JSON.parse(localStorage.getItem('menu'));
        } else {
            this.token = '';
            this.usuario = null;
            this.menu = [];
        }
    }

    guardarStorage(id: string, token: string, usuario: Usuario, menu: any) {
        localStorage.setItem('id', id);
        localStorage.setItem('token', token);
        localStorage.setItem('usuario', JSON.stringify(usuario));
        localStorage.setItem('menu', JSON.stringify(menu));

        // asigna valores para indicar que el usuario esta logueado
        this.usuario = usuario;
        this.token = token;
        this.menu = menu;
    }

    logout() {
        this.usuario = null;
        this.token = '';
        this.menu = [];

        localStorage.removeItem('token');
        localStorage.removeItem('usuario');
        localStorage.removeItem('menu');

        this.router.navigate(['/login']);
    }

    loginGoogle(token: string) {
        const url = URL_SERVICIOS + '/login/google';
        // envia el token como un objeto. { token } es lo mismo que { token: token }
        return this.http.post(url, { token })
                    .map((resp: any) => {
                        this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);
                        return true;
                    });
    }

    login(usuario: Usuario, recordar: boolean = false) {
        // si el usuario coloca "recuerdame" entonces graba el email en el localstorage para despues utilizarlo cuando vuela a ingresar
        if (recordar) {
            localStorage.setItem('email', usuario.email);
        } else {
            localStorage.removeItem('email');
        }

        const url = URL_SERVICIOS + '/login';
        return this.http.post(url, usuario)
                    .map((resp: any) => {
                        this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);
                        return true;
                    })
                    .catch( err => {
                        console.log(err.status);
                        console.log(err.error.mensaje);
                        swal('Error en el login', err.error.mensaje, 'error');
                        return Observable.throw(err);
                    });
    }

    crearUsuario(usuario: Usuario) {
        const url = URL_SERVICIOS + '/usuario';
        return this.http.post(url, usuario)
                    .map((resp: any) => {
                        swal('Usuario creado', usuario.email, 'success');
                        return resp.usuario;
                    })
                    .catch( err => {
                        swal(err.error.mensaje, err.error.errors.message, 'error');
                        return Observable.throw(err);
                    });
    }

    actualizarUsuario(usuario: Usuario) {
        let url = URL_SERVICIOS + '/usuario/' + usuario._id;
        url += '?token=' + this.token;

        return this.http.put(url, usuario)
                    .map((resp: any) => {
                        // si se esta actualizando a si mismo, entonces actualiza la informacion en el localstorage
                        if (usuario._id === this.usuario._id) {
                            const usuarioDB: Usuario = resp.usuario;
                            this.guardarStorage(usuarioDB._id, this.token, usuarioDB, this.menu);
                        }
                        swal('Usuario actualizado', usuario.nombre, 'success');
                        return true;
                    })
                    .catch( err => {
                        swal(err.error.mensaje, err.error.errors.message, 'error');
                        return Observable.throw(err);
                    });
    }

    cambiarImagen(archivo: File, id: string) {
        this._subirArchivoService
            .subirArchivo(archivo, 'usuarios', id)
            .then((resp: any) => {
                this.usuario.img = resp.usuario.img;
                swal('Imagen actualizada', this.usuario.nombre, 'success');
                this.guardarStorage(id, this.token, this.usuario, this.menu);
            })
            .catch(resp => {
                console.log(resp);
            });
    }

    cargarUsuarios(desde: number = 0) {
        const url = URL_SERVICIOS + '/usuario?desde=' + desde;
        return this.http.get(url);
    }

    buscarUsuarios(termino: string) {
        const url = URL_SERVICIOS + '/busqueda/coleccion/usuarios/' + termino;
        return this.http.get(url)
                    .map((resp: any) => resp.usuarios);
    }

    borrarUsuario(id: string) {
        let url = URL_SERVICIOS + '/usuario/' + id;
        url += '?token=' + this.token;
        return this.http.delete(url)
                    .map( resp => {
                        swal('Usuario borrado', 'El usuario ha sido eliminado correctamente', 'success');
                        return true;
                    });
    }
}

