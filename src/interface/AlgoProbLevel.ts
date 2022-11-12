export interface AlgoProbLevel {
    id: string;
    name: string;
}

export interface AlgoProbCategory {
  id: string;
  name: string;
}

export interface AlgoProbInfo {
  number: number;
  title: string;
  averageTries: number;
  description: string;
  input: string;
  output: string;
  level: {
    id: string;
    name: string;
  };
  categories: Array<AlgoProbCategory>;
}