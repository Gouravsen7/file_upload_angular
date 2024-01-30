export interface Bars {
    x: number;
    y: number;
    width: number;
    height: number;
    color: string;
    tooltipText: string;
    heading: string;
}
  
export interface Record {
    [key: string]: number;
}

export interface Range { 
    min: number; 
    max: number;
};
    
export interface ColorMap { 
    [key: string]: Range;
 };

