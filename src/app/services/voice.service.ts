import { Injectable } from '@angular/core';
import { TextToSpeech } from '@ionic-native/text-to-speech/ngx';
import Speech from "speak-tts";
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class VoiceService {

  public speech = new Speech();
  
  constructor(private tts: TextToSpeech,
              public platform: Platform) { 
     // will throw an exception if not browser supported
    this.inicializarSpeechAngular();
  }

  inicializarSpeechAngular(){
    if(this.speech.hasBrowserSupport()) { // returns a boolean
    }
    this.speech.init({
          'volume': 1,
          'lang': 'en-GB',
          'rate': 1,
          'pitch': 1,
          'voice':'Google UK English Female',
          'splitSentences': true,
          'listeners': {
             'onvoiceschanged': (voices) => {
                //  console.log("Event voiceschanged", voices)
             }
          }
    }) 
  }

  hablar(texto : string) {
    var plataforma = this.platform.platforms();
    // console.log('plataforma',plataforma);
        // if(this.estadoCheckBox()){
    if(plataforma[0] == 'desktop'){
      this.hablarWeb(texto);
    }else{
      this.hablarMovil(texto);
      // this.tts.speak(texto)
      // .then(() => console.log('Success'))
      // .catch((reason: any) => console.log(reason));
    }
        // }  
  }

  hablarWeb(texto: string){
    this.speech.speak({
      text: texto,
      queue: false,
      listeners: {
        onstart: () => {
            // console.log("Start utterance")
        },
        onend: () => {
            // console.log("End utterance")
        }
      }
    }).then(() => {
      return true;
    });
  }

  hablarMovil(texto: string){
     this.tts.speak(texto)
    .then(() => this.estadoHablarMovil(false))
    .catch((reason: any) => console.log(reason)); 
  }

  estadoHablarWeb() {
    return this.speech.speaking()
  }

  estadoHablarMovil(estado: boolean) {
    return estado;
  }

  cancelar() {
    this.speech.cancel();
  }

}
