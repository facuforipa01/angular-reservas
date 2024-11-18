import { Component, Input, model } from '@angular/core';

@Component({
  selector: 'its-input',
  templateUrl: './input.component.html',
  styleUrl: './input.component.css',
})
export class InputComponent {
  value = model<string>();

  /** Le da el tipo a la etiqueta input */
  @Input() type: string = 'text';
  /** El valor del placeholder */
  @Input() placeholder: string = 'Add a placeholder here...';
  /** Determina si mostrar o no el icono de la contraseña */
  @Input() showIcon: boolean = false;

  @Input() name : string = '';
 
  @Input() clave: string = 'ingresa contraseña';

  /** El nombre del icono */
  icon = 'eye.svg';
  /** Realiza un toggle entre los iconos */
  showPassword() {
    switch (this.icon) {
      case 'eye.svg': {
        this.type = 'text';
        this.icon = 'eye-slash.svg';
        break;
      }
      case 'eye-slash.svg': {
        this.type = 'password';
        this.icon = 'eye.svg';
        break;
      }
      default: {
        this.type = 'password';
        this.icon = 'eye.svg';
        break;
      }
    }
  }
}



