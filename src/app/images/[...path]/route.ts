import path from 'node:path'
import { promises as fs } from 'node:fs'

import { NextRequest } from 'next/server'

export const runtime = 'nodejs'

const BASE_DIR = path.join(process.cwd(), 'data', 'images')

const EXTENSION_CONTENT_TYPE: Record<string, string> = {
    '.avif': 'image/avif',
    '.bmp': 'image/bmp',
    '.gif': 'image/gif',
    '.ico': 'image/x-icon',
    '.jpeg': 'image/jpeg',
    '.jpg': 'image/jpeg',
    '.png': 'image/png',
    '.svg': 'image/svg+xml',
    '.tif': 'image/tiff',
    '.tiff': 'image/tiff',
    '.webp': 'image/webp',
}

function resolveSafeFile(absBase: string, parts: string[]): string | null {
    const joined = path.join(absBase, ...parts)
    const normalized = path.normalize(joined)

    if (!normalized.startsWith(absBase)) return null

    return normalized
}

function contentTypeFor(filePath: string): string | undefined {
    const ext = path.extname(filePath).toLowerCase()

    return EXTENSION_CONTENT_TYPE[ext]
}

async function readFileSafe(filePath: string) {
    try {
        return await fs.readFile(filePath)
    } catch {
        return null
    }
}

export async function GET(req: NextRequest, { params }: RouteContext<'/images/[...path]'>) {
    const { path: parts } = await params
    const filePath = resolveSafeFile(BASE_DIR, parts)

    if (!filePath) {
        return new Response('Not Found', { status: 404 })
    }

    const data = await readFileSafe(filePath)

    if (!data) {
        return new Response('Not Found', { status: 404 })
    }

    const type = contentTypeFor(filePath) || 'application/octet-stream'
    const headers = new Headers()

    headers.set('Content-Type', type)
    headers.set('Content-Length', String(data.byteLength))
    headers.set('Cache-Control', 'public, max-age=0, must-revalidate')
    headers.set('Content-Disposition', 'inline')

    return new Response(data, { status: 200, headers })
}

export async function HEAD(_req: NextRequest, { params }: RouteContext<'/images/[...path]'>) {
    const { path: parts } = await params
    const filePath = resolveSafeFile(BASE_DIR, parts)

    if (!filePath) return new Response(null, { status: 403 })

    try {
        const stat = await fs.stat(filePath)

        if (!stat.isFile()) throw new Error('Not a file')

        const headers = new Headers()

        headers.set('Content-Length', String(stat.size))

        const type = contentTypeFor(filePath) || 'application/octet-stream'

        headers.set('Content-Type', type)
        headers.set('Cache-Control', 'public, max-age=0, must-revalidate')

        return new Response(null, { status: 200, headers })
    } catch {
        return new Response(null, { status: 404 })
    }
}
