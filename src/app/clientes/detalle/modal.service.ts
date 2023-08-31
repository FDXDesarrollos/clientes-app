import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modal: boolean = false;
  private _notificarUpload = new EventEmitter<any>();

  constructor() {  }

  abrirModal(): void {
    this.modal = true;
  }

  cerrarModal(): void {
    this.modal = false;
  }

  getStatusModal(): boolean {
    return this.modal;
  }

  get notificarUpload(): EventEmitter<any>{
    return this._notificarUpload;
  }
}
