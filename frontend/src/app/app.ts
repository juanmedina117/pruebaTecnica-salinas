import { Component, ElementRef, signal, ViewChild } from '@angular/core';
import { EncryptService } from './encrypt.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.scss'
})
export class App {
  @ViewChild('campo') campo!: ElementRef;
  @ViewChild('contador') contador!: ElementRef;

  name = "";
  status = "🎤 Iniciar";
  encrypted = "";
  recognition: any;
  isListening = false; // 👉 control interno
  longitud: number = 0;

  constructor(private encryptService: EncryptService) {
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

      if (SpeechRecognition) {
        this.recognition = new SpeechRecognition();
        this.recognition.lang = "es-ES";
        this.recognition.interimResults = true;
        this.recognition.continuous = true;

        this.recognition.onresult = (event: any) => {
          let transcript = "";
          for (let i = event.resultIndex; i < event.results.length; i++) {
            transcript += event.results[i][0].transcript;
          }
          this.name = transcript.replace(/[^a-zA-Z0-9]/g, "").slice(0, 15);
          console.log("Transcripción:", this.name);
          this.campo.nativeElement.value = this.name;
          this.contador.nativeElement.textContent = `${this.name.length}/15 caracteres`;


        };


        this.recognition.onstart = () => {
          this.isListening = true;

        };

        this.recognition.onend = () => {
          this.isListening = false;
        };

        this.recognition.onerror = (e: any) => {
          console.error("Error:", e.error);
          this.status = "Error: " + e.error;
          this.isListening = false;
        };
      }
    }
  }

  toggleListening() {

    if (!this.recognition) return;

    if (this.isListening) {
      this.recognition.stop();
      this.status = "⏹ Detenido";
      this.sendToEncrypt();

    } else {
      this.recognition.start();
      this.status = "🎤 Escuchando...";


    }
  }


  contadorLetras(palabra: string) {
    console.log(palabra.length);

    this.longitud = palabra.length;
  }



  sendToEncrypt() {
    if (!this.name) return;
    this.encryptService.encrypt(this.name).subscribe({
      next: (res) => (this.encrypted = res.encrypted),
      error: () => (this.encrypted = "Error al encriptar"),
    });
  }
}
