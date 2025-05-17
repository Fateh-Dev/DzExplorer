CREATE OR REPLACE FUNCTION update_trip_rating()
RETURNS TRIGGER AS $$
DECLARE
  trip_id INTEGER;
BEGIN
  -- Determine which trip to update based on trigger operation
  IF TG_OP = 'DELETE' THEN
    trip_id := OLD."tripId";
  ELSE
    trip_id := NEW."tripId";
  END IF;

  UPDATE "Trips"
  SET rating = COALESCE((
    SELECT AVG("rating")::float8
    FROM "Comments"
    WHERE "tripId" = trip_id
  ), 0)
  WHERE "id" = trip_id;

  RETURN NULL;
END;
$$ LANGUAGE plpgsql;


DROP TRIGGER IF EXISTS trigger_update_trip_rating_after_insert ON "Comments";
DROP TRIGGER IF EXISTS trigger_update_trip_rating_after_update ON "Comments";
DROP TRIGGER IF EXISTS trigger_update_trip_rating_after_delete ON "Comments";

-- Recreate them:

CREATE TRIGGER trigger_update_trip_rating_after_insert
AFTER INSERT ON "Comments"
FOR EACH ROW
EXECUTE FUNCTION update_trip_rating();

CREATE TRIGGER trigger_update_trip_rating_after_update
AFTER UPDATE ON "Comments"
FOR EACH ROW
WHEN (OLD."rating" IS DISTINCT FROM NEW."rating" OR OLD."tripId" IS DISTINCT FROM NEW."tripId")
EXECUTE FUNCTION update_trip_rating();

CREATE TRIGGER trigger_update_trip_rating_after_delete
AFTER DELETE ON "Comments"
FOR EACH ROW
EXECUTE FUNCTION update_trip_rating();
