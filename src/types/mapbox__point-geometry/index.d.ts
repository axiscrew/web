// Minimal shim so TypeScript can resolve the implicit type library: mapbox__point-geometry
declare module "@mapbox/point-geometry" {
  const Point: any;
  export default Point;
}