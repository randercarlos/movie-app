import type { AppErrorInfo } from "@/typings/interfaces";
import { push } from "notivue";

export function handleError(message: string, originalError: Error) {
  const appError: AppErrorInfo = {
    message: message + " Try again later. If error persists, contact support.",
    originalError,
  };

  extractLocationFromStackTrace(originalError.stack, appError);
  showErrorNotification(appError);

  logErrorDetails(appError);
}

function extractLocationFromStackTrace(stack: string | undefined, appError: AppErrorInfo) {
  if (!stack) return;

  const stackLines = stack.split("\n");
  if (stackLines.length > 1) {
    const locationMatch = stackLines[1].match(/\((.*):(\d+):(\d+)\)/);

    if (locationMatch) {
      appError.fileName = locationMatch[1];
      appError.lineNumber = parseInt(locationMatch[2], 10);
      appError.columnNumber = parseInt(locationMatch[3], 10);
    }
  }
}

function logErrorDetails(appError: AppErrorInfo) {
  const styleTitle = "font-weight: bold; color: red; font-size: 16px;";
  const styleMessage = "color: black;";
  const styleStackTrace = "color: gray;";
  const styleLocation = "color: blue; font-weight: bold;";

  const errorMessage = `%cError: %c${appError.message}`;
  const originalErrorMessage = `%cOriginal Error: %c${appError.originalError.message}`;
  const stackTrace = `%cStack Trace:\n%c${appError.originalError.stack
    || "No stack trace available"}`;
  const location = appError.fileName
    ? `%cLocation: %c${appError.fileName}:${appError.lineNumber}:${appError.columnNumber}`
    : "%cLocation: %cUnknown";

  console.error(errorMessage, styleTitle, styleMessage);
  console.error(originalErrorMessage, styleTitle, styleMessage);
  console.error(location, styleTitle, styleLocation);
  console.error(stackTrace, styleTitle, styleStackTrace);
}

function showErrorNotification(appError: AppErrorInfo) {
  push.error({
    title: "Error",
    message: appError.message
      ?? "An error happened. Try again later. If error persists, contact support."
  });
}
