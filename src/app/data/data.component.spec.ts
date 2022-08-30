import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { FakeService } from '../service/fake.service';

import { DataComponent } from './data.component';

describe('DataComponent', () => {
  let component: DataComponent;
  let fixture: ComponentFixture<DataComponent>;
  let fakeServiceMock: any;
  beforeEach(async () => {
    fakeServiceMock = {
      getDataV1: jest.fn()
    }
    await TestBed.configureTestingModule({
      declarations: [ DataComponent ],
      providers: [
        {
        provide: FakeService, useValue: fakeServiceMock
      }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('return service data', () =>{
    const expRes = {
      name: "murugan"
    };
    jest.spyOn(fakeServiceMock,'getDataV1').mockReturnValue(of(expRes));
    fixture.detectChanges();
    expect(component.serviceData.name).toBe(expRes.name)
  })
});
