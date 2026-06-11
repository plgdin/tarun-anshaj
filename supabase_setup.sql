-- Enable UUID extension if needed
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create global_settings table
CREATE TABLE global_settings (
    id INT PRIMARY KEY,
    site_settings JSONB DEFAULT '{}'::jsonb,
    hero_content JSONB DEFAULT '{}'::jsonb,
    about_content JSONB DEFAULT '{}'::jsonb,
    footer_content JSONB DEFAULT '{}'::jsonb
);

-- Create categories table
CREATE TABLE categories (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE
);

-- Create videos table
CREATE TABLE videos (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    thumbnail TEXT,
    video_url TEXT,
    duration TEXT,
    year TEXT,
    category TEXT REFERENCES categories(slug) ON DELETE CASCADE
);

-- Setup Row Level Security (RLS)
ALTER TABLE global_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;

-- Allow public read access to all tables so the frontend can load data
CREATE POLICY "Allow public read global_settings" ON global_settings FOR SELECT USING (true);
CREATE POLICY "Allow public read categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Allow public read videos" ON videos FOR SELECT USING (true);

-- Restrict write/update/delete access to only authenticated users (you)
CREATE POLICY "Allow auth write global_settings" ON global_settings FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow auth write categories" ON categories FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow auth write videos" ON videos FOR ALL USING (auth.role() = 'authenticated');

-- =========================================================================
-- Storage Bucket Setup for 'images'
-- =========================================================================

-- Create the images bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('images', 'images', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public read access to images
CREATE POLICY "Allow public read access to images"
ON storage.objects FOR SELECT
USING (bucket_id = 'images');

-- Allow authenticated users to upload images
CREATE POLICY "Allow auth insert to images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'images');

-- Allow authenticated users to update or delete their images
CREATE POLICY "Allow auth update and delete to images"
ON storage.objects FOR ALL
TO authenticated
USING (bucket_id = 'images');

