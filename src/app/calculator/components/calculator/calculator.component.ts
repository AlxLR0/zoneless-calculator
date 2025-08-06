import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CalculatorBottonComponent } from '../calculator-botton/calculator-botton.component';

@Component({
  selector: 'app-calculator',
  imports: [CalculatorBottonComponent],
  templateUrl: './calculator.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalculatorComponent { }
