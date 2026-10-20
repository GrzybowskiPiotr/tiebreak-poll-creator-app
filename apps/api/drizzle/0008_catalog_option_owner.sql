CREATE OR REPLACE FUNCTION check_catalog_option_owner()
RETURNS TRIGGER AS $$
DECLARE
poll_owner_id UUID;
catalog_owner_id UUID;
BEGIN
  IF NEW.catalog_option_id IS NOT NULL THEN

    SELECT
        p.user_id,
        oc.user_id
    INTO
        poll_owner_id,
        catalog_owner_id
    FROM poll AS p
    JOIN catalog_option AS co
        ON co.id = NEW.catalog_option_id
    JOIN option_catalog AS oc
        ON co.catalog_id = oc.id
    WHERE p.id = NEW.poll_id;

    IF poll_owner_id IS DISTINCT FROM catalog_owner_id THEN
        RAISE EXCEPTION
            'Poll and catalog option must have the same owner.';
    END IF;

 END IF;

 RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER catalog_option_owner_trigger
BEFORE INSERT OR UPDATE OF poll_id, catalog_option_id
ON  poll_options
FOR EACH ROW
EXECUTE FUNCTION check_catalog_option_owner();