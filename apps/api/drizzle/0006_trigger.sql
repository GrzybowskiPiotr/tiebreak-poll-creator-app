CREATE OR REPLACE FUNCTION check_vote_poll_consistency()
RETURNS TRIGGER AS $$
DECLARE
    option_poll_id UUID;
    voter_poll_id UUID;
BEGIN
    SELECT poll_id
    INTO option_poll_id
    FROM poll_options
    WHERE id = NEW.option_id;

    SELECT poll_id
    INTO voter_poll_id
    FROM poll_voter
    WHERE id = NEW.voter_id;

    IF option_poll_id IS DISTINCT FROM voter_poll_id THEN
        RAISE EXCEPTION
            'Voter and option must belong to the same poll.';
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER vote_poll_consistency_trigger
BEFORE INSERT OR UPDATE OF option_id, voter_id
ON vote
FOR EACH ROW
EXECUTE FUNCTION check_vote_poll_consistency();
