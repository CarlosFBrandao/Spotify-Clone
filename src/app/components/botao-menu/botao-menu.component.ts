import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-botao-menu',
  templateUrl: './botao-menu.component.html',
  styleUrls: ['./botao-menu.component.scss']
})
export class BotaoMenuComponent {

  @Input()
  descricao: string = '';
  
  @Input()
  selecionado = false;

  @Output()
  click = new EventEmitter<void>();

  onClick(){
    this.click.emit();
  }
}
