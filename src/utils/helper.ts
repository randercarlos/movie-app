import moment from "moment";

export const getEndpointWithQueryParams = (endpoint: string,
  searchParams = new URLSearchParams()): string => {

  return searchParams.size > 0 ? `${endpoint}?${searchParams.toString()}` : endpoint;
};

export function formatNumber(input: number | string, minDigits = 2, maxDigits = 2): string {
  // Converte string para número, se necessário
  let number = typeof input === "string" ? parseFloat(input) : input;

  // Verifica se o número é válido
  if (isNaN(number)) {
    number = 0;
  }

  if (minDigits > maxDigits) {
    minDigits = maxDigits;
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

export const resolvedPromises = (waitFor: number = 200) =>
  new Promise((r) => setTimeout(r, waitFor));

export const log = (data: unknown) =>  {
  const style = `
    color: #A9A9A9,;
    padding: 2px 4px;
    border-radius: 3px;
    font-size: 14px;
  `;
  console.log("%c*************************************************", style);
  console.log(`%c${data}`, style);
  console.log("%c*************************************************", style);
};
