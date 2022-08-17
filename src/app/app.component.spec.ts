import { AppComponent } from "./app.component";

describe('AppComponent', () => {
  let fixture: AppComponent;
  beforeEach(() => {
    fixture = new AppComponent;
  })

  it('Should have the title JEST running on Angular', ()=> {
    expect(fixture.title).toEqual('JEST running on Angular');
  })

  it('should have add the value', () => {
    expect(fixture.sum(1,2)).toEqual(3)
  })

  it('null', () => {
    let i = null;
    expect(i).toBeNull();
    expect(i).toBeDefined();
    expect(i).not.toBeUndefined();
    expect(i).not.toBeTruthy();
    expect(i).toBeFalsy();
  })

  it('zero', ()=> {
    let j = 0;
    expect(j).not.toBeNull();
    expect(j).toBeDefined();
    expect(j).not.toBeUndefined();
    expect(j).not.toBeTruthy();
    expect(j).toBeFalsy();
  })

  it('adding two number', () => {
    let add = 2 + 2;
    expect(add).toBeGreaterThan(3);
    expect(add).toBeGreaterThanOrEqual(4);
    expect(add).toBeLessThan(5);
    expect(add).toBeLessThanOrEqual(4);
    expect(add).toBe(4)
  })

  it('adding floating point number', () => {
    let add = 0.1 + 0.2;
    expect(add).toBeCloseTo(0.3);
  })

  it('string match', () => {
    expect("murugan").not.toMatch(/D/);
    expect("murugan").toMatch(/gan/)
  })

  it("Array test", () => {
    let nameList = ["Murugan", "Devcare", "Tenkasi", "Tirunelveli"];
    expect(nameList).toContain("Murugan");
    let set = new Set(nameList);
    expect(set).toContain("Devcare")
  })

  it("adding positive numbers is not zero", ()=> {
    for(let i=1; i <= 10; i++){
      for(let j=1; j <= 10; j++){
        expect(i+j).not.toBe(0)
      }
    }
  })
})