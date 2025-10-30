import { uploadTool } from './tools/uploadTool.js';
import { getAssetTool } from './tools/getAssetTool.js';
import { searchAssetsTool } from './tools/searchAssetsTool.js';
import { transformUrlTool } from './tools/transformUrlTool.js';
import { updateTagsTool } from './tools/updateTagsTool.js';
import { addTagsTool } from './tools/addTagsTool.js';
import { deleteTagsTool } from './tools/deleteTagsTool.js';
import { deleteAssetTool } from './tools/deleteAssetTool.js';
import { renameAssetTool } from './tools/renameAssetTool.js';
import { moveAssetTool } from './tools/moveAssetTool.js';
import { updateContextTool } from './tools/updateContextTool.js';
import { explicitTool } from './tools/explicitTool.js';
import { listFoldersTool } from './tools/listFoldersTool.js';

import fs from 'node:fs';
import path from 'node:path';
import Ajv from 'ajv';

interface ManifestTool {
  name: string;
  description?: string;
  inputSchema?: any;
  outputSchema?: any;
}

interface Manifest {
  name: string;
  version: string;
  description?: string;
  tools: ManifestTool[];
}

const manifestPath = path.resolve(process.cwd(), 'mcp-manifest.json');
const manifest: Manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));

const toolHandlers: Record<string, (args: any) => Promise<any>> = {
  'cloudinary.upload': uploadTool,
  'cloudinary.asset.get': getAssetTool,
  'cloudinary.asset.search': searchAssetsTool,
  'cloudinary.url.transform': transformUrlTool,
  'cloudinary.asset.update_tags': updateTagsTool,
  'cloudinary.asset.add_tags': addTagsTool,
  'cloudinary.asset.delete_tags': deleteTagsTool,
  'cloudinary.asset.delete': deleteAssetTool,
  'cloudinary.asset.rename': renameAssetTool,
  'cloudinary.asset.move': moveAssetTool,
  'cloudinary.asset.update_context': updateContextTool,
  'cloudinary.asset.explicit': explicitTool,
  'cloudinary.folder.list': listFoldersTool
};

const ajv = new Ajv({ allErrors: true, strict: false });

function findTool(name: string): ManifestTool | undefined {
  return manifest.tools.find(t => t.name === name);
}

function validateInput(toolName: string, args: any) {
  const mt = findTool(toolName);
  if (!mt || !mt.inputSchema) return;
  const validate = ajv.compile(mt.inputSchema);
  const valid = validate(args);
  if (!valid) {
    const errors = (validate.errors || []).map(e => `${e.instancePath} ${e.message}`).join('; ');
    throw new Error(`Input validation failed for ${toolName}: ${errors}`);
  }
}

async function invokeTool(tool: string, args: any) {
  const handler = toolHandlers[tool];
  if (!handler) throw new Error(`Unknown tool: ${tool}`);
  validateInput(tool, args);
  return handler(args);
}

interface RpcRequest {
  jsonrpc: '2.0';
  id?: string | number;
  method?: string;
  params?: any;
}

function send(result: any, id?: string | number, error?: { code: number; message: string }) {
  const response: any = { jsonrpc: '2.0' };
  if (id !== undefined) response.id = id;
  if (error) {
    response.error = error;
  } else {
    response.result = result;
  }
  process.stdout.write(JSON.stringify(response) + '\n');
}

async function handleRpc(line: string) {
  let req: RpcRequest;
  try {
    req = JSON.parse(line);
  } catch {
    send(null, undefined, { code: -32700, message: 'Parse error' });
    return;
  }
  if (!req.method) {
    send(null, req.id, { code: -32600, message: 'Invalid Request: missing method' });
    return;
  }

  try {
    if (req.method === 'list_tools') {
      send({ tools: manifest.tools.map(t => t.name) }, req.id);
      return;
    }
    if (req.method === 'get_manifest') {
      send({ manifest }, req.id);
      return;
    }
    if (req.method === 'invoke') {
      const { tool, args } = req.params || {};
      if (!tool) throw new Error('Missing tool name in params.tool');
      const result = await invokeTool(tool, args || {});
      send(result, req.id);
      return;
    }
    send(null, req.id, { code: -32601, message: `Method not found: ${req.method}` });
  } catch (err: any) {
    send(null, req.id, { code: -32000, message: err.message || String(err) });
  }
}

function main() {
  if (process.argv.includes('--demo')) {
    (async () => {
      try {
        const demo = await invokeTool('cloudinary.url.transform', {
          public_id: 'samples/cat',
          width: 300,
          height: 300,
          crop: 'fill',
          quality: 'auto',
          format: 'webp'
        });
        console.log(JSON.stringify(demo, null, 2));
      } catch (e) {
        console.error(e);
        process.exit(1);
      }
    })();
    return;
  }

  process.stdin.setEncoding('utf-8');
  let buffer = '';
  process.stdin.on('data', chunk => {
    buffer += chunk;
    let idx: number;
    while ((idx = buffer.indexOf('\n')) >= 0) {
      const line = buffer.slice(0, idx).trim();
      buffer = buffer.slice(idx + 1);
      if (!line) continue;
      handleRpc(line);
    }
  });

  process.stdout.write(JSON.stringify({
    jsonrpc: '2.0',
    method: 'ready',
    result: { server: manifest.name, version: manifest.version }
  }) + '\n');
}

main();