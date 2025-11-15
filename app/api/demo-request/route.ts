import { NextResponse } from 'next/server';
import { getPool } from '@/lib/db';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_MESSAGE_LENGTH = 2000;
const MAX_NAME_LENGTH = 100;
const MAX_PHONE_LENGTH = 20;

type DemoRequestPayload = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  message?: string;
};

const normalizeWhitespace = (value?: string) =>
  (value ?? '')
    .replace(/\s+/g, ' ')
    .trim();

const normalizePhone = (value?: string) => {
  if (!value) return '';
  const digits = value.replace(/[^0-9+]/g, '');
  return digits.startsWith('00') ? `+${digits.slice(2)}` : digits;
};

export async function POST(request: Request) {
  let payload: DemoRequestPayload;

  try {
    payload = await request.json();
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Invalid JSON payload' },
      { status: 400 }
    );
  }

  const firstName = normalizeWhitespace(payload.firstName);
  const lastName = normalizeWhitespace(payload.lastName);
  const email = normalizeWhitespace(payload.email).toLowerCase();
  const phone = normalizePhone(payload.phone);
  const message = normalizeWhitespace(payload.message);

  if (!firstName || !lastName || !email || !message) {
    return NextResponse.json(
      { success: false, error: 'firstName, lastName, email, and message are required.' },
      { status: 400 }
    );
  }

  if (firstName.length > MAX_NAME_LENGTH || lastName.length > MAX_NAME_LENGTH) {
    return NextResponse.json(
      { success: false, error: 'Names must be under 100 characters.' },
      { status: 422 }
    );
  }

  if (!EMAIL_REGEX.test(email)) {
    return NextResponse.json(
      { success: false, error: 'Please provide a valid email address.' },
      { status: 422 }
    );
  }

  if (phone && phone.length > MAX_PHONE_LENGTH) {
    return NextResponse.json(
      { success: false, error: 'Phone numbers must be 20 characters or fewer.' },
      { status: 422 }
    );
  }

  if (message.length > MAX_MESSAGE_LENGTH) {
    return NextResponse.json(
      { success: false, error: 'Messages must be 2000 characters or fewer.' },
      { status: 422 }
    );
  }

  try {
    const pool = getPool();
    const { rows } = await pool.query(
      `INSERT INTO "DemoRequests" (first_name, last_name, email, phone_number, message)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, created_at`,
      [firstName, lastName, email, phone || null, message]
    );

    const record = rows[0];

    return NextResponse.json(
      {
        success: true,
        data: {
          id: record.id,
          createdAt: record.created_at,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error saving demo request', error);
    return NextResponse.json(
      { success: false, error: 'Unable to save your request right now. Please try again shortly.' },
      { status: 500 }
    );
  }
}
