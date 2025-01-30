import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';

export async function POST(request: Request) {
  const { username, password } = await request.json();

  // Vergelijk met environment variables
  const adminUsername = process.env.ADMIN_USERNAME;
  const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;

  if (!adminUsername || !adminPasswordHash) {
    return NextResponse.json(
      { error: 'Admin configuratie ontbreekt' },
      { status: 500 }
    );
  }

  const isUsernameValid = username === adminUsername;
  const isPasswordValid = await bcrypt.compare(password, adminPasswordHash);

  if (isUsernameValid && isPasswordValid) {
    const response = NextResponse.json({ success: true });
    // Set secure HTTP-only cookie
    response.cookies.set('admin-auth', 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24, // 1 dag
      path: '/',
    });
    return response;
  }

  return NextResponse.json(
    { error: 'Ongeldige inloggegevens' },
    { status: 401 }
  );
}