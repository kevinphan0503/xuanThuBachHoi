import { mkdir, stat, copyFile, readdir } from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const SRC = path.resolve(__dirname, '..', 'assets')
const PUBLIC = path.resolve(__dirname, '..', 'public')
const DEST = path.resolve(PUBLIC, 'assets')

async function ensureDir(dir) {
  try {
    await mkdir(dir, { recursive: true })
  } catch (err) {
    console.error('Failed to create directory', dir, err)
    throw err
  }
}

async function copyRecursive(srcDir, destDir) {
  const entries = await readdir(srcDir, { withFileTypes: true })
  for (const entry of entries) {
    const srcPath = path.join(srcDir, entry.name)
    const destPath = path.join(destDir, entry.name)

    if (entry.isDirectory()) {
      await ensureDir(destPath)
      await copyRecursive(srcPath, destPath)
    } else if (entry.isFile()) {
      await copyFile(srcPath, destPath)
      console.log(`Copied: ${srcPath} -> ${destPath}`)
    }
  }
}

async function main() {
  try {
    // ensure public and destination exist
    await ensureDir(PUBLIC)
    await ensureDir(DEST)

    // verify assets source exists
    try {
      await stat(SRC)
    } catch (err) {
      console.error('Source assets folder does not exist:', SRC)
      process.exit(0)
    }

    await copyRecursive(SRC, DEST)

    // if favicon exists in assets, also copy to public root as /favicon.png
    const faviconSrc = path.join(SRC, 'favicon.png')
    try {
      await stat(faviconSrc)
      const faviconDest = path.join(PUBLIC, 'favicon.png')
      await copyFile(faviconSrc, faviconDest)
      console.log(`Copied favicon: ${faviconSrc} -> ${faviconDest}`)
    } catch {}

    console.log('Public assets copy complete.')
  } catch (err) {
    console.error('Error copying public assets', err)
    process.exit(1)
  }
}

main()
