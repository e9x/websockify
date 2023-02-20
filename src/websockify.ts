import debug from "debug";
import { createConnection } from "node:net";
import type { NetConnectOpts } from "node:net";
import type { RawData, WebSocket } from "ws";

const debugOutput = debug("websockify");

const isBufferArray = (msg: RawData): msg is Buffer[] =>
  Array.isArray(msg) && Buffer.isBuffer(msg[0]);

// replace any with the options for net connect
export function websockify(client: WebSocket, destination: NetConnectOpts) {
  debugOutput("WebSocket connection");

  const target = createConnection(destination, () => {
    debugOutput("connected to target");
  });

  target.on("data", (data) => {
    try {
      client.send(data);
    } catch (err) {
      debugOutput("Client closed, cleaning up target");
      target.end();
    }
  });

  target.on("end", () => {
    debugOutput("target disconnected");
    client.close();
  });

  target.on("error", () => {
    debugOutput("target connection error");
    target.end();
    client.close();
  });

  client.on("message", (msg) => {
    target.write(isBufferArray(msg) ? Buffer.concat(msg) : Buffer.from(msg));
  });

  client.on("close", (code, reason) => {
    debugOutput("WebSocket client disconnected:", code, `[${reason}]`);
    target.end();
  });

  client.on("error", (code) => {
    debugOutput("WebSocket client error:", code);
    target.end();
  });
}
