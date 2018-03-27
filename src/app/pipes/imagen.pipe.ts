import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from './../config/config';

@Pipe({
    name: 'imagen'
})
export class ImagenPipe implements PipeTransform {
    transform(img: string, tipo: string = 'usuario'): any {
        let url = URL_SERVICIOS + '/img';

        // si no se envia ninguna imagen el servicio retornara no-image
        if (!img) {
            return url + '/usuario/no-image';
        }

        // si en la imagen viene un http, retorna la misma imagen
        if (img.indexOf('https') >= 0) {
            return img;
        }

        // devuele el url dependiendo del tipo consultado
        switch (tipo) {
            case 'usuario':
                url += '/usuarios/' + img;
                break;
            case 'medico':
                url += '/medicos/' + img;
                break;
            case 'hospital':
                url += '/hospitales/' + img;
                break;
            default:
                console.log('tipo de imagen no existe, permitidos usuarios, medicos, hospitales');
                url += '/usuario/no-image';
                break;
        }

        return url;
    }
}
