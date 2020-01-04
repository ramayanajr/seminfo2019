import { Injectable } from "@angular/core";
import { Storage } from "@ionic/storage";
import { SocialSharing } from "@ionic-native/social-sharing/ngx";
import { ActionSheetController } from "@ionic/angular";

@Injectable({
  providedIn: "root"
})
export class AnotacoesService {
  public anotacoes: any = [];

  constructor(
    private db: Storage,
    private socialSharing: SocialSharing,
    public actionSheetCtrl: ActionSheetController
  ) {
    this.getAnotacoes();
  }

  getAnotacoes() {
    this.db
      .get("anotacoes")
      .then(data => {
        if (data) {
          this.anotacoes = data;
        }
        console.log("GetAnotacoes", this.anotacoes);
      })
      .catch(error => {
        console.error("Deu erro:", error);
      });
  }

  setAnotacoes() {
    this.db.set("anotacoes", this.anotacoes);
  }

  addAnotacao(titulo, anotacao, tags) {
    this.anotacoes.unshift({ titulo, anotacao, tags });
    this.setAnotacoes();
  }

  addFotoAnotacao(titulo, foto, tags) {
    this.anotacoes.unshift({ titulo, foto, tags });
    this.setAnotacoes();
  }

  deletar(tituloAnotacao) {
    this.anotacoes = this.anotacoes.filter(t => t.titulo !== tituloAnotacao);
    this.setAnotacoes();
    // this.storageProvider.setItem('tarefas', this.anotacoes);
  }

  async compartilhar(anotacao) {
    console.log("Tô compartilhando: ", anotacao.titulo);
    const share = await this.actionSheetCtrl.create({
      buttons: [
        {
          text: "Compartilhar com Facebook",
          icon: "logo-facebook",
          handler: () => {
            this.socialSharing.shareViaFacebook(
              anotacao.titulo,
              anotacao.anotacao,
              anotacao.tags
            );
          }
        },
        {
          text: "Compartilhar com Whatsapp",
          icon: "logo-whatsapp",
          handler: () => {
            this.socialSharing.shareViaWhatsApp(
              anotacao.titulo,
              anotacao.anotacao,
              anotacao.tags
            );
          }
        },
        {
          text: "Compartilhar com Twitter",
          icon: "logo-twitter",
          handler: () => {
            this.socialSharing.shareViaTwitter(
              anotacao.titulo,
              anotacao.anotacao,
              anotacao.tags
            );
          }
        },
        {
          text: "CANCELAR",
          role: "cancel",
          handler: () => {
            console.log("Cancel clicked");
          }
        }
      ]
    });
    share.present();
  }
}
