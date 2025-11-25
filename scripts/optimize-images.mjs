#!/usr/bin/env node

/**
 * Optimiza imágenes en una carpeta (por defecto: apps/frontend/public/images)
 * - Soporta: .jpg, .jpeg, .png
 * - Sobrescribe el archivo SOLO si la versión optimizada es más liviana
 *
 * Uso:
 *   npm run images:optimize
 *   npm run images:optimize -- apps/frontend/public/images/otra-carpeta
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const args = process.argv.slice(2);
// Permite pasar una ruta relativa desde la raíz del repo
const targetDir =
  args[0] && !args[0].startsWith('-')
    ? path.resolve(rootDir, args[0])
    : path.resolve(rootDir, 'apps/frontend/public/images');

const SUPPORTED_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png']);

async function getAllImageFiles(dir) {
  const entries = await fs.promises.readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      const nested = await getAllImageFiles(fullPath);
      files.push(...nested);
    } else {
      const ext = path.extname(entry.name).toLowerCase();
      if (SUPPORTED_EXTENSIONS.has(ext)) {
        files.push(fullPath);
      }
    }
  }

  return files;
}

async function optimizeImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();

  const originalBuffer = await fs.promises.readFile(filePath);
  const originalSize = originalBuffer.length;

  let optimizedBuffer;

  if (ext === '.jpg' || ext === '.jpeg') {
    optimizedBuffer = await sharp(originalBuffer)
      .jpeg({
        quality: 80,
        mozjpeg: true,
        progressive: true,
      })
      .toBuffer();
  } else if (ext === '.png') {
    optimizedBuffer = await sharp(originalBuffer)
      .png({
        compressionLevel: 9,
        palette: true,
      })
      .toBuffer();
  } else {
    return { changed: false, originalSize, newSize: originalSize };
  }

  const newSize = optimizedBuffer.length;

  // Solo sobrescribir si realmente ahorramos espacio
  if (newSize < originalSize) {
    await fs.promises.writeFile(filePath, optimizedBuffer);
    return { changed: true, originalSize, newSize };
  }

  return { changed: false, originalSize, newSize };
}

function formatBytes(bytes) {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`;
}

async function main() {
  try {
    if (!fs.existsSync(targetDir)) {
      console.error(`❌ Carpeta no encontrada: ${targetDir}`);
      process.exit(1);
    }

    console.log('🖼️  Optimizando imágenes en:', targetDir);

    const files = await getAllImageFiles(targetDir);

    if (files.length === 0) {
      console.log('ℹ️  No se encontraron imágenes para optimizar.');
      return;
    }

    console.log(`🔍 Imágenes encontradas: ${files.length}`);

    let totalOriginal = 0;
    let totalOptimized = 0;
    let optimizedCount = 0;

    for (const file of files) {
      const { changed, originalSize, newSize } = await optimizeImage(file);
      totalOriginal += originalSize;
      totalOptimized += changed ? newSize : originalSize;

      if (changed) {
        optimizedCount += 1;
        const saved = originalSize - newSize;
        const percent = ((saved / originalSize) * 100).toFixed(1);
        console.log(
          `✅ ${path.relative(rootDir, file)} - ${formatBytes(originalSize)} → ${formatBytes(
            newSize
          )} (ahorro ${formatBytes(saved)} · ${percent}%)`
        );
      } else {
        console.log(
          `➡️  ${path.relative(rootDir, file)} - sin cambios (ya optimizada o sin ganancia)`
        );
      }
    }

    const totalSaved = totalOriginal - totalOptimized;
    const percentTotal = totalOriginal
      ? ((totalSaved / totalOriginal) * 100).toFixed(1)
      : '0.0';

    console.log('\n📊 Resumen:');
    console.log(`   Imágenes procesadas: ${files.length}`);
    console.log(`   Imágenes optimizadas: ${optimizedCount}`);
    console.log(`   Tamaño original total: ${formatBytes(totalOriginal)}`);
    console.log(`   Tamaño optimizado total: ${formatBytes(totalOptimized)}`);
    console.log(`   Ahorro total: ${formatBytes(totalSaved)} (${percentTotal}%)`);
  } catch (error) {
    console.error('❌ Error al optimizar imágenes:', error);
    process.exit(1);
  }
}

main();


