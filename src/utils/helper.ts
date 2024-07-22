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

export function formatDate(dateInput: Moment | string | null | undefined,
  dateFormat: string = "MM/DD/YYYY"): string | null {
  if (! isValidDate(dateInput, "YYYY-MM-DD")) {
    return null;
  }

  return moment.isMoment(dateInput)
    ? dateInput.format(dateFormat)
    : moment(dateInput).format(dateFormat);
}

export function getYearFromDate(dateInput: Moment | string | null | undefined,
  dateFormat: string = "YYYY-MM-DD"): string | null {
  if (! isValidDate(dateInput, dateFormat)) {
    return null;
  }

  const result = moment.isMoment(dateInput)
    ? dateInput.year()
    : moment(dateInput, dateFormat).year();

  return result.toString();
}

export function calculateAge(birthday: Moment | string | null | undefined,
  dateFormat: string = "YYYY-MM-DD"): number | null {
  if (! isValidDate(birthday, dateFormat)) {
    return null;
  }

  return moment.isMoment(birthday)
    ? moment().diff(birthday, "years")
    : moment().diff(moment(birthday, dateFormat), "years");
}

export function isValidDate(dateInput: Moment | string | null | undefined,
  dateFormat: string = "YYYY-MM-DD"): boolean {
  return moment.isMoment(dateInput)
    ? dateInput.isValid()
    : moment(dateInput, dateFormat, true).isValid();
}

export const resolvedPromises = (waitFor: number = 200) =>
  new Promise((r) => setTimeout(r, waitFor));

export function truncateString(string: string, maxCharacters: number,
  limitString: string = "...") {
  if (maxCharacters <= 0) {
    return string;
  }

  return string.length <= maxCharacters
    ? string
    : string.slice(0, maxCharacters) + limitString;
}

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
