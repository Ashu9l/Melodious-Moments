/*
  # Storage Setup for Media Gallery

  1. Storage Configuration
    - Creates a new public bucket named 'media'
    - Sets up appropriate security policies
  
  2. Security Policies
    - Allows public read access to media files
    - Enables authenticated and public users to upload files
    - Permits file deletion
*/

-- Create the media bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('media', 'media', true)
ON CONFLICT (id) DO NOTHING;

-- Policy to allow public access to media files
CREATE POLICY "Allow public access to media"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'media');

-- Policy to allow file uploads
CREATE POLICY "Allow public uploads to media"
ON storage.objects FOR INSERT
TO public
WITH CHECK (bucket_id = 'media');

-- Policy to allow file deletions
CREATE POLICY "Allow public deletions from media"
ON storage.objects FOR DELETE
TO public
USING (bucket_id = 'media');