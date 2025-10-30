# sn-cloudinary-mcp

A Model Context Protocol (MCP) server providing Cloudinary media management and transformation capabilities for AI assistants.

## Features
- Upload images/videos from a local path, remote URL, or base64 payload.
- Retrieve asset metadata by `public_id`.
- Search assets via Cloudinary's advanced search expressions (tags, folder, format, etc.).
- Generate transformed delivery URLs (resize, format, quality, crop).
- Manage tags (add, delete, replace), context metadata.
- Rename, move, and delete assets.
- List folders, perform explicit refresh operations.

## Getting Started

### 1. Install
```bash
git clone https://github.com/sharkninjadata/sn-cloudinary-mcp.git
cd sn-cloudinary-mcp
npm install
```

### 2. Environment Variables
Create a `.env` file (see `.env.example`):
```
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 3. Run MCP Server (JSON-RPC over stdio)
Build then start:
```bash
npm run build
npm start
```
Dev mode (TypeScript directly):
```bash
npm run dev
```

The server implements a simple newline-delimited JSON-RPC 2.0 protocol over stdin/stdout.

### 4. JSON-RPC Protocol Outline
Send requests as single-line JSON objects:
```json
{"jsonrpc":"2.0","id":"1","method":"invoke","params":{"tool":"cloudinary.url.transform","args":{"public_id":"samples/cat","width":400,"height":400,"format":"webp"}}}
```
Responses:
```json
{"jsonrpc":"2.0","id":"1","result":{"url":"https://..."}}
```
List tools:
```json
{"jsonrpc":"2.0","id":"2","method":"list_tools"}
```
Get manifest:
```json
{"jsonrpc":"2.0","id":"3","method":"get_manifest"}
```

### 5. Tools Summary
- cloudinary.upload
- cloudinary.asset.get
- cloudinary.asset.search
- cloudinary.url.transform
- cloudinary.asset.update_tags (replace entire tag list)
- cloudinary.asset.add_tags (add tags)
- cloudinary.asset.delete_tags (remove specified tags)
- cloudinary.asset.delete (delete asset)
- cloudinary.folder.list (list subfolders for a prefix)
- cloudinary.asset.move (move by assigning new folder path)
- cloudinary.asset.rename (rename public_id)
- cloudinary.asset.update_context (upsert context key-value metadata)
- cloudinary.asset.explicit (explicit refresh / derived processing)

### 6. Development Scripts
- build, dev, start, lint

### 7. Roadmap
- Streaming recent uploads as resource events.
- Signed upload presets.
- Caching layer.
- Additional context removal tool.
- Bulk operations.

## Security Notes
- Do not log secrets.
- Consider rate limits on upload/search.

## License
MIT