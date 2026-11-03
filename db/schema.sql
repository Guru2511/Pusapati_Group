CREATE TABLE IF NOT EXISTS intake_submissions (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  submission_type text NOT NULL CHECK (
    submission_type IN ('enquiry', 'contact', 'vendor', 'career', 'investor')
  ),
  payload jsonb NOT NULL CHECK (jsonb_typeof(payload) = 'object'),
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now()
);
