import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const urlParam = req.nextUrl.searchParams.get('url');

  if (!urlParam) {
    return NextResponse.json({ error: 'Missing url parameter' }, { status: 400 });
  }

  let targetUrl = urlParam;
  if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')) {
    targetUrl = `https://${targetUrl}`;
  }

  try {
    const targetObj = new URL(targetUrl);
    const headers = new Headers();
    headers.set(
      'User-Agent',
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
    );
    headers.set('Accept', 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8');
    headers.set('Accept-Language', 'en-US,en;q=0.9');

    const res = await fetch(targetUrl, {
      method: 'GET',
      headers,
      redirect: 'follow',
    });

    const contentType = res.headers.get('content-type') || 'text/html';

    if (contentType.includes('text/html')) {
      let html = await res.text();
      const baseUrl = targetObj.origin + targetObj.pathname.substring(0, targetObj.pathname.lastIndexOf('/') + 1);

      // Inject base tag for relative stylesheets, images, scripts
      if (html.includes('<head>')) {
        html = html.replace('<head>', `<head><base href="${baseUrl}">`);
      } else if (html.includes('<HEAD>')) {
        html = html.replace('<HEAD>', `<HEAD><base href="${baseUrl}">`);
      } else if (html.includes('<html')) {
        html = html.replace(/<html([^>]*)>/, `<html$1><head><base href="${baseUrl}"></head>`);
      } else {
        html = `<!DOCTYPE html><html><head><base href="${baseUrl}"></head><body>${html}</body></html>`;
      }

      // Return rewritten HTML without X-Frame-Options or restrictive CSP
      return new Response(html, {
        status: res.status,
        headers: {
          'Content-Type': 'text/html; charset=utf-8',
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'no-cache',
        },
      });
    }

    // Binary / Non-HTML content (images, scripts, styles)
    const blob = await res.arrayBuffer();
    return new Response(blob, {
      status: res.status,
      headers: {
        'Content-Type': contentType,
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (err: any) {
    return NextResponse.json({ error: 'Proxy request failed', details: err.message }, { status: 502 });
  }
}
