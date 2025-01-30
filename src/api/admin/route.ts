import { NextResponse } from 'next/server';

export async function POST() {
  const response = NextResponse.json({ success: true });
  response.cookies.delete('admin-auth');
  return response;
}

// Simpele in-memory database voor demo doeleinden
let notifications: any[] = [];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Voeg validatie toe voor productie
    const newNotification = {
      id: Date.now(),
      transactionId: body.transactionId,
      timestamp: body.timestamp,
      status: 'unread',
    };

    notifications.push(newNotification);

    // Simuleer een delay voor demo
    await new Promise(resolve => setTimeout(resolve, 1000));

    return NextResponse.json({ 
      success: true, 
      notification: newNotification 
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to process notification' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(notifications);
}