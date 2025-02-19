/* eslint-disable no-console */
import { ServerUrl } from '../models/Server';
import { LogColor, useColors } from './UseColors';

export const useLoggerServer = () => {
  const colors = useColors();
  const serverStart = (server: ServerUrl) => {
    console.log(
      `${colors.green}💻 Server Start:${colors.reset}
      ${colors.green}${server.host}${colors.reset}${colors.magenta}:${server.port}${colors.reset}`,
    );
  };

  const dbConnected = (url: string) => {
    console.log(
      `${colors.green}💡 DB Connected:${colors.reset}
      ${colors.cyan}${url}${colors.reset}`,
    );
  };

  const simpleMessage = (message: string, color: LogColor = 'green') => {
    console.log(
      `${colors.reset}${colors[color]}${message}${colors.reset}`,
    );
  };

  return {
    serverStart,
    dbConnected,
    simpleMessage,
  };
};
