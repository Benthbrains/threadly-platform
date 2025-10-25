CREATE DATABASE threadly;
\c threadly

-- Enable the uuid-ossp extension for generating UUIDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create the initial schema
CREATE SCHEMA IF NOT EXISTS public;