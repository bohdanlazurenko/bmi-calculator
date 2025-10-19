import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ 
    ok: true, 
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  })
}