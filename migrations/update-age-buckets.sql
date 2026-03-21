-- Update child_age_buckets from old slugs to new slugs
-- Old: "0-1", "2-4", "5-11", "12+"
-- New: "0-6m", "6-24m", "2-5y", "5-16y"

-- Replace old bucket values with new ones for all users
UPDATE users
SET child_age_buckets = (
  SELECT array_agg(
    CASE
      WHEN elem = '0-1' THEN '0-6m'
      WHEN elem = '2-4' THEN '2-5y'
      WHEN elem = '5-11' THEN '5-16y'
      WHEN elem = '12+' THEN '5-16y'
      ELSE elem
    END
  )
  FROM unnest(child_age_buckets) AS elem
),
updated_at = now()
WHERE child_age_buckets IS NOT NULL
  AND child_age_buckets && ARRAY['0-1', '2-4', '5-11', '12+'];

-- Remove duplicates that may have been introduced (e.g. both "5-11" and "12+" mapped to "5-16y")
UPDATE users
SET child_age_buckets = (
  SELECT array_agg(DISTINCT elem ORDER BY elem)
  FROM unnest(child_age_buckets) AS elem
)
WHERE child_age_buckets IS NOT NULL;

-- Update vendor age_relevance arrays similarly
UPDATE vendors
SET age_relevance = (
  SELECT array_agg(
    CASE
      WHEN elem = '0-1' THEN '0-6m'
      WHEN elem = '2-4' THEN '2-5y'
      WHEN elem = '5-11' THEN '5-16y'
      WHEN elem = '12+' THEN '5-16y'
      ELSE elem
    END
  )
  FROM unnest(age_relevance) AS elem
)
WHERE age_relevance IS NOT NULL
  AND age_relevance && ARRAY['0-1', '2-4', '5-11', '12+'];

-- Remove duplicates from vendors too
UPDATE vendors
SET age_relevance = (
  SELECT array_agg(DISTINCT elem ORDER BY elem)
  FROM unnest(age_relevance) AS elem
)
WHERE age_relevance IS NOT NULL;
