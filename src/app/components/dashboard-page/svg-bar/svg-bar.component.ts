import { Component, ElementRef, Input, NO_ERRORS_SCHEMA, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Bars} from './svg.interface';

@Component({
  selector: 'app-svg-bar',
  standalone: true,
  imports: [ CommonModule ],
  templateUrl: './svg-bar.component.html',
  styleUrl: './svg-bar.component.scss',
  schemas:[NO_ERRORS_SCHEMA]
})

export class SvgLoaderComponent {
  @Input() dataValue: any;

  heading: Array<string> = [];
  depth: Array<number> = [];
  normalizeDepth: Array<number> = [];
  distanceArr: Array<number>  = [];
  bars:Bars[][] = [];
  scale: number = 300;

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    this.dataValue = changes['dataValue'].currentValue;
    if (this.dataValue) {
      this.bars = []; 
      this.heading = [];
      this.processData(changes['dataValue'].currentValue);
      this.renderBars();
    }
  }

  processData(dataValue: any) {
    this.heading = Object.values(dataValue.bar_key);
    this.depth = dataValue.records.map((val: any) => val.Depth);
    this.normalizeDepth = this.normalizeArray(this.depth);
    this.distanceArr = [...this.calculateDistances(this.normalizeDepth), 0];
  }

  normalizeArray(array: Array<number>): Array<number> {
    const min = Math.min(...array);
    const max = Math.max(...array);
    return array.map((value) => (max === min) ? 0 : (value - min) / (max - min));
  }
  
  calculateDistances(array: Array<number>): Array<number> {
    return array.slice(1).map((value, index) => value - array[index]);
  }
  
  getColor(value: number, maxPenetrationRate:number): string {
    const maxRange = maxPenetrationRate / 4;
    const colorFunction =  this.getColorForRange(value, maxRange);
    console.table([value, colorFunction]);
    return colorFunction;
  }

  getColorForRange(value:number, maxRange:number): string  {
    switch (true) {
      case value < maxRange:
        return '#EB401D';
      case value <= 2 * maxRange:
        return '#2F00F9';
      case value <= 3 * maxRange:
        return '#FCFF42';
      default:
        return '#2F7F18';
    }
  };

  renderBars() {
    this.heading.forEach((head) => {
      const type2Data: Array<number> = this.dataValue.records.map((val: any) => val[head]);
      const maxPenetrationRate = Math.max(...type2Data);
      const barsForHead = this.normalizeDepth.map((depth, index) => ({
        x: 20 ,
        y: depth * this.scale ,
        width: 80,
        height: Math.abs(this.distanceArr[index]) * 300,
        color: this.getColor(type2Data[index], maxPenetrationRate),
        tooltipText: `Depth ${this.depth[index]}\n\n ${head}: ${type2Data[index]}`,
        heading: head,
      }));
      this.bars.push(barsForHead);
    });
  }

}

