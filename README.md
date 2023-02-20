# websockify2

A port of [websockify-js](https://github.com/novnc/websockify-js) to modern NodeJS and TypeScript.

## Usage

```sh
Usage: websockify [options]

Creates a WebSocket server on <listen-host>:<listen-port> and forwards traffic to a TCP socket on <source-host>:<source-port>.

Options:
  -s, --source <address>:<port>
  -l, --listen <address>:<port>
  -h, --help                     display help for command
```

### VNC on 5901, WS on 9999

```sh
./bin.js --source 127.0.0.1:5901 --listen 127.0.0.1:9999
```

### With debugging:

```sh
DEBUG=websockify2 ./bin.js --source 127.0.0.1:5901 --listen 127.0.0.1:9999
```
