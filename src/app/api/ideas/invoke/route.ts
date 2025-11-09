import { NextRequest, NextResponse } from 'next/server';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function POST(request: NextRequest): Promise<Response> {
  try {
    const body = await request.json();
    
    // Prefer the caller-provided thread_id. If missing, generate a UUID-like id
    // using crypto API to keep format consistent with frontend UUIDs.
    const providedThreadId = body.thread_id;
    const generatedThreadId = typeof globalThis.crypto?.randomUUID === 'function'
      ? globalThis.crypto.randomUUID()
      : `uid-${Date.now()}`;

    const payload = {
      thread_id: providedThreadId || generatedThreadId,
      title: body.title,
      description: body.description,
      target_audience: body.target_audience,
      number: body.number || 2,
      collection_name: "Chatgpt",
      DB_name: "persona",
    };

    console.log('Sending request to:', `${API_BASE_URL}/invoke`);
    console.log('With payload:', payload);

    const response = await fetch(`${API_BASE_URL}/invoke`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Upstream server error:', errorText);
      return NextResponse.json({ error: errorText }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Proxy error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}