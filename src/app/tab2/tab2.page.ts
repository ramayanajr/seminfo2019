import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { AnotacoesService } from '../services/anotacoes.service';
import { TopicosService } from '../services/topicos.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  newTitulo; newNota;

  constructor(
    private alertController: AlertController,
    private noteService: AnotacoesService,
    private topService: TopicosService) {}

  addNota() {
    console.log('Enviar', this.newTitulo, this.newNota, 
    this.topService.topicos.filter((item, index, arr) => item.ativado).map(({nome}) => nome));
    this.noteService.addAnotacao(this.newTitulo, this.newNota, 
      this.topService.topicos.filter((item, index, arr) => item.ativado).map(({nome}) => nome));
  }

}
