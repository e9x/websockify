# websockify

A port of [websockify-js](https://github.com/novnc/websockify-js) to modern NodeJS and TypeScript.

<a href="https://www.npmjs.com/package/@e9x/websockify"><img src="https://img.shields.io/npm/v/@e9x/websockify.svg?maxAge=3600" alt="npm version" /></a>

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
npx @e9x/websockify --source 127.0.0.1:5901 --listen 127.0.0.1:9999
```

### With debugging:

```sh
DEBUG=websockify npx @e9x/websockify --source 127.0.0.1:5901 --listen 127.0.0.1:9999
```
