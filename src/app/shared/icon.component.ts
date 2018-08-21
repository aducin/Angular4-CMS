import { Component, Input } from '@angular/core';

@Component({
  selector: 'sort-icon',
  template: `
  <i 
    [ngClass]="{'fa-sort-asc': sortBy === name && sortReverse, 
    'fa-sort-desc': sortBy === name && !sortReverse, 
    'fa-sort': sortBy !== name}" 
    class="fa" 
    aria-hidden="true"
    >
  </i>`
})
export class IconComponent {

  @Input() name: string;
  @Input() sortBy: string;
  @Input() sortReverse: boolean;
  constructor() {}
  
}
