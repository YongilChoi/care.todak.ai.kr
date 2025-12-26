/*
  # Create student records table for 생활기록부 작성 도우미

  1. New Tables
    - `student_records`
      - `id` (uuid, primary key) - Unique identifier
      - `student_name` (text) - Student's name
      - `grade` (integer) - Grade level (1-6 for elementary, 1-3 for middle/high school)
      - `class_number` (integer) - Class number
      - `student_number` (integer) - Student number in class
      - `activity_description` (text) - Description of student's activities/behaviors
      - `generated_record` (text) - AI-generated life record text
      - `created_at` (timestamptz) - Record creation timestamp
      - `updated_at` (timestamptz) - Record update timestamp

  2. Security
    - Enable RLS on `student_records` table
    - Add policy for public access (temporary - will be restricted with auth later)
    
  3. Important Notes
    - This table stores student life records for teachers
    - AI-generated content is stored for editing and reuse
    - Future updates will add authentication and restrict access to specific teachers
*/

CREATE TABLE IF NOT EXISTS student_records (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_name text NOT NULL,
  grade integer NOT NULL,
  class_number integer NOT NULL,
  student_number integer NOT NULL,
  activity_description text NOT NULL,
  generated_record text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE student_records ENABLE ROW LEVEL SECURITY;

-- Temporary policy for development - allows all access
-- This should be updated when authentication is implemented
CREATE POLICY "Allow all access to student records"
  ON student_records
  FOR ALL
  TO public
  USING (true)
  WITH CHECK (true);