import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'app-rxjs',
    templateUrl: './rxjs.component.html',
    styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

    subcription: Subscription;

    constructor() {
        // retry(2) => vuelve a ejecutar el observable en caso de algun error 2 veces
        this.subcription = this.regresaObservable()
           // .retry(2) se comenta para el ejemplo y se coloca en la definicion del observable mas abajo
           .subscribe(
            // callback para next
            numero => console.log('Subs', numero),
            // callback para el error
            error => console.error('Error en el obs (dos veces)', error),
            // callback cuando termino (complete)
            () => console.log('El observador termino!')
        );
    }

    ngOnInit() {
    }

    ngOnDestroy() {
        this.subcription.unsubscribe();
    }

    regresaObservable(): Observable<any> {
        return new Observable( observer => {
            let contador = 0;

            const intervalo = setInterval( () => {
                contador += 1;

                const salida = {
                    valor: contador
                };

                // el obervador emite el valor
                observer.next( salida );

                // if (contador === 3) {
                //     clearInterval(intervalo);
                //     // finaliza la emision del observable
                //     observer.complete()
                // }

                // // emite un error
                // if (contador === 2 ) {
                // tslint:disable-next-line:max-line-length
                //     // al comentar el clearInterval, la ejecucion del contador del observador no comienza de 0 nuevamente, sino que continua su incremento normalmente hasta que llega a 3
                //     // clearInterval(intervalo);
                //     observer.error('Auxilio!');
                // }
            }, 500);

        })
        // retry(2) => vuelve a ejecutar el observable en caso de algun error 2 veces
        .retry(2)
        // map() => modifica la respuesta del observable en el objeto que se desee regresar: numero, booleano, string, array, etc
        .map( (resp: any) => {
            return resp.valor;
        })
        // filter() => permite filtrar la informacion que retorna el observable bajo ciertas condiciones. Retorna un valor booelano
        // primer parametro es obligatorio, el segundo es opcional. index devuelve la posicion donde se ejecuto el filtro
        .filter( (valor, index) => {
            // console.log(' Filter', valor, index);

            if ( (valor % 2) === 1 ) {
                // es numero impar, lo devuelve
                return true;
            } else {
                // es numero par, lo ignora
                return false;
            }
        });

    }

}
