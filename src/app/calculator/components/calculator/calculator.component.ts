import { ChangeDetectionStrategy, Component, computed, HostListener, inject, viewChildren } from '@angular/core';
import { CalculatorBottonComponent } from '../calculator-botton/calculator-botton.component';
import { CalculatorService } from '../../services/calculator.service';

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
  // Inyectamos el servicio de calculadora para acceder a sus propiedades y métodos
  private calculatorService = inject(CalculatorService);

  // Usamos viewChildren para obtener una referencia a todos los botones de la calculadora
  // Esto nos permite interactuar con ellos desde el componente padre.
  // Puedes usar esta referencia para manejar eventos o lógica específica de los botones.
  // Por ejemplo, para manejar clics en los botones o eventos de teclado.
  public calculatorButtons = viewChildren(CalculatorBottonComponent);

  // Aquí puedes definir las propiedades y métodos necesarios para tu calculadora
  // Por ejemplo, una lista de botones y su lógica asociada.
  handleClick(key: string) {
    // Aquí puedes manejar la lógica del botón presionado
    // console.log(`Botón presionado: ${key}`);

    this.calculatorService.construcNumber(key);

  }

  // Computed properties para acceder a los valores del servicio de calculadora
  public resulText = computed(()=> this.calculatorService.resultText())
  public subRresulText = computed(()=> this.calculatorService.subResultText())
  public lastOperator = computed(()=> this.calculatorService.lastOperator())


  //para manejar eventos de teclado
  // Puedes usar @HostListener para escuchar eventos de teclado globales
  // y llamar a handleClick con la tecla presionada.
  // Por ejemplo, para manejar teclas numéricas y operaciones básicas:
  // @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    const keyEquivalents: Record<string, string> = {
      'Enter': '=',
      'Backspace': 'C',
      'Escape': 'CE',
      '*': 'X',
      '/': '÷',
    }

    const key = event.key;
    const keyValue = keyEquivalents[key] ?? key;
    // Aquí puedes manejar la lógica del evento de teclado
    // Por ejemplo, si la tecla presionada es una de las teclas numéricas o de operación
    this.handleClick(keyValue);
 

    this.calculatorButtons().forEach((button)=>{
      button.keyboardPressedStyle(keyValue);
    });


  }

}
