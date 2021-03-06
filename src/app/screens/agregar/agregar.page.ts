import { Component, OnInit } from '@angular/core';
import { PedidosService } from 'src/app/services/pedidos.service';
import { ActivatedRoute } from '@angular/router';
import { Lista } from 'src/app/models/lista.model';
import { ListaItem } from 'src/app/models/lista-item.model';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {

  lista: Lista;
  nombreItem: string;

  constructor(private pedidosService: PedidosService,
              private router: ActivatedRoute) { 

    const pedidoId = this.router.snapshot.paramMap.get('pedidoId');
    
    this.lista = this.pedidosService.obtenerLista( pedidoId) ;
    console.log(this.lista);
  }

  ngOnInit() {
  }

  cambioCheck(item: ListaItem) {

    const pendientes = this.lista.items
                         .filter( itemData => !itemData.completado )
                         .length;
    
    if(pendientes === 0){
      this.lista.terminadaEn = new Date();
      this.lista.terminada = true;
    }
    else {
      this.lista.terminadaEn = null;
      this.lista.terminada = false;
    }
    
    this.pedidosService.guardarStorage();

  }

  agregarItem() {

    if(this.nombreItem.length === 0)
      return;

    const nuevoItem = new ListaItem( this.nombreItem);
    this.lista.items.push(nuevoItem);

    this.nombreItem = "";

    this.pedidosService.guardarStorage();
  }

  borrarItem(i: number){
    this.lista.items.splice( i , 1);
    this.pedidosService.guardarStorage();
  }
}
