import { NextRequest, NextResponse } from 'next/server';
import pool from '../../lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, phoneNumber, message } = body;

    // Validate required fields
    if (!firstName || !lastName || !email) {
      return NextResponse.json(
        { success: false, error: 'First name, last name, and email are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Insert into database
    const query = `
      INSERT INTO "DemoRequests" (first_name, last_name, email, phone_number, message, created_at)
      VALUES ($1, $2, $3, $4, $5, CURRENT_TIMESTAMP)
      RETURNING id, first_name, last_name, email, phone_number, message, created_at
    `;

    const values = [firstName, lastName, email, phoneNumber || null, message || null];

    const result = await pool.query(query, values);

    return NextResponse.json(
      {
        success: true,
        message: 'Demo request submitted successfully',
        data: result.rows[0],
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Error saving demo request to database:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to submit demo request. Please try again later.',
      },
      { status: 500 }
    );
  }
}

// Optional: GET endpoint to retrieve demo requests (for admin use)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = parseInt(searchParams.get('offset') || '0');

    const query = `
      SELECT id, first_name, last_name, email, phone_number, message, created_at
      FROM "DemoRequests"
      ORDER BY created_at DESC
      LIMIT $1 OFFSET $2
    `;

    const result = await pool.query(query, [limit, offset]);

    return NextResponse.json(
      {
        success: true,
        data: result.rows,
        count: result.rows.length,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error fetching demo requests:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch demo requests',
      },
      { status: 500 }
    );
  }
}

