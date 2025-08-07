import { ChangeDetectionStrategy, Component, HostListener, viewChildren } from '@angular/core';
import { CalculatorBottonComponent } from '../calculator-botton/calculator-botton.component';

@Component({
  selector: 'app-calculator',
  imports: [CalculatorBottonComponent],
  templateUrl: './calculator.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  // Escucha eventos de teclado globales
  // para manejar la entrada del usuario desde el teclado.
  host: {
      '(document:keydown)': 'handleKeyboardEvent($event)',
  },
})
export class CalculatorComponent { 
  // Usamos viewChildren para obtener una referencia a todos los botones de la calculadora
  // Esto nos permite interactuar con ellos desde el componente padre.
  // Puedes usar esta referencia para manejar eventos o lógica específica de los botones.
  // Por ejemplo, para manejar clics en los botones o eventos de teclado.
  public calculatorButtons = viewChildren(CalculatorBottonComponent);

  // Aquí puedes definir las propiedades y métodos necesarios para tu calculadora
  // Por ejemplo, una lista de botones y su lógica asociada.
  handleClick(key: string) {
    // Aquí puedes manejar la lógica del botón presionado
    console.log(`Botón presionado: ${key}`);
  }


  //para manejar eventos de teclado
  // Puedes usar @HostListener para escuchar eventos de teclado globales
  // y llamar a handleClick con la tecla presionada.
  // Por ejemplo, para manejar teclas numéricas y operaciones básicas:
  // @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    const key = event.key;
    // Aquí puedes manejar la lógica del evento de teclado
    this.handleClick(key);


    this.calculatorButtons().forEach((button)=>{
      button.keyboardPressedStyle(key);
    });


  }

}
