import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {

  let fixture = ComponentFixture<AppComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should be 3', () => { // esto es un test de ejemplo
    // Aquí puedes escribir un test que verifique que 1 + 2 es igual a 3
    //A= Arrange que es preparar los datos necesarios para el test
    const num1 = 1;
    const num2 = 2;

    //A= Act que es ejecutar la acción que queremos probar
    const result = num1 + num2;
    
    //A= Assert que es verificar que el resultado es el esperado
    expect(result).toBe(3);// Aquí verificamos que el resultado es 3
  });

 



  // it(`should have the 'zoneless-calculator' title`, () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.componentInstance;
  //   expect(app.title).toEqual('zoneless-calculator');
  // });

  // it('should render title', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement as HTMLElement;
  //   expect(compiled.querySelector('h1')?.textContent).toContain('Hello, zoneless-calculator');
  // });
});
