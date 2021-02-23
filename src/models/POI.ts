export default interface POI {
    location: number[];
    name: string;
    type: string;
    description?: string;
    tags: {
      [properties: string]: any
    };
    challenge: string;
    [properties: string]: any;
    images?: string[];
}