import { ChangeDetectionStrategy, Component, HostBinding, input } from '@angular/core';

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
  public isCommand = input(false,{
   transform: (value: boolean | string) =>
    typeof value === 'string' ? value === '': value,
  });
  public isNumber = input(false,{
   transform: (value: boolean | string) =>
    typeof value === 'string' ? value !== '': value,
  });

  // @HostBinding('class.is-command') get commandStyle() {
  //   return this.isCommand();
  // }
 }
