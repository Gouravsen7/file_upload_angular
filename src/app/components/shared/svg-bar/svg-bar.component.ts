import { CUSTOM_ELEMENTS_SCHEMA, Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription, take } from 'rxjs';

import { Bars, ColorRange, Pagination } from './svg.interface';
import { MaterialModule } from '@app/material.module';
import { FileUploadService } from '@app/services/file-upload.service';
import { SnackbarService } from '@app/services/snackbar.service';
import { SharedService } from '@app/services/shared.service';

@Component({
  selector: 'app-svg-bar',
  standalone: true,
  imports: [ CommonModule, MaterialModule],
  templateUrl: './svg-bar.component.html',
  styleUrl: './svg-bar.component.scss',
  schemas:[NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
})

export class SvgLoaderComponent {
  private fetchDataSubscription: Subscription = new Subscription();

  depth: Array<number> = [];
  barProperties: Array<any> = [];
  bars:Bars[][] = [];
  dataColorRangeTable: Array<ColorRange> = [];
  dataSource = new MatTableDataSource<any>(Object.entries(this.dataColorRangeTable));
  displayedColumns: string[] = ['property', 'rangeOne', 'rangeTwo', 'rangeThree', 'rangeFour'];
  isLoading: boolean =  true;
  isNewFileUploaded: boolean = false;
  cachedVisualizationData: any
  dataValue:any;
  fileName!: string;
  paginationData: Pagination=  {
    currentPage: 1,
    totalSvgRecord: 0
  }
  
  constructor( 
    private fileUploadService : FileUploadService,  
    private snackbarService: SnackbarService, 
    private sharedService: SharedService) {
      this.fetchDataSubscription = this.sharedService.fetchData$.subscribe(() => {
        this.isNewFileUploaded = true;
        this.fetchData();
      });
     }

  ngOnInit() {
    this.fetchData();
  }
  
  fetchData(): void {
    this.bars = []; 
    this.barProperties = [];
    this.isLoading = true;
    this.sharedService.cachedData$.pipe(take(1)).subscribe((res) => {
      this.cachedVisualizationData = res;
    })

    const findCachedData = this.cachedVisualizationData.find((res: any) => res.page === this.paginationData.currentPage);
    if(findCachedData && !this.isNewFileUploaded) {
      const { data} = findCachedData;
      this.processData(data); 
    } else {
      this.fileUploadService.getData(this.paginationData.currentPage).subscribe(
        (result: any) => {
          const data= result.data;
          this.isNewFileUploaded = false;
          this.processData(data);
          this.isLoading = false;
          this.sharedService.storeCachedSvgData([...this.cachedVisualizationData, { page: this.paginationData.currentPage, data: result.data }]);
        },
        (error) => {
          this.snackbarService.openError("Oops! Something went wrong while trying to fetch the data. Please try again later."
          );
          this.isLoading = false;
        }
      );
    }
  }

  processData(data: any) {
    this.isLoading = false;
    this.dataValue = data;
    this.fileName = data?.file_name;
    this.paginationData.totalSvgRecord = data?.metadata?.total_pages || 0;
    this.barProperties = Object.values(data?.header_data || {});
    this.depth = data.records?.map((val: any) => val.Depth);
    this.renderBars();
    this.dataSource.data = this.dataColorRangeTable;    
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
    this.barProperties.forEach((head: any) => {
      const type2Data: Array<number> = this.dataValue.records.map((val: any) => val[head.header_title]);
      const maxRange = Math.max(...type2Data) / 4;
      this.setRange(head.header_title, maxRange);

      const barsForHead = this.depth.map((depth, index) => ({
        x: 20 ,
        y: depth * 20,
        width: 80,
        height: Math.abs(174.581 - 187), 
        color: this.getColorForRange(type2Data[index], maxRange),
        tooltipText: `Depth: ${this.depth[index]}\n\n ${head.header_title}: ${type2Data[index]}`,
        heading: head.header_title,
      }));
      
      this.bars.push(barsForHead);
    });
  }

  setRange(head: string, maxRange: number) {
    const colorRange = {
      property: head,
      rangeOne: (maxRange * 1).toFixed(2),
      rangeTwo: (maxRange * 2).toFixed(2),
      rangeThree: (maxRange * 3).toFixed(2),
      rangeFour: (maxRange * 4).toFixed(2),  
    };
    this.dataColorRangeTable.push({ colorRange }); 
  }

  onPageChange(event: any): void {
    this.paginationData.currentPage = event.pageIndex + 1;
    this.fetchData();
  }

  ngOnDestroy() {
    this.fetchDataSubscription.unsubscribe();
  }
}

