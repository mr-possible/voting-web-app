-- Table: public.voter

-- DROP TABLE IF EXISTS public.voter;

CREATE TABLE IF NOT EXISTS public.voter
(
    email character varying(200) COLLATE pg_catalog."default" NOT NULL,
    passport character varying(200) COLLATE pg_catalog."default" NOT NULL,
    pubkey bytea,
    has_voted boolean,
    CONSTRAINT voter_pkey PRIMARY KEY (passport)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.voter
    OWNER to "YOUR_DB_OWNER_NAME_COMES_HERE";