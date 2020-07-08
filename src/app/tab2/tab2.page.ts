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
  
  //variável para as contas
  private operacoes = ['+', '-', '*', '/'];

  constructor(public alertController: AlertController) { }

  //apagar para próxima conta
  public adicionarNumero(valor: string) {
    if(this.resultado){
      this.apagarTudo();
    }
    this.calculo = this.calculo + valor;
  }
  
  //adicionar o ponto na conta e fazer com que ele não se repita no mesmo número
  public adicionarPonto() {
    if (this.ponto) {
      return;
    }

    this.calculo += ".";
    this.ponto = true;
  }
  
  //fazer com que o ponto se repita após as contas
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
  
  //Configuração do botão C da calculadora, que o objetivo é: apagar tudo
  public apagarTudo() {
    this.calculo = '';
    this.resultado = null;
    this.ponto = false;
  }

  //Configuração do botão DEL, que o objetivo é: apagar o último número
  public apagarUltimo() {
    const ultimo = this.calculo.slice(-1);
    if (ultimo == '.') {
      this.ponto = false;
    }

    this.calculo = this.calculo.slice(0, -1);
  }
  
  //calcular o resultado das contas
  public calcularResultado() {
    try {
      this.resultado = evaluate(this.calculo);
    } catch (e) {
      this.resultado = '';
      this.presentAlert('ERRO!!!', 'Cálculo inválido, verifique!');
    }
  }
  
  //configuração da mensagem de erro
  async presentAlert(titulo: string, mensagem: string) {
    const alert = await this.alertController.create({
      header: 'ERRO!!!',
      message: mensagem,
      buttons: ['OK']
    });

    await alert.present();
  }
}
