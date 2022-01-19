export type FilterParamType = "region" | "petType" | "serviceType"| "special";

export type FilterType = {
  region: any[],
  petType: any[],
  serviceType: any[],
  special: any[],
};

export const filterParams = ["region", "petType", "serviceType", "special"];

export const filters = {
  region: [
    { value: 1, label: "region 1" },
    { value: 2, label: "region 2" },
    { value: 3, label: "region 3" }
  ],
  petType: [
    { value: 1, label: "petType 1" },
    { value: 2, label: "petType 2" },
    { value: 3, label: "petType 3" }
  ],
  serviceType: [
    { value: 1, label: "serviceType 1" },
    { value: 2, label: "serviceType 2" },
    { value: 3, label: "serviceType 3" }
  ],
  special: [
    { value: 1, label: "special 1" },
    { value: 2, label: "special 2" },
    { value: 3, label: "special 3" }
  ],
}