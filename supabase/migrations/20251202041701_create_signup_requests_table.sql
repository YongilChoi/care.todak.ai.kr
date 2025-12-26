/*
  # Create signup requests table

  1. New Tables
    - `signup_requests`
      - `id` (uuid, primary key) - Unique identifier for each signup request
      - `name` (text) - Applicant's name
      - `email` (text) - Applicant's email address
      - `phone` (text) - Applicant's phone number
      - `created_at` (timestamptz) - Timestamp when the request was created
      - `status` (text) - Request status (pending, contacted, completed)
  
  2. Security
    - Enable RLS on `signup_requests` table
    - Add policy for public insert access (anyone can submit a signup request)
    - No select/update/delete policies (only admin access through service role)

  3. Notes
    - This table stores all signup requests from the website
    - Admins can query this table directly to see new signups
    - Email notifications can be set up later using database triggers or scheduled functions
*/

CREATE TABLE IF NOT EXISTS signup_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE signup_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert signup requests"
  ON signup_requests
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
