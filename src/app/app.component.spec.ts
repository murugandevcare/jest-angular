import { AppComponent } from "./app.component";

describe('FormComponent', () => {
  let component: AppComponent;
  beforeEach(() => {
    component = new AppComponent();
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});
