CREATE TABLE IF NOT EXISTS admin_documents (
  document_id text PRIMARY KEY,
  pathname text NOT NULL UNIQUE,
  title text NOT NULL CHECK (char_length(title) BETWEEN 1 AND 200),
  category text NOT NULL CHECK (char_length(category) BETWEEN 1 AND 80),
  filename text NOT NULL CHECK (char_length(filename) BETWEEN 1 AND 255),
  content_type text NOT NULL CHECK (
    content_type IN (
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'text/csv'
    )
  ),
  file_size integer NOT NULL CHECK (file_size BETWEEN 1 AND 20971520),
  uploaded_by text NOT NULL,
  uploaded_at timestamptz NOT NULL DEFAULT now(),
  CHECK (pathname LIKE 'admin-documents/%')
);

CREATE INDEX IF NOT EXISTS admin_documents_uploaded_at_idx
  ON admin_documents (uploaded_at DESC);
