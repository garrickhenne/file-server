# File-server
Connects client to server via simple TCP connection, sending HTTP requests. Allows client to retrieve files in path.

- Add files you would like to share to `Files/` directory.
- Client is able to retrieve list of files available from server `Files/` directory.

## Usage
1. Add files you would like to share in `Files/` directory
2. Run server `node server.js`
3. Run client `node client.js`
  - By default the server listens on port `10001`
4. On client, server will return a list of filenames that are currently in `Files/` directory
5. Type full name of file with extension and the file's data will print to terminal.
