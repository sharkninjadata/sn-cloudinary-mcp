# sn-cloudinary-mcp

A Model Context Protocol (MCP) server providing Cloudinary media management and transformation capabilities for AI assistants.

## Features
- Upload images/videos from a local path, remote URL, or base64 payload.
- Retrieve asset metadata by `public_id`.
- Search assets via Cloudinary's advanced search expressions (tags, folder, format, etc.).
- Generate transformed delivery URLs (resize, format, quality, crop).

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

### 3. Run MCP Server
```bash
npm run build
npm start
```
Or with ts-node (dev):
```bash
npm run dev
```

The server will listen (stdio or chosen transport) as required by the MCP host (e.g. an AI assistant runtime).

### 4. Tools
The manifest (`mcp-manifest.json`) lists available tools:
- `cloudinary.upload`
- `cloudinary.asset.get`
- `cloudinary.asset.search`
- `cloudinary.url.transform`

### 5. Example Usage (Pseudo)
```json
{
  "tool": "cloudinary.url.transform",
  "args": {
    "public_id": "samples/cat",
    "width": 400,
    "height": 400,
    "format": "webp",
    "crop": "fill",
    "quality": "auto"
  }
}
```

## Development

### Scripts
- `npm run dev` — ts-node watch
- `npm run build` — TypeScript compile
- `npm start` — run compiled server

### Lint
```bash
npm run lint
```

## Security Notes
- Keep API Secret out of logs.
- Consider rate limiting high-volume search or upload calls.
- For production, set restrictive IAM / sub-account credentials.

## Roadmap
- Add resource streaming (recent uploads feed).
- Add deletion tool.
- Add metadata update tool.
- Add signed upload (unsigned preset fallback).
- Add caching layer for frequently requested assets.

## License
MIT