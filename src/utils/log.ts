import { ALLOW_DEBUG_LOGS } from '../configs';

type TLog = {
  debug: (message?: any, ...optionalParams: any[]) => void;
  error: (message?: any, ...optionalParams: any[]) => void;
  warn: (message?: any, ...optionalParams: any[]) => void;
  info: (message?: any, ...optionalParams: any[]) => void;
  trace: (message?: any, ...optionalParams: any[]) => void;
};

const TRACE_ENABLED = true;

var log: TLog = {
  debug: (message?: any, ...optionalParams: any[]): void => {
    ALLOW_DEBUG_LOGS && console.debug(message, ...optionalParams);
  },
  error: (message?: any, ...optionalParams: any[]): void => {
    console.error(message, ...optionalParams);
  },
  warn: (message?: any, ...optionalParams: any[]): void => {
    ALLOW_DEBUG_LOGS && console.warn(message, ...optionalParams);
  },
  info: (message?: any, ...optionalParams: any[]): void => {
    ALLOW_DEBUG_LOGS && console.info(message, ...optionalParams);
  },
  trace: (message?: any, ...optionalParams: any[]): void => {
    ALLOW_DEBUG_LOGS && TRACE_ENABLED && console.debug(message, ...optionalParams);
  },
};

export default log;
