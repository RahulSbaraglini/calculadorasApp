import { Component } from '@angular/core';
import { evaluate } from 'mathjs'
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  public calculo = ''; //vazia
  public resultado: string; //null

  private ponto = false;

  private operacoes = ['+', '-', '*', '/'];

  constructor(public alertController: AlertController) { }

  public adicionarNumero(valor: string) {
    if(this.resultado){
      this.apagarTudo();
    }
    this.calculo = this.calculo + valor;
  }

  public adicionarPonto() {
    if (this.ponto) {
      return;
    }

    this.calculo += ".";
    this.ponto = true;
  }

  public adicionarOperacao(operador: string) {

    if(this.resultado){
      this.calculo = this.resultado.toString();
      this.resultado = null;
    }
    const ultimo = this.calculo.slice(-1);
    if (this.operacoes.indexOf(ultimo) > -1) {
      return;
    }

    this.calculo += operador;
    this.ponto = false;
  }

  public apagarTudo() {
    this.calculo = '';
    this.resultado = null;
    this.ponto = false;
  }

  public apagarUltimo() {
    const ultimo = this.calculo.slice(-1);
    if (ultimo == '.') {
      this.ponto = false;
    }

    this.calculo = this.calculo.slice(0, -1);
  }

  public calcularResultado() {
    try {
      this.resultado = evaluate(this.calculo);
    } catch (e) {
      this.resultado = '';
      this.presentAlert('ERRO!!!', 'Cálculo inválido, verifique!');
    }
  }

  async presentAlert(titulo: string, mensagem: string) {
    const alert = await this.alertController.create({
      header: 'ERRO!!!',
      message: mensagem,
      buttons: ['OK']
    });

    await alert.present();
  }
}
