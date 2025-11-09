CREATE TABLE IF NOT EXISTS "DemoRequests" (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20),
    message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE INDEX IF NOT EXISTS idx_demo_requests_email ON "DemoRequests"(email);


CREATE INDEX IF NOT EXISTS idx_demo_requests_created_at ON "DemoRequests"(created_at DESC);

