import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  const { imageUrl } = body;
  if (!imageUrl) {
    return NextResponse.json({ error: 'imageUrl is required' }, { status: 400 });
  }

  // In production, replace with Cloudinary or upload service integration.
  return NextResponse.json({ url: imageUrl });
}
