import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

@Component({
    selector: 'app-usuarios',
    templateUrl: './usuarios.component.html',
    styles: []
})
export class UsuariosComponent implements OnInit {
    usuarios: Usuario[] = [];
    desde: number = 0;
    totalRegistros: number = 0;
    cargando: boolean = true;

    constructor(
        public _usuarioServices: UsuarioService,
        public _modalUploadService: ModalUploadService
    ) {}

    ngOnInit() {
        this.cargarUsuarios();

        // se subscribe a la emision del modal cuando realice la accion de subir una iamgen
        this._modalUploadService.notificacion
            .subscribe(resp => this.cargarUsuarios());
    }

    cargarUsuarios() {
        this.cargando = true;

        this._usuarioServices
            .cargarUsuarios(this.desde)
            .subscribe((resp: any) => {
                this.totalRegistros = resp.total;
                this.usuarios = resp.usuarios;
                this.cargando = false;
            });
    }

    cambiarDesde(valor: number) {
        const desde = this.desde + valor;

        // si el desde es mayor al total, retorna
        if (desde >= this.totalRegistros) {
            return;
        }

        // si el desde es menor a cero, retorna
        if (desde < 0) {
            return;
        }

        this.desde += valor;
        this.cargarUsuarios();
    }

    buscarUsuario(termino: string) {
        if (termino.length <= 0) {
            this.cargarUsuarios();
            return;
        }

        this.cargando = true;
        this._usuarioServices.buscarUsuarios( termino )
            .subscribe((usuarios: Usuario[]) => {
                this.usuarios = usuarios;
                this.cargando = false;
            });
    }

    borrarUsuario(usuario: Usuario) {
        // verifica que no se pueda eliminar a si mismo
        if (usuario._id === this._usuarioServices.usuario._id) {
            swal('No puede borrar usuario', 'No se puede borrar a si mismo', 'error');
            return;
        }

        swal({
            title: '¿Está seguro?',
            text: 'Está a punto de  borrar a ' + usuario.nombre,
            icon: 'warning',
            buttons: ['Cancelar', 'Eliminar'],
            dangerMode: true
        })
        .then((borrar) => {
            console.log(borrar);
            if (borrar) {
                this._usuarioServices.borrarUsuario(usuario._id)
                    .subscribe( borrado => {
                        this.desde = 0;
                        this.cargarUsuarios();
                    });
            }
        });
    }

    guardarUsuario(usuario: Usuario) {
        this._usuarioServices.actualizarUsuario(usuario)
            .subscribe();
    }

    mostrarModal(id: string) {
        this._modalUploadService.mostrarModal('usuarios', id);
    }
}
