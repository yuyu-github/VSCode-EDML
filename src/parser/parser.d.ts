export function parse(input: any, options?: any): any;
export class SyntaxError extends Error {
  format: (sources: any) => string;
  name: string;
  expected: any[];
  found: string | null;
  location: {
    source: any;
    start: {offset: number; line: number; column: number};
    end: {offset: number; line: number; column: number};
  };
}
