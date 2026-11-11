CREATE TABLE IF NOT EXISTS intelligence_rate_limits (
  client_key text PRIMARY KEY CHECK (client_key ~ '^[a-f0-9]{64}$'),
  window_started_at timestamptz NOT NULL,
  request_count smallint NOT NULL CHECK (request_count > 0)
);

CREATE INDEX IF NOT EXISTS intelligence_rate_limits_window_started_at_idx
  ON intelligence_rate_limits (window_started_at);
