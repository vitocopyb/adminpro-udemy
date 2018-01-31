import { Component, OnInit, Input, Output, ViewChild, EventEmitter, ElementRef } from '@angular/core';

@Component({
    selector: 'app-incrementador',
    templateUrl: './incrementador.component.html',
    styles: []
})
export class IncrementadorComponent implements OnInit {
    // propiedades de entrada
    @Input('nombre') leyenda: string = 'Leyenda';
    @Input() progreso: number = 50;

    // propiedades de salida
    @Output('actualizaValor') cambioValor: EventEmitter<number> = new EventEmitter();

    // referencias a elementos html del componente
    @ViewChild('txtProgress') txtProgress: ElementRef;

    constructor() {
        // console.log('constructor - leyenda', this.leyenda);
        // console.log('constructor - progreso', this.progreso);
    }

    ngOnInit() {
        // console.log('ngOnInit - leyenda', this.leyenda);
        // console.log('ngOnInit - progreso', this.progreso);
    }

    onChanges( newValue: number) {
        // se cambia por el uso del txtProgress
        /*
        // obtiene el primer obj html
        const elemHTML: any = document.getElementsByName('progreso')[0];
        */

        if (newValue >= 100) {
            this.progreso = 100;
        } else if (newValue <= 0) {
            this.progreso = 0;
        } else {
            this.progreso = newValue;
        }

        // se cambia por el uso del txtProgress
        // elemHTML.value = this.progreso;
        this.txtProgress.nativeElement.value = this.progreso;

        this.cambioValor.emit( this.progreso );
    }

    cambiarValor(valor: number) {
        if (this.progreso >= 100 && valor > 0) {
            this.progreso = 100;
            return;
        }

        if (this.progreso <= 0 && valor < 0) {
            this.progreso = 0;
            return;
        }

        this.progreso = this.progreso + valor;

        // emite valor para el Output
        this.cambioValor.emit( this.progreso );

        // asigna el foco al elemento html
        this.txtProgress.nativeElement.focus();
    }
}
