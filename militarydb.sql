--
-- PostgreSQL database dump
--

-- Dumped from database version 16.9 (Debian 16.9-1.pgdg120+1)
-- Dumped by pg_dump version 17.5

-- Started on 2025-06-30 16:45:51

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 5 (class 2615 OID 2200)
-- Name: public; Type: SCHEMA; Schema: -; Owner: militarydb_pxpm_user
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO militarydb_pxpm_user;

--
-- TOC entry 876 (class 1247 OID 16533)
-- Name: enum_asset_expenditures_status; Type: TYPE; Schema: public; Owner: militarydb_pxpm_user
--

CREATE TYPE public.enum_asset_expenditures_status AS ENUM (
    'RETURNED',
    'EXPENDED'
);


ALTER TYPE public.enum_asset_expenditures_status OWNER TO militarydb_pxpm_user;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 223 (class 1259 OID 16512)
-- Name: asset_assignments; Type: TABLE; Schema: public; Owner: militarydb_pxpm_user
--

CREATE TABLE public.asset_assignments (
    assignment_id uuid NOT NULL,
    personnel_id uuid NOT NULL,
    base_id uuid NOT NULL,
    asset_id uuid NOT NULL,
    quantity integer NOT NULL,
    assigned_date timestamp with time zone
);


ALTER TABLE public.asset_assignments OWNER TO militarydb_pxpm_user;

--
-- TOC entry 224 (class 1259 OID 16537)
-- Name: asset_expenditures; Type: TABLE; Schema: public; Owner: militarydb_pxpm_user
--

CREATE TABLE public.asset_expenditures (
    expenditure_id uuid NOT NULL,
    personnel_id uuid NOT NULL,
    base_id uuid NOT NULL,
    asset_id uuid NOT NULL,
    quantity integer NOT NULL,
    status public.enum_asset_expenditures_status NOT NULL,
    expended_date timestamp with time zone
);


ALTER TABLE public.asset_expenditures OWNER TO militarydb_pxpm_user;

--
-- TOC entry 221 (class 1259 OID 16477)
-- Name: asset_transfers; Type: TABLE; Schema: public; Owner: militarydb_pxpm_user
--

CREATE TABLE public.asset_transfers (
    transfer_id uuid NOT NULL,
    asset_id uuid NOT NULL,
    from_base_id uuid NOT NULL,
    to_base_id uuid NOT NULL,
    quantity integer NOT NULL,
    transfer_date timestamp with time zone,
    created_by uuid
);


ALTER TABLE public.asset_transfers OWNER TO militarydb_pxpm_user;

--
-- TOC entry 218 (class 1259 OID 16432)
-- Name: assets; Type: TABLE; Schema: public; Owner: militarydb_pxpm_user
--

CREATE TABLE public.assets (
    asset_id uuid NOT NULL,
    name character varying(100) NOT NULL,
    category character varying(50) NOT NULL
);


ALTER TABLE public.assets OWNER TO militarydb_pxpm_user;

--
-- TOC entry 219 (class 1259 OID 16439)
-- Name: base_assets; Type: TABLE; Schema: public; Owner: militarydb_pxpm_user
--

CREATE TABLE public.base_assets (
    base_asset_id uuid NOT NULL,
    base_id uuid NOT NULL,
    asset_id uuid NOT NULL,
    total_quantity integer DEFAULT 0 NOT NULL,
    assigned_quantity integer DEFAULT 0 NOT NULL,
    expended_quantity integer DEFAULT 0 NOT NULL
);


ALTER TABLE public.base_assets OWNER TO militarydb_pxpm_user;

--
-- TOC entry 216 (class 1259 OID 16406)
-- Name: bases; Type: TABLE; Schema: public; Owner: militarydb_pxpm_user
--

CREATE TABLE public.bases (
    base_id uuid NOT NULL,
    base_name character varying(100) NOT NULL,
    location character varying(255)
);


ALTER TABLE public.bases OWNER TO militarydb_pxpm_user;

--
-- TOC entry 222 (class 1259 OID 16502)
-- Name: personnel; Type: TABLE; Schema: public; Owner: militarydb_pxpm_user
--

CREATE TABLE public.personnel (
    personnel_id uuid NOT NULL,
    name character varying(100) NOT NULL,
    base_id uuid NOT NULL,
    created_at timestamp with time zone
);


ALTER TABLE public.personnel OWNER TO militarydb_pxpm_user;

--
-- TOC entry 220 (class 1259 OID 16457)
-- Name: purchases; Type: TABLE; Schema: public; Owner: militarydb_pxpm_user
--

CREATE TABLE public.purchases (
    purchase_id uuid NOT NULL,
    base_id uuid NOT NULL,
    asset_id uuid NOT NULL,
    quantity integer NOT NULL,
    amount numeric(12,2) NOT NULL,
    purchase_date timestamp with time zone,
    created_by uuid
);


ALTER TABLE public.purchases OWNER TO militarydb_pxpm_user;

--
-- TOC entry 215 (class 1259 OID 16399)
-- Name: roles; Type: TABLE; Schema: public; Owner: militarydb_pxpm_user
--

CREATE TABLE public.roles (
    role_id uuid NOT NULL,
    role_name character varying(50) NOT NULL
);


ALTER TABLE public.roles OWNER TO militarydb_pxpm_user;

--
-- TOC entry 217 (class 1259 OID 16413)
-- Name: users; Type: TABLE; Schema: public; Owner: militarydb_pxpm_user
--

CREATE TABLE public.users (
    user_id uuid NOT NULL,
    password_hash character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    full_name character varying(255),
    role_id uuid NOT NULL,
    base_id uuid,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL
);


ALTER TABLE public.users OWNER TO militarydb_pxpm_user;

--
-- TOC entry 3585 (class 0 OID 16512)
-- Dependencies: 223
-- Data for Name: asset_assignments; Type: TABLE DATA; Schema: public; Owner: militarydb_pxpm_user
--

COPY public.asset_assignments (assignment_id, personnel_id, base_id, asset_id, quantity, assigned_date) FROM stdin;
27fe7601-ac01-4e4e-880b-4888a95cc092	60939e34-3319-4e3a-9466-e65a72eae5ad	cd30bdc6-9ee4-4067-9369-1b552005e4ca	2f2dc6bc-24fb-4f5b-b9e7-0340de775835	1	2025-06-29 17:12:14.569+00
83f7cfdc-2354-4a3f-99fb-4268295d15a1	9e92c270-e13d-4317-a185-04a7144e5d38	cd30bdc6-9ee4-4067-9369-1b552005e4ca	713164f7-a7e9-4f10-98a7-484f84630c85	3	2025-06-29 17:13:37.805+00
\.


--
-- TOC entry 3586 (class 0 OID 16537)
-- Dependencies: 224
-- Data for Name: asset_expenditures; Type: TABLE DATA; Schema: public; Owner: militarydb_pxpm_user
--

COPY public.asset_expenditures (expenditure_id, personnel_id, base_id, asset_id, quantity, status, expended_date) FROM stdin;
4134bb2e-6b85-4567-9866-30b81738d79a	60939e34-3319-4e3a-9466-e65a72eae5ad	cd30bdc6-9ee4-4067-9369-1b552005e4ca	2f2dc6bc-24fb-4f5b-b9e7-0340de775835	1	EXPENDED	2025-06-29 17:13:58.415+00
\.


--
-- TOC entry 3583 (class 0 OID 16477)
-- Dependencies: 221
-- Data for Name: asset_transfers; Type: TABLE DATA; Schema: public; Owner: militarydb_pxpm_user
--

COPY public.asset_transfers (transfer_id, asset_id, from_base_id, to_base_id, quantity, transfer_date, created_by) FROM stdin;
0127c34f-37ac-4e06-8d78-55514a6e6014	2f2dc6bc-24fb-4f5b-b9e7-0340de775835	194d60c0-d958-4795-9dfd-b9fd1b2a49d3	cd30bdc6-9ee4-4067-9369-1b552005e4ca	12	2025-06-29 16:39:11.038+00	eb477f2a-fe95-43a9-ae5e-0cffebe1014d
998b431f-8eb1-47ca-8f23-3e769fb564a6	2f2dc6bc-24fb-4f5b-b9e7-0340de775835	06b92db7-6650-4ad1-8705-d258e8d235e4	cd30bdc6-9ee4-4067-9369-1b552005e4ca	3	2025-06-29 16:39:20.69+00	eb477f2a-fe95-43a9-ae5e-0cffebe1014d
324e5cbd-9706-4f5f-963a-d78cb2e2c38a	713164f7-a7e9-4f10-98a7-484f84630c85	06b92db7-6650-4ad1-8705-d258e8d235e4	194d60c0-d958-4795-9dfd-b9fd1b2a49d3	3	2025-06-29 16:39:27.668+00	eb477f2a-fe95-43a9-ae5e-0cffebe1014d
\.


--
-- TOC entry 3580 (class 0 OID 16432)
-- Dependencies: 218
-- Data for Name: assets; Type: TABLE DATA; Schema: public; Owner: militarydb_pxpm_user
--

COPY public.assets (asset_id, name, category) FROM stdin;
e03d1de1-9a36-4dc1-b3a0-73f28a7bf5de	Ak-47	Assets
2f2dc6bc-24fb-4f5b-b9e7-0340de775835	Mp-40	Assets
713164f7-a7e9-4f10-98a7-484f84630c85	Mp-5	Assets
a6569a75-5208-418d-ada7-99a060b2a63f	Tank T-90	Vehicle
84fe16c5-8236-487a-ae85-6e98689ec9c6	AK-47	Weapon
4b233d87-1058-4741-bda0-eb02f9241b89	Radioset X12	Communication
1b960ec2-f634-4cf1-adef-af0649813707	Apache Helicopter	Aircraft
cc18814f-a127-4552-ae58-fd28b2a38b0e	Bulletproof Vest	Defense Gear
\.


--
-- TOC entry 3581 (class 0 OID 16439)
-- Dependencies: 219
-- Data for Name: base_assets; Type: TABLE DATA; Schema: public; Owner: militarydb_pxpm_user
--

COPY public.base_assets (base_asset_id, base_id, asset_id, total_quantity, assigned_quantity, expended_quantity) FROM stdin;
d421b907-78c2-41c6-9ad8-5dea820eb83c	cd30bdc6-9ee4-4067-9369-1b552005e4ca	e03d1de1-9a36-4dc1-b3a0-73f28a7bf5de	10	20	5
b212f1b8-98b7-4153-b1e3-edd1f30b37c1	cd30bdc6-9ee4-4067-9369-1b552005e4ca	e03d1de1-9a36-4dc1-b3a0-73f28a7bf5de	100	20	5
47d1ba46-9398-4841-b1e2-b58aeba07c8a	cd30bdc6-9ee4-4067-9369-1b552005e4ca	2f2dc6bc-24fb-4f5b-b9e7-0340de775835	100	21	5
e23009c1-eb94-466e-ba4e-85881391aa76	cd30bdc6-9ee4-4067-9369-1b552005e4ca	713164f7-a7e9-4f10-98a7-484f84630c85	100	23	5
\.


--
-- TOC entry 3578 (class 0 OID 16406)
-- Dependencies: 216
-- Data for Name: bases; Type: TABLE DATA; Schema: public; Owner: militarydb_pxpm_user
--

COPY public.bases (base_id, base_name, location) FROM stdin;
cd30bdc6-9ee4-4067-9369-1b552005e4ca	Base Delhi	Delhi
194d60c0-d958-4795-9dfd-b9fd1b2a49d3	Base Chennai	Chennai
06b92db7-6650-4ad1-8705-d258e8d235e4	Base Bangalore	Bangalore
4d82e588-e5ac-4112-aea0-ccd24951e916	Base Hyd	Hyd
\.


--
-- TOC entry 3584 (class 0 OID 16502)
-- Dependencies: 222
-- Data for Name: personnel; Type: TABLE DATA; Schema: public; Owner: militarydb_pxpm_user
--

COPY public.personnel (personnel_id, name, base_id, created_at) FROM stdin;
289df66f-6c9d-4a1d-820c-cdc8d2230a18	Harshith	cd30bdc6-9ee4-4067-9369-1b552005e4ca	2025-06-29 16:55:35.065987+00
60939e34-3319-4e3a-9466-e65a72eae5ad	Guruji	cd30bdc6-9ee4-4067-9369-1b552005e4ca	2025-06-29 16:56:16.89088+00
9e92c270-e13d-4317-a185-04a7144e5d38	Jeshish	cd30bdc6-9ee4-4067-9369-1b552005e4ca	2025-06-29 16:56:25.703767+00
\.


--
-- TOC entry 3582 (class 0 OID 16457)
-- Dependencies: 220
-- Data for Name: purchases; Type: TABLE DATA; Schema: public; Owner: militarydb_pxpm_user
--

COPY public.purchases (purchase_id, base_id, asset_id, quantity, amount, purchase_date, created_by) FROM stdin;
d9e13998-872d-4d84-8693-a483b55105bb	cd30bdc6-9ee4-4067-9369-1b552005e4ca	e03d1de1-9a36-4dc1-b3a0-73f28a7bf5de	2	1000.00	2025-06-25 00:00:00+00	eb477f2a-fe95-43a9-ae5e-0cffebe1014d
30c19e00-0d85-44f1-aa20-62d54f75d500	194d60c0-d958-4795-9dfd-b9fd1b2a49d3	2f2dc6bc-24fb-4f5b-b9e7-0340de775835	30	10000.00	2025-06-18 00:00:00+00	eb477f2a-fe95-43a9-ae5e-0cffebe1014d
27751d52-9900-459c-af2c-75d448b09801	06b92db7-6650-4ad1-8705-d258e8d235e4	2f2dc6bc-24fb-4f5b-b9e7-0340de775835	5	30000.00	2025-06-27 00:00:00+00	eb477f2a-fe95-43a9-ae5e-0cffebe1014d
bd3edc4c-1d09-47bf-a479-51da94c9fb94	4d82e588-e5ac-4112-aea0-ccd24951e916	713164f7-a7e9-4f10-98a7-484f84630c85	4	4000.00	2025-06-02 00:00:00+00	eb477f2a-fe95-43a9-ae5e-0cffebe1014d
1473c275-c8ef-49c9-bae0-91444743e98b	cd30bdc6-9ee4-4067-9369-1b552005e4ca	e03d1de1-9a36-4dc1-b3a0-73f28a7bf5de	30	40000.00	2025-06-24 00:00:00+00	eb477f2a-fe95-43a9-ae5e-0cffebe1014d
\.


--
-- TOC entry 3577 (class 0 OID 16399)
-- Dependencies: 215
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: militarydb_pxpm_user
--

COPY public.roles (role_id, role_name) FROM stdin;
67a20a2c-ea1d-42d6-8663-242a7dbbda97	admin
8150c8da-012f-4878-a506-37f2b04bc86d	base_commander
c84019ad-46c9-4f5a-a4c6-ebb45072e902	logistics_officer
\.


--
-- TOC entry 3579 (class 0 OID 16413)
-- Dependencies: 217
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: militarydb_pxpm_user
--

COPY public.users (user_id, password_hash, email, full_name, role_id, base_id, created_at, updated_at) FROM stdin;
eb477f2a-fe95-43a9-ae5e-0cffebe1014d	$2a$12$3xqrGK2qIT6jpLEm4iKjNutQVOf2eBkpqq2WQy1lN.iyU6G6Z4dHS	admin@gmail.com	Teja	67a20a2c-ea1d-42d6-8663-242a7dbbda97	cd30bdc6-9ee4-4067-9369-1b552005e4ca	2025-06-29 16:23:13.254167+00	2025-06-29 16:23:13.254167+00
5d949b39-8d6a-4979-b2c0-3c2557f9b54a	$2b$10$EMXquWLHZBCFCHtQtM3oX.Ulo8H5DTfEtwVcEjxE.ELkJZEij4xv6	kishore@gmail.com	Kishore	8150c8da-012f-4878-a506-37f2b04bc86d	194d60c0-d958-4795-9dfd-b9fd1b2a49d3	2025-06-29 16:46:45.244+00	2025-06-29 16:46:45.244+00
\.


--
-- TOC entry 3413 (class 2606 OID 16516)
-- Name: asset_assignments asset_assignments_pkey; Type: CONSTRAINT; Schema: public; Owner: militarydb_pxpm_user
--

ALTER TABLE ONLY public.asset_assignments
    ADD CONSTRAINT asset_assignments_pkey PRIMARY KEY (assignment_id);


--
-- TOC entry 3415 (class 2606 OID 16541)
-- Name: asset_expenditures asset_expenditures_pkey; Type: CONSTRAINT; Schema: public; Owner: militarydb_pxpm_user
--

ALTER TABLE ONLY public.asset_expenditures
    ADD CONSTRAINT asset_expenditures_pkey PRIMARY KEY (expenditure_id);


--
-- TOC entry 3409 (class 2606 OID 16481)
-- Name: asset_transfers asset_transfers_pkey; Type: CONSTRAINT; Schema: public; Owner: militarydb_pxpm_user
--

ALTER TABLE ONLY public.asset_transfers
    ADD CONSTRAINT asset_transfers_pkey PRIMARY KEY (transfer_id);


--
-- TOC entry 3369 (class 2606 OID 19510)
-- Name: assets assets_name_key; Type: CONSTRAINT; Schema: public; Owner: militarydb_pxpm_user
--

ALTER TABLE ONLY public.assets
    ADD CONSTRAINT assets_name_key UNIQUE (name);


--
-- TOC entry 3371 (class 2606 OID 19512)
-- Name: assets assets_name_key1; Type: CONSTRAINT; Schema: public; Owner: militarydb_pxpm_user
--

ALTER TABLE ONLY public.assets
    ADD CONSTRAINT assets_name_key1 UNIQUE (name);


--
-- TOC entry 3373 (class 2606 OID 19502)
-- Name: assets assets_name_key10; Type: CONSTRAINT; Schema: public; Owner: militarydb_pxpm_user
--

ALTER TABLE ONLY public.assets
    ADD CONSTRAINT assets_name_key10 UNIQUE (name);


--
-- TOC entry 3375 (class 2606 OID 19500)
-- Name: assets assets_name_key11; Type: CONSTRAINT; Schema: public; Owner: militarydb_pxpm_user
--

ALTER TABLE ONLY public.assets
    ADD CONSTRAINT assets_name_key11 UNIQUE (name);


--
-- TOC entry 3377 (class 2606 OID 19526)
-- Name: assets assets_name_key12; Type: CONSTRAINT; Schema: public; Owner: militarydb_pxpm_user
--

ALTER TABLE ONLY public.assets
    ADD CONSTRAINT assets_name_key12 UNIQUE (name);


--
-- TOC entry 3379 (class 2606 OID 19498)
-- Name: assets assets_name_key13; Type: CONSTRAINT; Schema: public; Owner: militarydb_pxpm_user
--

ALTER TABLE ONLY public.assets
    ADD CONSTRAINT assets_name_key13 UNIQUE (name);


--
-- TOC entry 3381 (class 2606 OID 19516)
-- Name: assets assets_name_key14; Type: CONSTRAINT; Schema: public; Owner: militarydb_pxpm_user
--

ALTER TABLE ONLY public.assets
    ADD CONSTRAINT assets_name_key14 UNIQUE (name);


--
-- TOC entry 3383 (class 2606 OID 19496)
-- Name: assets assets_name_key15; Type: CONSTRAINT; Schema: public; Owner: militarydb_pxpm_user
--

ALTER TABLE ONLY public.assets
    ADD CONSTRAINT assets_name_key15 UNIQUE (name);


--
-- TOC entry 3385 (class 2606 OID 19528)
-- Name: assets assets_name_key16; Type: CONSTRAINT; Schema: public; Owner: militarydb_pxpm_user
--

ALTER TABLE ONLY public.assets
    ADD CONSTRAINT assets_name_key16 UNIQUE (name);


--
-- TOC entry 3387 (class 2606 OID 19514)
-- Name: assets assets_name_key2; Type: CONSTRAINT; Schema: public; Owner: militarydb_pxpm_user
--

ALTER TABLE ONLY public.assets
    ADD CONSTRAINT assets_name_key2 UNIQUE (name);


--
-- TOC entry 3389 (class 2606 OID 19518)
-- Name: assets assets_name_key3; Type: CONSTRAINT; Schema: public; Owner: militarydb_pxpm_user
--

ALTER TABLE ONLY public.assets
    ADD CONSTRAINT assets_name_key3 UNIQUE (name);


--
-- TOC entry 3391 (class 2606 OID 19508)
-- Name: assets assets_name_key4; Type: CONSTRAINT; Schema: public; Owner: militarydb_pxpm_user
--

ALTER TABLE ONLY public.assets
    ADD CONSTRAINT assets_name_key4 UNIQUE (name);


--
-- TOC entry 3393 (class 2606 OID 19520)
-- Name: assets assets_name_key5; Type: CONSTRAINT; Schema: public; Owner: militarydb_pxpm_user
--

ALTER TABLE ONLY public.assets
    ADD CONSTRAINT assets_name_key5 UNIQUE (name);


--
-- TOC entry 3395 (class 2606 OID 19506)
-- Name: assets assets_name_key6; Type: CONSTRAINT; Schema: public; Owner: militarydb_pxpm_user
--

ALTER TABLE ONLY public.assets
    ADD CONSTRAINT assets_name_key6 UNIQUE (name);


--
-- TOC entry 3397 (class 2606 OID 19504)
-- Name: assets assets_name_key7; Type: CONSTRAINT; Schema: public; Owner: militarydb_pxpm_user
--

ALTER TABLE ONLY public.assets
    ADD CONSTRAINT assets_name_key7 UNIQUE (name);


--
-- TOC entry 3399 (class 2606 OID 19522)
-- Name: assets assets_name_key8; Type: CONSTRAINT; Schema: public; Owner: militarydb_pxpm_user
--

ALTER TABLE ONLY public.assets
    ADD CONSTRAINT assets_name_key8 UNIQUE (name);


--
-- TOC entry 3401 (class 2606 OID 19524)
-- Name: assets assets_name_key9; Type: CONSTRAINT; Schema: public; Owner: militarydb_pxpm_user
--

ALTER TABLE ONLY public.assets
    ADD CONSTRAINT assets_name_key9 UNIQUE (name);


--
-- TOC entry 3403 (class 2606 OID 16436)
-- Name: assets assets_pkey; Type: CONSTRAINT; Schema: public; Owner: militarydb_pxpm_user
--

ALTER TABLE ONLY public.assets
    ADD CONSTRAINT assets_pkey PRIMARY KEY (asset_id);


--
-- TOC entry 3405 (class 2606 OID 16446)
-- Name: base_assets base_assets_pkey; Type: CONSTRAINT; Schema: public; Owner: militarydb_pxpm_user
--

ALTER TABLE ONLY public.base_assets
    ADD CONSTRAINT base_assets_pkey PRIMARY KEY (base_asset_id);


--
-- TOC entry 3289 (class 2606 OID 19428)
-- Name: bases bases_base_name_key; Type: CONSTRAINT; Schema: public; Owner: militarydb_pxpm_user
--

ALTER TABLE ONLY public.bases
    ADD CONSTRAINT bases_base_name_key UNIQUE (base_name);


--
-- TOC entry 3291 (class 2606 OID 19430)
-- Name: bases bases_base_name_key1; Type: CONSTRAINT; Schema: public; Owner: militarydb_pxpm_user
--

ALTER TABLE ONLY public.bases
    ADD CONSTRAINT bases_base_name_key1 UNIQUE (base_name);


--
-- TOC entry 3293 (class 2606 OID 19412)
-- Name: bases bases_base_name_key10; Type: CONSTRAINT; Schema: public; Owner: militarydb_pxpm_user
--

ALTER TABLE ONLY public.bases
    ADD CONSTRAINT bases_base_name_key10 UNIQUE (base_name);


--
-- TOC entry 3295 (class 2606 OID 19420)
-- Name: bases bases_base_name_key11; Type: CONSTRAINT; Schema: public; Owner: militarydb_pxpm_user
--

ALTER TABLE ONLY public.bases
    ADD CONSTRAINT bases_base_name_key11 UNIQUE (base_name);


--
-- TOC entry 3297 (class 2606 OID 19414)
-- Name: bases bases_base_name_key12; Type: CONSTRAINT; Schema: public; Owner: militarydb_pxpm_user
--

ALTER TABLE ONLY public.bases
    ADD CONSTRAINT bases_base_name_key12 UNIQUE (base_name);


--
-- TOC entry 3299 (class 2606 OID 19416)
-- Name: bases bases_base_name_key13; Type: CONSTRAINT; Schema: public; Owner: militarydb_pxpm_user
--

ALTER TABLE ONLY public.bases
    ADD CONSTRAINT bases_base_name_key13 UNIQUE (base_name);


--
-- TOC entry 3301 (class 2606 OID 19418)
-- Name: bases bases_base_name_key14; Type: CONSTRAINT; Schema: public; Owner: militarydb_pxpm_user
--

ALTER TABLE ONLY public.bases
    ADD CONSTRAINT bases_base_name_key14 UNIQUE (base_name);


--
-- TOC entry 3303 (class 2606 OID 19410)
-- Name: bases bases_base_name_key15; Type: CONSTRAINT; Schema: public; Owner: militarydb_pxpm_user
--

ALTER TABLE ONLY public.bases
    ADD CONSTRAINT bases_base_name_key15 UNIQUE (base_name);


--
-- TOC entry 3305 (class 2606 OID 19442)
-- Name: bases bases_base_name_key16; Type: CONSTRAINT; Schema: public; Owner: militarydb_pxpm_user
--

ALTER TABLE ONLY public.bases
    ADD CONSTRAINT bases_base_name_key16 UNIQUE (base_name);


--
-- TOC entry 3307 (class 2606 OID 19408)
-- Name: bases bases_base_name_key17; Type: CONSTRAINT; Schema: public; Owner: militarydb_pxpm_user
--

ALTER TABLE ONLY public.bases
    ADD CONSTRAINT bases_base_name_key17 UNIQUE (base_name);


--
-- TOC entry 3309 (class 2606 OID 19406)
-- Name: bases bases_base_name_key18; Type: CONSTRAINT; Schema: public; Owner: militarydb_pxpm_user
--

ALTER TABLE ONLY public.bases
    ADD CONSTRAINT bases_base_name_key18 UNIQUE (base_name);


--
-- TOC entry 3311 (class 2606 OID 19432)
-- Name: bases bases_base_name_key2; Type: CONSTRAINT; Schema: public; Owner: militarydb_pxpm_user
--

ALTER TABLE ONLY public.bases
    ADD CONSTRAINT bases_base_name_key2 UNIQUE (base_name);


--
-- TOC entry 3313 (class 2606 OID 19434)
-- Name: bases bases_base_name_key3; Type: CONSTRAINT; Schema: public; Owner: militarydb_pxpm_user
--

ALTER TABLE ONLY public.bases
    ADD CONSTRAINT bases_base_name_key3 UNIQUE (base_name);


--
-- TOC entry 3315 (class 2606 OID 19426)
-- Name: bases bases_base_name_key4; Type: CONSTRAINT; Schema: public; Owner: militarydb_pxpm_user
--

ALTER TABLE ONLY public.bases
    ADD CONSTRAINT bases_base_name_key4 UNIQUE (base_name);


--
-- TOC entry 3317 (class 2606 OID 19436)
-- Name: bases bases_base_name_key5; Type: CONSTRAINT; Schema: public; Owner: militarydb_pxpm_user
--

ALTER TABLE ONLY public.bases
    ADD CONSTRAINT bases_base_name_key5 UNIQUE (base_name);


--
-- TOC entry 3319 (class 2606 OID 19438)
-- Name: bases bases_base_name_key6; Type: CONSTRAINT; Schema: public; Owner: militarydb_pxpm_user
--

ALTER TABLE ONLY public.bases
    ADD CONSTRAINT bases_base_name_key6 UNIQUE (base_name);


--
-- TOC entry 3321 (class 2606 OID 19424)
-- Name: bases bases_base_name_key7; Type: CONSTRAINT; Schema: public; Owner: militarydb_pxpm_user
--

ALTER TABLE ONLY public.bases
    ADD CONSTRAINT bases_base_name_key7 UNIQUE (base_name);


--
-- TOC entry 3323 (class 2606 OID 19422)
-- Name: bases bases_base_name_key8; Type: CONSTRAINT; Schema: public; Owner: militarydb_pxpm_user
--

ALTER TABLE ONLY public.bases
    ADD CONSTRAINT bases_base_name_key8 UNIQUE (base_name);


--
-- TOC entry 3325 (class 2606 OID 19440)
-- Name: bases bases_base_name_key9; Type: CONSTRAINT; Schema: public; Owner: militarydb_pxpm_user
--

ALTER TABLE ONLY public.bases
    ADD CONSTRAINT bases_base_name_key9 UNIQUE (base_name);


--
-- TOC entry 3327 (class 2606 OID 16410)
-- Name: bases bases_pkey; Type: CONSTRAINT; Schema: public; Owner: militarydb_pxpm_user
--

ALTER TABLE ONLY public.bases
    ADD CONSTRAINT bases_pkey PRIMARY KEY (base_id);


--
-- TOC entry 3411 (class 2606 OID 16506)
-- Name: personnel personnel_pkey; Type: CONSTRAINT; Schema: public; Owner: militarydb_pxpm_user
--

ALTER TABLE ONLY public.personnel
    ADD CONSTRAINT personnel_pkey PRIMARY KEY (personnel_id);


--
-- TOC entry 3407 (class 2606 OID 16461)
-- Name: purchases purchases_pkey; Type: CONSTRAINT; Schema: public; Owner: militarydb_pxpm_user
--

ALTER TABLE ONLY public.purchases
    ADD CONSTRAINT purchases_pkey PRIMARY KEY (purchase_id);


--
-- TOC entry 3249 (class 2606 OID 16403)
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: militarydb_pxpm_user
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (role_id);


--
-- TOC entry 3251 (class 2606 OID 19402)
-- Name: roles roles_role_name_key; Type: CONSTRAINT; Schema: public; Owner: militarydb_pxpm_user
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_role_name_key UNIQUE (role_name);


--
-- TOC entry 3253 (class 2606 OID 19370)
-- Name: roles roles_role_name_key1; Type: CONSTRAINT; Schema: public; Owner: militarydb_pxpm_user
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_role_name_key1 UNIQUE (role_name);


--
-- TOC entry 3255 (class 2606 OID 19394)
-- Name: roles roles_role_name_key10; Type: CONSTRAINT; Schema: public; Owner: militarydb_pxpm_user
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_role_name_key10 UNIQUE (role_name);


--
-- TOC entry 3257 (class 2606 OID 19392)
-- Name: roles roles_role_name_key11; Type: CONSTRAINT; Schema: public; Owner: militarydb_pxpm_user
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_role_name_key11 UNIQUE (role_name);


--
-- TOC entry 3259 (class 2606 OID 19382)
-- Name: roles roles_role_name_key12; Type: CONSTRAINT; Schema: public; Owner: militarydb_pxpm_user
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_role_name_key12 UNIQUE (role_name);


--
-- TOC entry 3261 (class 2606 OID 19384)
-- Name: roles roles_role_name_key13; Type: CONSTRAINT; Schema: public; Owner: militarydb_pxpm_user
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_role_name_key13 UNIQUE (role_name);


--
-- TOC entry 3263 (class 2606 OID 19390)
-- Name: roles roles_role_name_key14; Type: CONSTRAINT; Schema: public; Owner: militarydb_pxpm_user
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_role_name_key14 UNIQUE (role_name);


--
-- TOC entry 3265 (class 2606 OID 19386)
-- Name: roles roles_role_name_key15; Type: CONSTRAINT; Schema: public; Owner: militarydb_pxpm_user
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_role_name_key15 UNIQUE (role_name);


--
-- TOC entry 3267 (class 2606 OID 19388)
-- Name: roles roles_role_name_key16; Type: CONSTRAINT; Schema: public; Owner: militarydb_pxpm_user
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_role_name_key16 UNIQUE (role_name);


--
-- TOC entry 3269 (class 2606 OID 19368)
-- Name: roles roles_role_name_key17; Type: CONSTRAINT; Schema: public; Owner: militarydb_pxpm_user
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_role_name_key17 UNIQUE (role_name);


--
-- TOC entry 3271 (class 2606 OID 19366)
-- Name: roles roles_role_name_key18; Type: CONSTRAINT; Schema: public; Owner: militarydb_pxpm_user
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_role_name_key18 UNIQUE (role_name);


--
-- TOC entry 3273 (class 2606 OID 19372)
-- Name: roles roles_role_name_key2; Type: CONSTRAINT; Schema: public; Owner: militarydb_pxpm_user
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_role_name_key2 UNIQUE (role_name);


--
-- TOC entry 3275 (class 2606 OID 19374)
-- Name: roles roles_role_name_key3; Type: CONSTRAINT; Schema: public; Owner: militarydb_pxpm_user
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_role_name_key3 UNIQUE (role_name);


--
-- TOC entry 3277 (class 2606 OID 19400)
-- Name: roles roles_role_name_key4; Type: CONSTRAINT; Schema: public; Owner: militarydb_pxpm_user
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_role_name_key4 UNIQUE (role_name);


--
-- TOC entry 3279 (class 2606 OID 19376)
-- Name: roles roles_role_name_key5; Type: CONSTRAINT; Schema: public; Owner: militarydb_pxpm_user
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_role_name_key5 UNIQUE (role_name);


--
-- TOC entry 3281 (class 2606 OID 19378)
-- Name: roles roles_role_name_key6; Type: CONSTRAINT; Schema: public; Owner: militarydb_pxpm_user
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_role_name_key6 UNIQUE (role_name);


--
-- TOC entry 3283 (class 2606 OID 19398)
-- Name: roles roles_role_name_key7; Type: CONSTRAINT; Schema: public; Owner: militarydb_pxpm_user
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_role_name_key7 UNIQUE (role_name);


--
-- TOC entry 3285 (class 2606 OID 19396)
-- Name: roles roles_role_name_key8; Type: CONSTRAINT; Schema: public; Owner: militarydb_pxpm_user
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_role_name_key8 UNIQUE (role_name);


--
-- TOC entry 3287 (class 2606 OID 19380)
-- Name: roles roles_role_name_key9; Type: CONSTRAINT; Schema: public; Owner: militarydb_pxpm_user
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_role_name_key9 UNIQUE (role_name);


--
-- TOC entry 3329 (class 2606 OID 19460)
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: militarydb_pxpm_user
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- TOC entry 3331 (class 2606 OID 19462)
-- Name: users users_email_key1; Type: CONSTRAINT; Schema: public; Owner: militarydb_pxpm_user
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key1 UNIQUE (email);


--
-- TOC entry 3333 (class 2606 OID 19474)
-- Name: users users_email_key10; Type: CONSTRAINT; Schema: public; Owner: militarydb_pxpm_user
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key10 UNIQUE (email);


--
-- TOC entry 3335 (class 2606 OID 19452)
-- Name: users users_email_key11; Type: CONSTRAINT; Schema: public; Owner: militarydb_pxpm_user
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key11 UNIQUE (email);


--
-- TOC entry 3337 (class 2606 OID 19476)
-- Name: users users_email_key12; Type: CONSTRAINT; Schema: public; Owner: militarydb_pxpm_user
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key12 UNIQUE (email);


--
-- TOC entry 3339 (class 2606 OID 19450)
-- Name: users users_email_key13; Type: CONSTRAINT; Schema: public; Owner: militarydb_pxpm_user
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key13 UNIQUE (email);


--
-- TOC entry 3341 (class 2606 OID 19478)
-- Name: users users_email_key14; Type: CONSTRAINT; Schema: public; Owner: militarydb_pxpm_user
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key14 UNIQUE (email);


--
-- TOC entry 3343 (class 2606 OID 19448)
-- Name: users users_email_key15; Type: CONSTRAINT; Schema: public; Owner: militarydb_pxpm_user
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key15 UNIQUE (email);


--
-- TOC entry 3345 (class 2606 OID 19480)
-- Name: users users_email_key16; Type: CONSTRAINT; Schema: public; Owner: militarydb_pxpm_user
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key16 UNIQUE (email);


--
-- TOC entry 3347 (class 2606 OID 19482)
-- Name: users users_email_key17; Type: CONSTRAINT; Schema: public; Owner: militarydb_pxpm_user
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key17 UNIQUE (email);


--
-- TOC entry 3349 (class 2606 OID 19446)
-- Name: users users_email_key18; Type: CONSTRAINT; Schema: public; Owner: militarydb_pxpm_user
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key18 UNIQUE (email);


--
-- TOC entry 3351 (class 2606 OID 19464)
-- Name: users users_email_key2; Type: CONSTRAINT; Schema: public; Owner: militarydb_pxpm_user
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key2 UNIQUE (email);


--
-- TOC entry 3353 (class 2606 OID 19466)
-- Name: users users_email_key3; Type: CONSTRAINT; Schema: public; Owner: militarydb_pxpm_user
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key3 UNIQUE (email);


--
-- TOC entry 3355 (class 2606 OID 19458)
-- Name: users users_email_key4; Type: CONSTRAINT; Schema: public; Owner: militarydb_pxpm_user
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key4 UNIQUE (email);


--
-- TOC entry 3357 (class 2606 OID 19468)
-- Name: users users_email_key5; Type: CONSTRAINT; Schema: public; Owner: militarydb_pxpm_user
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key5 UNIQUE (email);


--
-- TOC entry 3359 (class 2606 OID 19470)
-- Name: users users_email_key6; Type: CONSTRAINT; Schema: public; Owner: militarydb_pxpm_user
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key6 UNIQUE (email);


--
-- TOC entry 3361 (class 2606 OID 19456)
-- Name: users users_email_key7; Type: CONSTRAINT; Schema: public; Owner: militarydb_pxpm_user
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key7 UNIQUE (email);


--
-- TOC entry 3363 (class 2606 OID 19454)
-- Name: users users_email_key8; Type: CONSTRAINT; Schema: public; Owner: militarydb_pxpm_user
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key8 UNIQUE (email);


--
-- TOC entry 3365 (class 2606 OID 19472)
-- Name: users users_email_key9; Type: CONSTRAINT; Schema: public; Owner: militarydb_pxpm_user
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key9 UNIQUE (email);


--
-- TOC entry 3367 (class 2606 OID 16419)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: militarydb_pxpm_user
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- TOC entry 3428 (class 2606 OID 19595)
-- Name: asset_assignments asset_assignments_asset_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: militarydb_pxpm_user
--

ALTER TABLE ONLY public.asset_assignments
    ADD CONSTRAINT asset_assignments_asset_id_fkey FOREIGN KEY (asset_id) REFERENCES public.assets(asset_id) ON UPDATE CASCADE;


--
-- TOC entry 3429 (class 2606 OID 19590)
-- Name: asset_assignments asset_assignments_base_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: militarydb_pxpm_user
--

ALTER TABLE ONLY public.asset_assignments
    ADD CONSTRAINT asset_assignments_base_id_fkey FOREIGN KEY (base_id) REFERENCES public.bases(base_id) ON UPDATE CASCADE;


--
-- TOC entry 3430 (class 2606 OID 19585)
-- Name: asset_assignments asset_assignments_personnel_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: militarydb_pxpm_user
--

ALTER TABLE ONLY public.asset_assignments
    ADD CONSTRAINT asset_assignments_personnel_id_fkey FOREIGN KEY (personnel_id) REFERENCES public.personnel(personnel_id) ON UPDATE CASCADE;


--
-- TOC entry 3431 (class 2606 OID 19610)
-- Name: asset_expenditures asset_expenditures_asset_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: militarydb_pxpm_user
--

ALTER TABLE ONLY public.asset_expenditures
    ADD CONSTRAINT asset_expenditures_asset_id_fkey FOREIGN KEY (asset_id) REFERENCES public.assets(asset_id) ON UPDATE CASCADE;


--
-- TOC entry 3432 (class 2606 OID 19605)
-- Name: asset_expenditures asset_expenditures_base_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: militarydb_pxpm_user
--

ALTER TABLE ONLY public.asset_expenditures
    ADD CONSTRAINT asset_expenditures_base_id_fkey FOREIGN KEY (base_id) REFERENCES public.bases(base_id) ON UPDATE CASCADE;


--
-- TOC entry 3433 (class 2606 OID 19600)
-- Name: asset_expenditures asset_expenditures_personnel_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: militarydb_pxpm_user
--

ALTER TABLE ONLY public.asset_expenditures
    ADD CONSTRAINT asset_expenditures_personnel_id_fkey FOREIGN KEY (personnel_id) REFERENCES public.personnel(personnel_id) ON UPDATE CASCADE;


--
-- TOC entry 3423 (class 2606 OID 19560)
-- Name: asset_transfers asset_transfers_asset_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: militarydb_pxpm_user
--

ALTER TABLE ONLY public.asset_transfers
    ADD CONSTRAINT asset_transfers_asset_id_fkey FOREIGN KEY (asset_id) REFERENCES public.assets(asset_id) ON UPDATE CASCADE;


--
-- TOC entry 3424 (class 2606 OID 19575)
-- Name: asset_transfers asset_transfers_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: militarydb_pxpm_user
--

ALTER TABLE ONLY public.asset_transfers
    ADD CONSTRAINT asset_transfers_created_by_fkey FOREIGN KEY (created_by) REFERENCES public.users(user_id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 3425 (class 2606 OID 19565)
-- Name: asset_transfers asset_transfers_from_base_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: militarydb_pxpm_user
--

ALTER TABLE ONLY public.asset_transfers
    ADD CONSTRAINT asset_transfers_from_base_id_fkey FOREIGN KEY (from_base_id) REFERENCES public.bases(base_id) ON UPDATE CASCADE;


--
-- TOC entry 3426 (class 2606 OID 19570)
-- Name: asset_transfers asset_transfers_to_base_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: militarydb_pxpm_user
--

ALTER TABLE ONLY public.asset_transfers
    ADD CONSTRAINT asset_transfers_to_base_id_fkey FOREIGN KEY (to_base_id) REFERENCES public.bases(base_id) ON UPDATE CASCADE;


--
-- TOC entry 3418 (class 2606 OID 19534)
-- Name: base_assets base_assets_asset_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: militarydb_pxpm_user
--

ALTER TABLE ONLY public.base_assets
    ADD CONSTRAINT base_assets_asset_id_fkey FOREIGN KEY (asset_id) REFERENCES public.assets(asset_id) ON UPDATE CASCADE;


--
-- TOC entry 3419 (class 2606 OID 19529)
-- Name: base_assets base_assets_base_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: militarydb_pxpm_user
--

ALTER TABLE ONLY public.base_assets
    ADD CONSTRAINT base_assets_base_id_fkey FOREIGN KEY (base_id) REFERENCES public.bases(base_id) ON UPDATE CASCADE;


--
-- TOC entry 3427 (class 2606 OID 19580)
-- Name: personnel personnel_base_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: militarydb_pxpm_user
--

ALTER TABLE ONLY public.personnel
    ADD CONSTRAINT personnel_base_id_fkey FOREIGN KEY (base_id) REFERENCES public.bases(base_id) ON UPDATE CASCADE;


--
-- TOC entry 3420 (class 2606 OID 19550)
-- Name: purchases purchases_asset_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: militarydb_pxpm_user
--

ALTER TABLE ONLY public.purchases
    ADD CONSTRAINT purchases_asset_id_fkey FOREIGN KEY (asset_id) REFERENCES public.assets(asset_id) ON UPDATE CASCADE;


--
-- TOC entry 3421 (class 2606 OID 19545)
-- Name: purchases purchases_base_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: militarydb_pxpm_user
--

ALTER TABLE ONLY public.purchases
    ADD CONSTRAINT purchases_base_id_fkey FOREIGN KEY (base_id) REFERENCES public.bases(base_id) ON UPDATE CASCADE;


--
-- TOC entry 3422 (class 2606 OID 19555)
-- Name: purchases purchases_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: militarydb_pxpm_user
--

ALTER TABLE ONLY public.purchases
    ADD CONSTRAINT purchases_created_by_fkey FOREIGN KEY (created_by) REFERENCES public.users(user_id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 3416 (class 2606 OID 19488)
-- Name: users users_base_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: militarydb_pxpm_user
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_base_id_fkey FOREIGN KEY (base_id) REFERENCES public.bases(base_id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- TOC entry 3417 (class 2606 OID 19483)
-- Name: users users_role_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: militarydb_pxpm_user
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_role_id_fkey FOREIGN KEY (role_id) REFERENCES public.roles(role_id) ON UPDATE CASCADE;


--
-- TOC entry 2077 (class 826 OID 16391)
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: -; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON SEQUENCES TO militarydb_pxpm_user;


--
-- TOC entry 2079 (class 826 OID 16393)
-- Name: DEFAULT PRIVILEGES FOR TYPES; Type: DEFAULT ACL; Schema: -; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON TYPES TO militarydb_pxpm_user;


--
-- TOC entry 2078 (class 826 OID 16392)
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: -; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT ALL ON FUNCTIONS TO militarydb_pxpm_user;


--
-- TOC entry 2076 (class 826 OID 16390)
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: -; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres GRANT SELECT,INSERT,REFERENCES,DELETE,TRIGGER,TRUNCATE,UPDATE ON TABLES TO militarydb_pxpm_user;


-- Completed on 2025-06-30 16:46:15

--
-- PostgreSQL database dump complete
--

