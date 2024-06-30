import moment, { type Moment } from "moment";

export const getEndpointWithQueryParams = (endpoint: string,
  searchParams: URLSearchParams = new URLSearchParams()): string => {

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

export function calculateAge(birthday: string, dateFormat: string = "YYYY-MM-DD"): number | null {
  const birthdayObject = moment(birthday, dateFormat);
  if (!isValidDate(birthdayObject)) {
    return null;
  }

  return moment().diff(birthdayObject, "years");
}

export function isValidDate(date: string | Moment, dateFormat: string = "YYYY-MM-DD"): boolean {
  return moment.isMoment(date)
    ? date.isValid()
    : moment(date, dateFormat, true).isValid();
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

export function truncateString(string: string, maxCharacters: number,
  truncateString: string = "...") {
  return string.length <= maxCharacters
    ? string
    : string.slice(0, maxCharacters) + truncateString;
}

export function addQueryStringToURL(url: string, queryStringKey: string,
  queryStringValue: string): string {
  // Parse the existing URL and query parameters
  const parsedUrl = new URL(url);
  const params = new URLSearchParams(parsedUrl.search);

  // Add or overwrite query parameters
  params.set(queryStringKey, queryStringValue);

  // Reconstruct the URL with the merged query parameters
  parsedUrl.search = params.toString();
  
  return parsedUrl.toString();
}
