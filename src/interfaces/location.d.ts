export interface ILocation {
  type: "Point" | "LineString" | "Polygon";
  coordinates: number[] | number[][] | number[][][];
}
