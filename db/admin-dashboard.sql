-- Additive dashboard tables. Existing public form submissions are preserved.
CREATE TABLE IF NOT EXISTS admin_site_content (
  content_id text PRIMARY KEY,
  category text NOT NULL CHECK (
    category IN ('home', 'companies', 'products', 'quality', 'projects', 'news', 'investor-info', 'settings')
  ),
  title text NOT NULL,
  path text NOT NULL,
  fields jsonb NOT NULL CHECK (jsonb_typeof(fields) = 'object'),
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'deleted')),
  updated_by text NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now(),
  published_at timestamptz
);

CREATE INDEX IF NOT EXISTS admin_site_content_public_idx
  ON admin_site_content (category, status)
  WHERE status IN ('published', 'deleted');

ALTER TABLE admin_site_content
  ADD COLUMN IF NOT EXISTS published_fields jsonb
    CHECK (published_fields IS NULL OR jsonb_typeof(published_fields) = 'object');

ALTER TABLE intake_submissions
  ADD COLUMN IF NOT EXISTS assigned_to text NOT NULL DEFAULT '',
  ADD COLUMN IF NOT EXISTS notes jsonb NOT NULL DEFAULT '[]'::jsonb
    CHECK (jsonb_typeof(notes) = 'array');
