export interface Bars {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  tooltipText: string;
  heading: string;
}

export interface Pagination {
  currentPage: number,
  totalSvgRecord: number
}

export interface ColorRangeTable{
  property: string;
  rangeOne: string;
  rangeTwo: string;
  rangeThree: string;
  rangeFour: string;
}

export interface ColorRange {
  colorRange: Range
}

export interface Range { 
  property: string;
  rangeOne: string;
  rangeTwo: string;
  rangeThree: string;
  rangeFour: string;
}

export interface BarProperty {
  header_title: string;
  start_point_z: string;
  end_point_z: string;
}

export interface RecordsData {
  file_name?: string;
  header_data?: BarProperty[];
  records?: any[];
}

export interface VisualizationData {
  data?: RecordsData;
  page?: number;
}
