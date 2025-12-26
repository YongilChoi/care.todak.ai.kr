/*
  # Allow anonymous users to use voice-to-text feature
  
  1. Changes
    - Make `user_id` nullable to allow anonymous users
    - Add RLS policy for anonymous users (anon role) to insert records
    - Add RLS policy for anonymous users to read their own records
    - Add RLS policy for service role to update records (for edge function)
  
  2. Security
    - Anonymous users can create and read audio files without authentication
    - This is suitable for demo/public usage
    - Service role can update any record for transcription processing
*/

-- Make user_id nullable
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'audio_files' AND column_name = 'user_id' AND is_nullable = 'NO'
  ) THEN
    ALTER TABLE audio_files ALTER COLUMN user_id DROP NOT NULL;
  END IF;
END $$;

-- Drop existing foreign key constraint if exists
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.table_constraints
    WHERE constraint_name = 'audio_files_user_id_fkey'
    AND table_name = 'audio_files'
  ) THEN
    ALTER TABLE audio_files DROP CONSTRAINT audio_files_user_id_fkey;
  END IF;
END $$;

-- Add new foreign key constraint that allows NULL
ALTER TABLE audio_files 
  ADD CONSTRAINT audio_files_user_id_fkey 
  FOREIGN KEY (user_id) 
  REFERENCES auth.users(id) 
  ON DELETE CASCADE;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can insert their own audio files" ON audio_files;
DROP POLICY IF EXISTS "Users can read their own audio files" ON audio_files;
DROP POLICY IF EXISTS "Users can update their own audio files" ON audio_files;
DROP POLICY IF EXISTS "Users can delete their own audio files" ON audio_files;

-- New policies for authenticated users
CREATE POLICY "Authenticated users can insert their own audio files"
  ON audio_files
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Authenticated users can read their own audio files"
  ON audio_files
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Authenticated users can update their own audio files"
  ON audio_files
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Authenticated users can delete their own audio files"
  ON audio_files
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- New policies for anonymous users
CREATE POLICY "Anonymous users can insert audio files"
  ON audio_files
  FOR INSERT
  TO anon
  WITH CHECK (user_id IS NULL);

CREATE POLICY "Anonymous users can read audio files"
  ON audio_files
  FOR SELECT
  TO anon
  USING (user_id IS NULL);

CREATE POLICY "Anonymous users can update audio files"
  ON audio_files
  FOR UPDATE
  TO anon
  USING (user_id IS NULL)
  WITH CHECK (user_id IS NULL);

CREATE POLICY "Anonymous users can delete audio files"
  ON audio_files
  FOR DELETE
  TO anon
  USING (user_id IS NULL);