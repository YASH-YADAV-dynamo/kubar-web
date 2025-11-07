import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

// Create a singleton PrismaClient to avoid too many connections in development
const prismaClientSingleton = () => {
  return new PrismaClient();
};

type PrismaGlobal = { prisma: PrismaClient | undefined };
const globalForPrisma = globalThis as unknown as PrismaGlobal;
const prisma = globalForPrisma.prisma ?? prismaClientSingleton();
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export async function POST(request: Request) {
  try {
    console.log('Waitlist API called');
    
    try {
      await prisma.$queryRaw`SELECT 1 as result`;
      console.log('Database connection successful');
    } catch (dbError) {
      console.error('Database connection error:', dbError);
      return NextResponse.json(
        { success: false, error: 'Database connection failed' },
        { status: 500 }
      );
    }
    
    let body;
    try {
      body = await request.json();
      console.log('Request body received:', body);
    } catch (parseError) {
      console.error('Error parsing request body:', parseError);
      return NextResponse.json(
        { error: 'Invalid request format' },
        { status: 400 }
      );
    }
    
    const { name, email } = body;
    
    // Validate required fields
    if (!name || !email) {
      console.log('Missing required fields:', { name, email });
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    // Check if email already exists
    try {
      const existingUser = await prisma.waitlist.findUnique({
        where: { email },
      });
      
      if (existingUser) {
        console.log('User already on waitlist:', email);
        // If user already exists, just return success to not reveal this info
        return NextResponse.json(
          { success: true, message: 'Already on waitlist' }, 
          { status: 200 }
        );
      }
    } catch (findError) {
      console.error('Error checking existing user:', findError);
      return NextResponse.json(
        { success: false, error: 'Error checking user status' },
        { status: 500 }
      );
    }

    // Create a new waitlist entry
    try {
      const waitlistEntry = await prisma.waitlist.create({
        data: {
          name,
          email,
        },
      });
      
      console.log('Waitlist entry created:', waitlistEntry);
      
      return NextResponse.json(
        { success: true, data: waitlistEntry },
        { status: 201 }
      );
    } catch (createError: any) {
      console.error('Error creating waitlist entry:', createError);
      
      // Send a more specific error for unique constraint violations
      if (createError.code === 'P2002') {
        return NextResponse.json(
          { success: false, error: 'This email is already registered' },
          { status: 409 }
        );
      }
      
      return NextResponse.json(
        { success: false, error: 'Failed to join waitlist' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Unexpected error in waitlist API:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to join waitlist' },
      { status: 500 }
    );
  }
}