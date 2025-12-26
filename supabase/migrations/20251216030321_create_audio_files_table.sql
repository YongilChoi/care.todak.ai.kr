/*
  # Create audio_files table
  
  1. New Tables
    - `audio_files`
      - `id` (uuid, primary key) - Unique identifier for each audio file
      - `user_id` (uuid, foreign key) - References auth.users
      - `file_name` (text) - Original filename
      - `file_path` (text) - Path in Supabase Storage
      - `file_size` (bigint) - File size in bytes
      - `status` (text) - Processing status: 'uploading', 'processing', 'completed', 'error'
      - `transcription` (text) - Transcribed text result
      - `error_message` (text, nullable) - Error message if processing failed
      - `created_at` (timestamptz) - Timestamp when file was uploaded
      - `updated_at` (timestamptz) - Timestamp when record was last updated
  
  2. Security
    - Enable RLS on `audio_files` table
    - Add policy for authenticated users to insert their own records
    - Add policy for authenticated users to read their own records
    - Add policy for authenticated users to update their own records
    - Add policy for authenticated users to delete their own records
  
  3. Indexes
    - Add index on `user_id` for faster queries
    - Add index on `status` for filtering by processing status
*/

CREATE TABLE IF NOT EXISTS audio_files (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  file_name text NOT NULL,
  file_path text NOT NULL,
  file_size bigint NOT NULL,
  status text NOT NULL DEFAULT 'uploading',
  transcription text,
  error_message text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE audio_files ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can insert their own audio files"
  ON audio_files
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can read their own audio files"
  ON audio_files
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own audio files"
  ON audio_files
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own audio files"
  ON audio_files
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_audio_files_user_id ON audio_files(user_id);
CREATE INDEX IF NOT EXISTS idx_audio_files_status ON audio_files(status);
CREATE INDEX IF NOT EXISTS idx_audio_files_created_at ON audio_files(created_at DESC);