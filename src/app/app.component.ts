import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = '';

  constructor() {}

  ngOnInit(): void {
    this.title = 'JEST'
  }

  sum(n1:number, n2:number){
    return n1+n2;
  }
  
}
