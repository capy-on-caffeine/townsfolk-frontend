import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const path = searchParams.get('path') || '';
    const token = request.headers.get('Authorization') || searchParams.get('authorization');

    const response = await fetch(`${API_BASE_URL}${path}`, {
      headers: {
        'Authorization': token || '',
        'Content-Type': 'application/json',
      },
    });

    console.log('Upstream response:', response);
    

    // Check if the response is ok
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Upstream server error:', errorText);
      return new Response(errorText, {
        status: response.status,
        headers: {
          'Content-Type': response.headers.get('Content-Type') || 'text/plain',
        },
      });
    }

    // Handle SSE responses
    const responseContentType = response.headers.get('Content-Type');
    if (responseContentType?.includes('text/event-stream')) {
      return new Response(response.body, {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
        },
      });
    }

    try {
      const data = await response.json();
      return NextResponse.json(data);
    } catch (error) {
      const text = await response.text();
      return new Response(text, {
        headers: {
          'Content-Type': responseContentType || 'text/plain',
        },
      });
    }
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const path = searchParams.get('path') || '';
    const token = request.headers.get('Authorization');
    const contentType = request.headers.get('Content-Type') || 'application/json';
    const accept = request.headers.get('Accept') || 'application/json';
    
    let body;
    try {
      body = await request.json();
    } catch (e) {
      body = null;
    }

    const response = await fetch(`${API_BASE_URL}${path}`, {
      method: 'POST',
      headers: {
        'Authorization': token || '',
        'Content-Type': contentType,
        'Accept': accept,
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    // Check if the response status is ok
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Upstream server error:', errorText);
      return new Response(errorText, {
        status: response.status,
        headers: {
          'Content-Type': response.headers.get('Content-Type') || 'text/plain',
        },
      });
    }

    // Handle SSE responses
    const responseContentType = response.headers.get('Content-Type');
    if (responseContentType?.includes('text/event-stream')) {
      return new Response(response.body, {
        headers: {
          'Content-Type': 'text/event-stream',
          'Cache-Control': 'no-cache',
          'Connection': 'keep-alive',
        },
      });
    }

    // Handle other responses
    if (responseContentType?.includes('application/json')) {
      const data = await response.json();
      return NextResponse.json(data);
    } else {
      // For non-JSON responses, return as-is
      const text = await response.text();
      return new Response(text, {
        status: response.status,
        headers: {
          'Content-Type': responseContentType || 'text/plain',
        },
      });
    }
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}