import type { ParamsObject } from "@/typings/types";
import moment from "moment";

export const getQueryParamsFromObject = (paramsObject: ParamsObject): string => {
  return Object.entries(paramsObject).map(e => e.join("=")).join("&");
};

export const isObjectEmpty = (objectName: ParamsObject) => {
  return (
    objectName &&
    Object.keys(objectName).length === 0 &&
    objectName.constructor === Object
  );
};

export function formatNumber(input: number | string, minDigits = 2, maxDigits = 2): string {
  // Converte string para número, se necessário
  let number = typeof input === "string" ? parseFloat(input) : input;

  // Verifica se o número é válido
  if (isNaN(number)) {
    number = 0;
  }

  return number.toLocaleString("en-US",  {
    minimumFractionDigits: minDigits,
    maximumFractionDigits: maxDigits
  });
}

export function formatDate(input: string, format: string = "MM/DD/YYYY"): string {
  const date = moment(input);

  return date.isValid() ? date.format(format) : "";
}
