import { ChangeDetectionStrategy, Component, ElementRef, inject, input, output, signal, viewChild } from '@angular/core';

@Component({
  selector: 'app-calculator-botton',
  imports: [],
  templateUrl: './calculator-botton.component.html',
  styleUrl: './calculator-botton.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'w-1/4 border-r border-b border-indigo-400',
  }
})
export class CalculatorBottonComponent {
  private elementRef = inject(ElementRef);
  public contentValue = viewChild<ElementRef<HTMLButtonElement>>('button');
  public isPressed = signal(false);

  // Definimos un output para emitir el valor del botón cuando se hace clic
  // Este output se puede escuchar en el componente padre (CalculatorComponent)
  // para manejar la lógica del botón presionado.
 
  public buttonClick = output<string>();

  public isCommand = input(false,{
   transform: (value: boolean | string) =>
    typeof value === 'string' ? value === '': value,
  });
  public isNumber = input(false,{
   transform: (value: boolean | string) =>
    typeof value === 'string' ? value === '': value,
  });


  // Este método se llama cuando se hace clic en el botón
  handleClick(){
    if (!this.contentValue()?.nativeElement){
      return;
    }
    const buttonValue = this.elementRef.nativeElement.textContent?.trim() ?? '';
    const value = this.contentValue()!.nativeElement.innerText;
    // this.buttonClick.emit(buttonValue);
    this.buttonClick.emit(value.trim());
  }


  // Método para manejar el evento de teclado
  public keyboardPressedStyle(key: string){
    // Verifica si el botón tiene un valor definido
    if (!this.contentValue()) return;

    // Verifica si el valor del botón coincide con la tecla presionada
    const value = this.contentValue()!.nativeElement.innerText;
    // Si el valor del botón no coincide con la tecla presionada, no hacemos nada
    if (value !== key) return;
    // Si el valor del botón coincide con la tecla presionada, aplicamos el estilo
    this.isPressed.set(true);

    // Después de un breve retraso, eliminamos el estilo
    // para que el botón vuelva a su estado normal.
    // Esto simula el efecto de un botón presionado.
    setTimeout(() => {
      this.isPressed.set(false);
    }, 100);
  }
 }
