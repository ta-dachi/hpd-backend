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
    email varchar NULL,
    contact_number_default varchar NULL,
    contact_number_type_default varchar NULL,
    CONSTRAINT employee_pk PRIMARY KEY (id)
);

-- help_desk.contact_info definition

-- Drop table

-- DROP TABLE help_desk.contact_info;

CREATE SEQUENCE contact_info_id_seq;

CREATE TABLE help_desk.contact_info (
    id serial4 NOT NULL,
    contact_number varchar NULL,
    contact_number_type varchar NULL,
    contact_id serial4 NOT NULL,
    created_by varchar NULL,
    created_on timestamp NULL DEFAULT now(),
    updated_by varchar NULL,
    updated_on timestamp NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT employee_contact_pk PRIMARY KEY (contact_id)
);

ALTER TABLE help_desk.contact_info ADD CONSTRAINT contact_info_fk FOREIGN KEY (id) REFERENCES help_desk.contacts(id) ON DELETE CASCADE ON UPDATE CASCADE;

INSERT into help_desk.contacts (first_name, last_name, contact_role, created_by, email) 
VALUES ('Takumio', 'Adachi1', 'Help Desk', 'takumiadachi@gmail.com', 'takumiadachiii@gmail.com')
ON CONFLICT (last_name)
DO NOTHING;

INSERT into help_desk.contacts (first_name, last_name, contact_role, created_by, email) 
VALUES ('Takumiodsa', 'Adachi1', 'Help Desk', 'takumiadachi@gmail.com', 'test@email')
RETURNING id

SELECT id, first_name, last_name, contact_role, created_by, created_on, updated_on FROM help_desk.contacts;

UPDATE help_desk.contacts
SET first_name = 'Takumiooo',
last_name = 'Adachiooo',
contact_role = 'Help Deskk',
created_by = 'takumiadachi@gmail.com'
WHERE id = 5
RETURNING *

  DELETE FROM help_desk.contacts
  WHERE id = $1
  RETURNING *;

INSERT into help_desk.contact_info (id, contact_number, contact_number_type, created_by, updated_by)
VALUES (1, '25081938243', 'Celld', 'takumiadachi@gmail.com', 'takumiadachi@gmail.com')
RETURNING *;

  DELETE FROM help_desk.contacts_info
  WHERE contact_id = $1
  RETURNING *;

UPDATE help_desk.contact_info
SET contact_number = '123456789',
is_default = false,
contact_number_type = 'home',
created_by = 'takumiadachi@gmail.com',
updated_by = 'takumiadachi@gmail.com'
WHERE contact_id = 3
RETURNING *;

  DELETE FROM help_desk.contact_id
  WHERE id = $1
  RETURNING *;

SELECT * 
FROM help_desk.contacts c
INNER JOIN help_desk.contact_info ci 
ON c.id = ci.id
ORDER BY c.last_name

SELECT * 
FROM help_desk.contacts c

SELECT * 
FROM help_desk.contacts c
WHERE id = 22
