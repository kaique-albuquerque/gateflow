import { copyFile } from 'node:fs/promises';
import { resolve } from 'node:path';

// O GitHub Pages não reescreve rotas para o index.html; a cópia em 404.html
// permite que recarregar /visitantes, /moradores etc. continue funcionando.
const dist = resolve(import.meta.dirname, '..', 'dist');

await copyFile(resolve(dist, 'index.html'), resolve(dist, '404.html'));
console.log('Fallback SPA criado em dist/404.html');
