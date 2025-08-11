import { Injectable, signal } from '@angular/core';

// El servicio de calculadora maneja el estado y la lógica de la calculadora
// Utiliza señales para mantener el estado reactivo de los resultados y operadores
// Esto permite que los componentes que dependen de este servicio se actualicen automáticamente

// Define los tipos de botones que se pueden usar en la calculadora
const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const operators = ['+', '-', 'X', '÷'];
const specialOpeators = ['+/-', '%', '.','=','C', 'Backspace'];


@Injectable({
  providedIn: 'root'
})
export class CalculatorService {

  public resultText = signal('0');
  public subResultText = signal('0');
  public lastOperator = signal('+');

  public construcNumber(value: string):void{

    //validar input
    if (![...numbers, ...operators, ...specialOpeators].includes(value)) {
      console.log('invalid input:', value);
      return;
    }
    
    //=
    if (value === '=') {
      this.calcutaleResult();// Calcular el resultado antes de finalizar
      // console.log('calcular resultado');
      return;
    }
    //C
    if (value === 'C') {
      this.resultText.set('0');
      this.subResultText.set('0');
      this.lastOperator.set('+');
      return;
    }

    //backspace
    if (value === 'Backspace') {
      if (this.resultText()==='0') return; // Si el resultado es '0', no hacemos nada
     
      if (this.resultText().length === 1) { // Si solo queda un dígito, lo reiniciamos a '0'
        this.resultText.set('0'); // Reiniciamos el resultado a '0'
        return;
      }
      
      // Si hay más de un dígito, eliminamos el último
      this.resultText.update((current) => current.slice(0, -1)); // Eliminamos el último dígito

      return;
    }


    // aplicar operador
    if (operators.includes(value)) {
      this.calcutaleResult();// Calcular el resultado antes de aplicar el nuevo operador
      this.lastOperator.set(value);// Actualizar el último operador
      this.subResultText.set(this.resultText());// Guardar el resultado actual como subresultado
      this.resultText.set('0');// Reiniciar el resultado a '0' para la siguiente operación
      return; 
    }

    //limitar numeros de caracteres
    if (this.resultText().length >= 10) {// Si ya hay 10 caracteres, no hacer nada
      console.log('Número máximo de caracteres alcanzado');
      return; // No hacer nada si ya se alcanzó el límite
    }

    //validar punto decimal
    if (value === '.') {
      if (this.resultText().includes('.')) return; // Si ya hay un punto, no hacer nada
      this.resultText.update(text => text + '.');
      return;
    }

    // ================================================================================================
    // INICIO: Lógica refactorizada para la construcción de números y cambio de signo.
    // La lógica anterior tenía problemas con la duplicación de números y el manejo de ceros.
    // ================================================================================================

    // Construir el número
    if (numbers.includes(value)) {
      // Manejo de ceros iniciales para prevenir '00' o '-00'
      if (value === '0' && (this.resultText() === '0' || this.resultText() === '-0')) {
        return; // Si ya es '0' o '-0', no hacer nada al presionar '0'
      }

      // Si el resultado actual es '0', se reemplaza con el nuevo número.
      if (this.resultText() === '0') {
        this.resultText.set(value);
        return; // Salir después de manejar el número
      }
      // Si es '-0', se reemplaza con '-<numero>'
      if (this.resultText() === '-0') {
        this.resultText.set('-' + value);
        return; // Salir después de manejar el número
      }
      
      // Para cualquier otro caso, se concatena el número.
      this.resultText.update(current => current + value);
      return; // Importante: Salir para evitar que se ejecute código no deseado más abajo.
    }

    //manejo de el cero inicial
    /*
      // Se comenta este bloque porque la lógica se ha integrado en el bloque "Construir el número" de arriba.
      if (value === '0' && (this.resultText() === '0' || this.resultText() === '-0')) {// Si el resultado es '0' o '-0' y se presiona '0'
        return; // No permitir múltiples ceros al inicio
      }
    */

    //cambio de signo
    if (value === '+/-') {// Si se presiona el botón de cambio de signo
      // Manejo especial para '0' y '-0' para alternar entre ellos
      if (this.resultText() === '0') {
        this.resultText.set('-0');
        return;
      }
      if (this.resultText() === '-0') {
        this.resultText.set('0');
        return;
      }

      if (this.resultText().includes('-')) { // Si el número ya es negativo
        this.resultText.update(text => text.slice(1));// Remover el signo negativo
        return;
      }

      this.resultText.update(text=> '-' + text);// Agregar el signo negativo al inicio
      return;
    }


    

  }

  public calcutaleResult(){
    const number1 = parseFloat(this.subResultText());
    const number2 = parseFloat(this.resultText());


    let result = 0;

    switch (this.lastOperator()) {
      case '+':
        result = number1 + number2;
        break;
      case '-':
        result = number1 - number2;
        break;
      case 'X':
        result = number1 * number2;
        break;
      case '÷':
        if (number2 === 0) {
          console.error('Error: División por cero');
          return; // Manejo de error para división por cero
        }
        result = number1 / number2;
        break;
      default:
        console.error('Operador desconocido:', this.lastOperator());
        return; // Manejo de error para operador desconocido
    }

    this.resultText.set(result.toString());
    this.subResultText.set('0');

  }


}
