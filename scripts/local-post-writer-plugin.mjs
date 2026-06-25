import { mkdir, readdir, readFile, unlink, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const contentDir = path.join(root, 'src/content/blog');
const categories = new Set(['aws', 'databricks', 'study', 'builds', 'papers']);
const postExtensions = ['.md', '.mdx'];

function send(res, status, body) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.end(JSON.stringify(body));
}

function readJson(req) {
  return new Promise((resolve, reject) => {
    let raw = '';
    req.setEncoding('utf8');
    req.on('data', (chunk) => {
      raw += chunk;
      if (raw.length > 1_500_000) {
        reject(new Error('Payload is too large. Keep a post under 1.5MB.'));
        req.destroy();
      }
    });
    req.on('end', () => {
      try {
        resolve(JSON.parse(raw || '{}'));
      } catch {
        reject(new Error('Invalid JSON payload.'));
      }
    });
    req.on('error', reject);
  });
}

function slugify(input) {
  return String(input || '')
    .normalize('NFKC')
    .trim()
    .toLowerCase()
    .replace(/[\/\?%*:|"<>]/g, '')
    .replace(/[^\p{Letter}\p{Number}._ -]+/gu, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^[._-]+|[._-]+$/g, '')
    .slice(0, 90);
}

function yamlString(value) {
  return JSON.stringify(String(value ?? ''));
}

function unquoteYaml(value) {
  const text = String(value || '').trim();
  if ((text.startsWith('"') && text.endsWith('"')) || (text.startsWith("'") && text.endsWith("'"))) {
    return text.slice(1, -1);
  }
  return text;
}

function normalizeDate(value) {
  const text = String(value || '').trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(text)) return text;
  return new Date().toISOString().slice(0, 10);
}

function normalizeTags(value) {
  if (Array.isArray(value)) {
    return value.map((tag) => String(tag).trim()).filter(Boolean).slice(0, 20);
  }
  return String(value || '')
    .split(',')
    .map((tag) => tag.trim())
    .filter(Boolean)
    .slice(0, 20);
}

function frontmatter(data) {
  const tags = normalizeTags(data.tags);
  const lines = [
    '---',
    'title: ' + yamlString(data.title),
    'description: ' + yamlString(data.description),
    'pubDate: ' + normalizeDate(data.pubDate),
    'category: ' + data.category,
  ];
  if (data.updatedDate) lines.push('updatedDate: ' + normalizeDate(data.updatedDate));
  if (tags.length > 0) {
    lines.push('tags:');
    for (const tag of tags) lines.push('  - ' + yamlString(tag));
  } else {
    lines.push('tags: []');
  }
  if (Boolean(data.draft)) lines.push('draft: true');
  lines.push('---', '');
  return lines.join('\n');
}

function parseFrontmatter(markdown) {
  const text = String(markdown || '').replace(/\r\n/g, '\n');
  const match = text.match(/^---\n([\s\S]*?)\n---\n?/);
  if (!match) return { data: {}, body: text };

  const data = {};
  let listKey = null;
  for (const line of match[1].split('\n')) {
    const keyMatch = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (keyMatch) {
      const key = keyMatch[1];
      const rawValue = keyMatch[2].trim();
      if (rawValue === '') {
        data[key] = [];
        listKey = key;
      } else if (rawValue === '[]') {
        data[key] = [];
        listKey = null;
      } else if (rawValue === 'true' || rawValue === 'false') {
        data[key] = rawValue === 'true';
        listKey = null;
      } else {
        data[key] = unquoteYaml(rawValue);
        listKey = null;
      }
      continue;
    }

    const listMatch = line.match(/^\s*-\s*(.*)$/);
    if (listKey && listMatch) data[listKey].push(unquoteYaml(listMatch[1]));
  }

  return { data, body: text.slice(match[0].length) };
}

function safePostPath(slug, extension = '.md') {
  const cleanSlug = slugify(slug);
  if (!cleanSlug) throw new Error('Invalid slug.');
  const filePath = path.join(contentDir, cleanSlug + extension);
  if (!filePath.startsWith(contentDir + path.sep)) throw new Error('Invalid path.');
  return filePath;
}

async function findPostPath(slug) {
  const cleanSlug = slugify(slug);
  for (const extension of postExtensions) {
    const filePath = safePostPath(cleanSlug, extension);
    if (existsSync(filePath)) return filePath;
  }
  return null;
}

async function readPost(slug) {
  const filePath = await findPostPath(slug);
  if (!filePath) {
    const error = new Error('Post not found.');
    error.status = 404;
    throw error;
  }
  const markdown = await readFile(filePath, 'utf8');
  const parsed = parseFrontmatter(markdown);
  const cleanSlug = path.basename(filePath, path.extname(filePath));
  return normalizePost(cleanSlug, filePath, parsed.data, parsed.body);
}

function normalizePost(slug, filePath, data, body = '') {
  const category = categories.has(data.category) ? data.category : 'study';
  return {
    slug,
    title: String(data.title || slug),
    description: String(data.description || ''),
    pubDate: normalizeDate(data.pubDate),
    updatedDate: data.updatedDate ? normalizeDate(data.updatedDate) : '',
    category,
    tags: normalizeTags(data.tags),
    draft: Boolean(data.draft),
    body,
    path: path.relative(root, filePath),
    url: '/blog/' + slug + '/',
  };
}

async function listPosts() {
  await mkdir(contentDir, { recursive: true });
  const files = (await readdir(contentDir))
    .filter((file) => postExtensions.includes(path.extname(file)))
    .sort();
  const posts = [];
  for (const file of files) {
    const filePath = path.join(contentDir, file);
    const markdown = await readFile(filePath, 'utf8');
    const parsed = parseFrontmatter(markdown);
    const slug = path.basename(file, path.extname(file));
    const post = normalizePost(slug, filePath, parsed.data);
    posts.push(post);
  }
  posts.sort((a, b) => String(b.pubDate).localeCompare(String(a.pubDate)) || a.title.localeCompare(b.title));
  return posts;
}

function validatePost(data) {
  const title = String(data.title || '').trim();
  const description = String(data.description || '').trim();
  const body = String(data.body || '').replace(/\r\n/g, '\n').trim();
  const category = String(data.category || '').trim();
  const slug = slugify(data.slug || title);
  const originalSlug = slugify(data.originalSlug || '');
  if (!title) throw new Error('Title is required.');
  if (!description) throw new Error('Description is required.');
  if (!categories.has(category)) throw new Error('Choose a valid category.');
  if (!body) throw new Error('Body is required.');
  if (!slug) throw new Error('Slug could not be generated. Enter one manually.');
  return { ...data, title, description, body, category, slug, originalSlug };
}

async function savePost(data) {
  const post = validatePost(data);
  const existingPath = post.originalSlug ? await findPostPath(post.originalSlug) : null;
  const extension = existingPath ? path.extname(existingPath) : '.md';
  const targetPath = safePostPath(post.slug, extension);
  const relativePath = path.relative(root, targetPath);

  if (post.originalSlug && !existingPath) {
    const error = new Error('Original post was not found. Reload the list and try again.');
    error.status = 404;
    throw error;
  }

  const isSameFile = existingPath && path.resolve(existingPath) === path.resolve(targetPath);
  if (existsSync(targetPath) && !isSameFile && !post.overwrite) {
    const error = new Error('A post with this slug already exists. Enable overwrite to replace it.');
    error.status = 409;
    throw error;
  }

  await mkdir(contentDir, { recursive: true });
  await writeFile(targetPath, frontmatter(post) + post.body + '\n', 'utf8');
  if (existingPath && !isSameFile) await unlink(existingPath);

  return {
    slug: post.slug,
    path: relativePath,
    url: '/blog/' + post.slug + '/',
  };
}

function createPostMiddleware(server, mode) {
  return async (req, res) => {
    try {
      if (req.method === 'OPTIONS') return send(res, 204, {});

      const requestUrl = new URL(req.url || '/', 'http://127.0.0.1');
      const slug = requestUrl.searchParams.get('slug');

      if (req.method === 'GET' && slug) {
        const post = await readPost(slug);
        return send(res, 200, { ok: true, mode, post });
      }

      if (req.method === 'GET') {
        const posts = await listPosts();
        return send(res, 200, { ok: true, mode, contentDir: path.relative(root, contentDir), posts });
      }

      if (req.method !== 'POST') return send(res, 405, { ok: false, error: 'Method not allowed.' });
      const data = await readJson(req);
      const post = await savePost(data);
      server.ws?.send({ type: 'full-reload' });
      return send(res, 201, { ok: true, mode, post });
    } catch (error) {
      return send(res, error.status || 400, { ok: false, error: error.message || 'Could not save post.' });
    }
  };
}

export function localPostWriter() {
  return {
    name: 'local-post-writer',
    apply: 'serve',
    configureServer(server) {
      server.middlewares.use('/api/local-posts', createPostMiddleware(server, 'dev'));
    },
    configurePreviewServer(server) {
      server.middlewares.use('/api/local-posts', createPostMiddleware(server, 'preview'));
    },
  };
}
