import { Component, signal } from '@angular/core';
import { EncryptService } from './encrypt.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.scss'
})
export class App {
  name = "";
  encrypted = "";
  status = "Esperando";
  recognition: any;
  listening: boolean = false;

  constructor(private encryptService: EncryptService) { }


  ngOnInit(): void {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    this.recognition = new SpeechRecognition();
    this.recognition.lang = 'es-ES';
    this.recognition.interimResults = true;   // resultados parciales en tiempo real
    this.recognition.continuous = true;       // no se detiene al terminar

    this.recognition.onresult = (event: any) => {
      let transcript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      // limpiar y limitar
      transcript = transcript.replace(/[^a-zA-Z0-9]/g, '').slice(0, 15);
      this.name = transcript;
    };

    this.recognition.onstart = () => this.listening = true;
    this.recognition.onend = () => this.listening = false;
    this.recognition.onerror = (e: any) => console.error('Error:', e.error);
  }

  toggleListening(): void {
    if (this.listening) {
      this.recognition.stop();
    } else {
      this.recognition.start();
    }
  }

  ngOnDestroy(): void {
    if (this.listening) {
      this.recognition.stop();
    }
  }

  sendToEncrypt() {
    if (!this.name) return;
    this.encryptService.encrypt(this.name).subscribe({
      next: (res) => (this.encrypted = res.encrypted),
      error: () => (this.encrypted = "Error al encriptar"),
    });
  }
}
