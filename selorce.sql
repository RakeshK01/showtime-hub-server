-- This script was generated by the ERD tool in pgAdmin 4.
-- Please log an issue at https://redmine.postgresql.org/projects/pgadmin4/issues/new if you find any bugs, including reproduction steps.
BEGIN;


CREATE TABLE IF NOT EXISTS public.admin_role_table
(

    CONSTRAINT admin_role_table_pkey PRIMARY KEY (art_id)
);

CREATE TABLE IF NOT EXISTS public.admin_table
(

    CONSTRAINT admin_table_pkey PRIMARY KEY (admin_id)
);

CREATE TABLE IF NOT EXISTS public.category_table
(

    CONSTRAINT category_table_pkey PRIMARY KEY (category_id)
);

CREATE TABLE IF NOT EXISTS public.distributor_table
(

    CONSTRAINT distributor_table_pkey PRIMARY KEY (dist_id)
);

CREATE TABLE IF NOT EXISTS public.retailer_table
(

    CONSTRAINT retailer_table_pkey PRIMARY KEY (retailer_id)
);

CREATE TABLE IF NOT EXISTS public.route_table
(

    CONSTRAINT route_table_pkey PRIMARY KEY (route_id)
);

CREATE TABLE IF NOT EXISTS public.sale_details_table
(

    CONSTRAINT sale_details_table_pkey PRIMARY KEY (sd_id)
);

CREATE TABLE IF NOT EXISTS public.sale_table
(

    CONSTRAINT sale_table_pkey PRIMARY KEY (sale_id)
);

CREATE TABLE IF NOT EXISTS public.sku_table
(

    CONSTRAINT sku_table_pkey PRIMARY KEY (sku_id)
);

CREATE TABLE IF NOT EXISTS public.state_table
(

    CONSTRAINT state_table_pkey PRIMARY KEY (state_id)
);

CREATE TABLE IF NOT EXISTS public.user_role_table
(

    CONSTRAINT user_role_table_pkey PRIMARY KEY (urt_id)
);

CREATE TABLE IF NOT EXISTS public.user_table
(

    CONSTRAINT user_table_pkey PRIMARY KEY (user_id)
);

CREATE TABLE IF NOT EXISTS public.zone_table
(

    CONSTRAINT zone_table_pkey PRIMARY KEY (zone_id)
);

ALTER TABLE IF EXISTS public.admin_table
    ADD CONSTRAINT admin_table_role_id_fkey FOREIGN KEY (role_id)
    REFERENCES public.admin_role_table (art_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.admin_table
    ADD CONSTRAINT admin_table_zone_id_fkey FOREIGN KEY (zone_id)
    REFERENCES public.zone_table (zone_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.distributor_table
    ADD CONSTRAINT distributor_table_category_id_fkey FOREIGN KEY (category_id)
    REFERENCES public.category_table (category_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.distributor_table
    ADD CONSTRAINT distributor_table_zone_id_fkey FOREIGN KEY (zone_id)
    REFERENCES public.zone_table (zone_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.retailer_table
    ADD CONSTRAINT retailer_table_category_id_fkey FOREIGN KEY (category_id)
    REFERENCES public.category_table (category_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.retailer_table
    ADD CONSTRAINT retailer_table_zone_id_fkey FOREIGN KEY (zone_id)
    REFERENCES public.zone_table (zone_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.route_table
    ADD CONSTRAINT route_table_zone_id_fkey FOREIGN KEY (zone_id)
    REFERENCES public.zone_table (zone_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.sale_details_table
    ADD CONSTRAINT sale_details_table_zone_id_fkey FOREIGN KEY (zone_id)
    REFERENCES public.zone_table (zone_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.sale_table
    ADD CONSTRAINT sale_table_dist_id_fkey FOREIGN KEY (dist_id)
    REFERENCES public.distributor_table (dist_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.sale_table
    ADD CONSTRAINT sale_table_retailer_id_fkey FOREIGN KEY (retailer_id)
    REFERENCES public.retailer_table (retailer_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.sale_table
    ADD CONSTRAINT sale_table_route_id_fkey FOREIGN KEY (route_id)
    REFERENCES public.route_table (route_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.sale_table
    ADD CONSTRAINT sale_table_seller_id_fkey FOREIGN KEY (seller_id)
    REFERENCES public.user_table (user_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.sale_table
    ADD CONSTRAINT sale_table_zone_id_fkey FOREIGN KEY (zone_id)
    REFERENCES public.zone_table (zone_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.sku_table
    ADD CONSTRAINT sku_table_category_id_fkey FOREIGN KEY (category_id)
    REFERENCES public.category_table (category_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.user_table
    ADD CONSTRAINT user_table_role_id_fkey FOREIGN KEY (role_id)
    REFERENCES public.user_role_table (urt_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.user_table
    ADD CONSTRAINT user_table_zone_id_fkey FOREIGN KEY (zone_id)
    REFERENCES public.zone_table (zone_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.zone_table
    ADD CONSTRAINT zone_table_state_id_fkey FOREIGN KEY (state_id)
    REFERENCES public.state_table (state_id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;

END;