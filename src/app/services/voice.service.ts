import { Injectable } from '@angular/core';

import Speech from "speak-tts";

@Injectable({
  providedIn: 'root'
})
export class VoiceService {

  public speech = new Speech();
  
  constructor() { 
     // will throw an exception if not browser supported
    if(this.speech.hasBrowserSupport()) { // returns a boolean
      console.log("speech synthesis supported")
    }
    this.speech.init({
          'volume': 1,
          'lang': 'en-GB',
          'rate': 1,
          'pitch': 1,
          'voice':'Google UK English Male',
          'splitSentences': true,
          'listeners': {
             'onvoiceschanged': (voices) => {
                //  console.log("Event voiceschanged", voices)
             }
          }
    })
  }

  hablar(texto: string){
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

  estado() {
    return this.speech.speaking()
  }
  cancelar() {
    this.speech.cancel();
  }

}
