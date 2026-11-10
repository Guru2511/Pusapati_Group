ALTER TABLE career_applications
  ADD COLUMN IF NOT EXISTS cv_pathname text,
  ADD COLUMN IF NOT EXISTS cv_filename text,
  ADD COLUMN IF NOT EXISTS cv_content_type text,
  ADD COLUMN IF NOT EXISTS cv_size integer;

ALTER TABLE career_applications
  DROP CONSTRAINT IF EXISTS career_applications_cv_metadata_check;

ALTER TABLE career_applications
  ADD CONSTRAINT career_applications_cv_metadata_check
  CHECK (
    (cv_pathname IS NULL AND cv_filename IS NULL AND cv_content_type IS NULL AND cv_size IS NULL)
    OR (
      cv_pathname IS NOT NULL
      AND cv_filename IS NOT NULL
      AND cv_content_type IS NOT NULL
      AND cv_content_type IN (
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      )
      AND cv_size IS NOT NULL
      AND cv_size BETWEEN 1 AND 5242880
    )
  );
