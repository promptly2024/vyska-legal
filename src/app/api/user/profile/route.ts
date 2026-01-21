import { NextResponse } from 'next/server';
import { syncUser } from '@/actions/syncUser'; import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const user = await syncUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized, please log in.' }, { status: 401 });
    }

    // console.log('User found:', user);
    const userProfile = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
      select: {
        id: true,
        clerkId: true,
        name: true,
        email: true,
        role: true,
        profilePicture: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!userProfile) {
      console.log('User not found');
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json(userProfile);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
