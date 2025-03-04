import { NextRequest, NextResponse } from 'next/server'

export async function GET(
    request: NextRequest,
    { params }: { params: { filename: string } }
) {
    const { filename } = params

    try {
        const response = await fetch(
            `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/api/images/${filename}`
        )

        if (!response.ok) {
            throw new Error('Failed to fetch image')
        }

        const buffer = await response.arrayBuffer()
        const headers = new Headers(response.headers)

        return new NextResponse(buffer, {
            status: 200,
            headers,
        })
    } catch (error) {
        console.error('Error fetching image:', error)
        return new NextResponse('Error fetching image', { status: 500 })
    }
} 