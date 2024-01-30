import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, NO_ERRORS_SCHEMA, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Bars,} from './svg.interface';
import { MatTableDataSource } from '@angular/material/table';
import { MaterialModule } from '@app/material.module';

@Component({
  selector: 'app-svg-bar',
  standalone: true,
  imports: [ CommonModule, MaterialModule],
  templateUrl: './svg-bar.component.html',
  styleUrl: './svg-bar.component.scss',
  schemas:[NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
})

export class SvgLoaderComponent {
  @Input() dataValue: any;

  heading: Array<string> = [];
  depth: Array<number> = [];
  normalizeDepth: Array<number> = [];
  distanceArr: Array<number>  = [];
  bars:Bars[][] = [];
  scale: number = 300;
  dataColorRangeTable: Array<any> = [];
  displayedColumns: string[] = ['property', 'red', 'blue', 'yellow', 'green'];
  dataSource = new MatTableDataSource<any>(Object.entries(this.dataColorRangeTable));
  
  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    this.dataValue = changes['dataValue'].currentValue;
    if (this.dataValue) {
      this.bars = []; 
      this.heading = [];
      this.processData(changes['dataValue'].currentValue);
      this.renderBars();
      this.dataSource.data = this.dataColorRangeTable;
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
  
  getColorForRange(value:number, maxRange:number): string  {
    switch (true) {
      case value < maxRange:
        return '#EB401D';
      case value <= 2 * maxRange:
        return '#2F00F9';
      case value <= 3 * maxRange:
        return '#FCFF42';
      case value > 4 * maxRange:
        return '#2F7F18';
      default:
        return '#2F7F18';
    }
  };

  renderBars() {
    this.dataColorRangeTable = [];
    this.heading.forEach((head) => {
      const type2Data: Array<number> = this.dataValue.records.map((val: any) => val[head]);
      const maxRange = Math.max(...type2Data) / 4;
      this.getRange(head, maxRange)  ;
      const barsForHead = this.depth.map((depth, index) => ({
        x: 20 ,
        y: depth * 20,
        width: 80,
        height: Math.abs(174.581 - 187), /// zstart and zend
        color: this.getColorForRange(type2Data[index], maxRange),
        tooltipText: `Depth ${this.depth[index]}\n\n ${head}: ${type2Data[index]}`,
        heading: head,
      }));
      this.bars.push(barsForHead);
    });
  }

  getRange(head: string, maxRange: number) {
    const colorRange = {
      property: head,
      red: (maxRange * 1).toFixed(2),
      bule: (maxRange * 2).toFixed(2),
      yellow: (maxRange * 3).toFixed(2),
      green: (maxRange * 4).toFixed(2), //verfily?
    };
    this.dataColorRangeTable.push({ colorRange }); 
  }

}

