import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

// Create a singleton PrismaClient to avoid too many connections in development
const prismaClientSingleton = () => {
  return new PrismaClient();
};

// Use global object to prevent multiple instances during hot reloading
type PrismaGlobal = { prisma: PrismaClient | undefined };
const globalForPrisma = globalThis as unknown as PrismaGlobal;
const prisma = globalForPrisma.prisma ?? prismaClientSingleton();
if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, phone, message } = body;
    
    if (!firstName || !lastName || !email || !phone || !message) {
      return NextResponse.json(
        { success: false, error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Store the contact in the database
    const contact = await prisma.contact.create({
      data: {
        firstName,
        lastName,
        email,
        phone,
        message
      }
    });

    return NextResponse.json(
      { success: true, data: contact },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error saving contact to database:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to save contact information' },
      { status: 500 }
    );
  }
}