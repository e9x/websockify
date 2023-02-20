import { websockify } from "./websockify.js";
import { Command } from "commander";
import { createServer } from "node:http";
import { WebSocketServer } from "ws";

const program = new Command();

function parseLocation(l: string) {
  const split = l.split(":");

  if (split.length !== 2) throw new Error("Invalid format");

  const host = split[0];
  const port = Number(split[1]);

  if (isNaN(port)) throw new Error("Invalid port");

  return {
    host,
    port,
  };
}

program
  .description(
    "Creates a WebSocket server on <listen-host>:<listen-port> and forwards traffic to a TCP socket on <source-host>:<source-port>."
  )
  .requiredOption("-s, --source <address>:<port>")
  .requiredOption("-l, --listen <address>:<port>")
  .action(({ source, listen }: { source: string; listen: string }) => {
    const sourceL = parseLocation(source);
    const listenL = parseLocation(listen);

    const http = createServer();

    const wss = new WebSocketServer({
      server: http,
    });

    wss.on("connection", (socket) => websockify(socket, sourceL));

    http.on("request", (req, res) => {
      res.writeHead(405, {
        "content-type": "text/plain",
      });

      res.write(
        "This is a websockify server that only accepts WebSocket traffic."
      );

      res.end();
    });

    http.on("listening", () => {
      console.log(`Listening on http://${listenL.host}:${listenL.port}/`);
    });

    http.listen(listenL);
  });

program.parse(process.argv);
