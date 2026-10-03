export type CarModel = {
  name: string;
  startYear: number;
  endYear: number;
};

export type CarDatabase = {
  [make: string]: CarModel[];
};

export const carDatabase: CarDatabase = {
  Acura: [
    { name: "Integra", startYear: 1986, endYear: 2027 },
    { name: "TLX", startYear: 2015, endYear: 2027 },
    { name: "ILX", startYear: 2013, endYear: 2022 },
    { name: "RLX", startYear: 2014, endYear: 2020 },
    { name: "TSX", startYear: 2004, endYear: 2014 },
    { name: "NSX", startYear: 1991, endYear: 2022 },
    { name: "RDX", startYear: 2007, endYear: 2027 },
    { name: "MDX", startYear: 2001, endYear: 2027 },
    { name: "ZDX", startYear: 2010, endYear: 2027 },
  ],
};