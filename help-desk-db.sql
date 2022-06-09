-- help_desk.contact definition

-- Drop table

--DROP TABLE help_desk.contacts;

CREATE SEQUENCE contacts_id_seq;

CREATE TABLE help_desk.contacts (
    id serial4 NOT NULL,
    first_name varchar NULL,
    last_name varchar NULL,
    contact_role varchar NULL,
    created_by varchar NULL,
    created_on timestamp NULL DEFAULT now(),
    updated_on timestamp NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT employee_pk PRIMARY KEY (id)
);

-- help_desk.contact_info definition

-- Drop table

-- DROP TABLE help_desk.contact_info;

CREATE TABLE help_desk.contact_info (
	id int NOT NULL,
	contact_number varchar NULL,
	contact_number_type varchar NULL,
	contact_id int NOT NULL,
	created_by varchar NULL,
	created_on varchar NULL,
	updated_by timestamp NULL,
	updated_on timestamp NULL,
	CONSTRAINT employee_contact_pk PRIMARY KEY (contact_id)
);

ALTER TABLE help_desk.contact_info ADD CONSTRAINT contact_info_fk FOREIGN KEY (id) REFERENCES help_desk.contacts(id) ON DELETE CASCADE ON UPDATE CASCADE;

INSERT into help_desk.contacts (first_name, last_name, contact_role, created_by) 
VALUES ('Takumio', 'Adachi1', 'Help Desk', 'takumiadachi@gmail.com');
--ON CONFLICT (first_name, last_name)
--DO NOTHING

UPDATE help_desk.contacts
SET first_name = 'Takumiooo',
last_name = 'Adachiooo',
contact_role = 'Help Deskk',
created_by = 'takumiadachi@gmail.com'
WHERE id = 5
RETURNING *