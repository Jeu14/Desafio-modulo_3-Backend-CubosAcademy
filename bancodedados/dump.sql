--CREATE DATABASE dindin;

CREATE TABLE usuarios (
	id serial primary key,
  nome text not null,
  email text not null unique,
  senha text not null
);

CREATE TABLE categorias (
	id serial primary key,
  descricao text not null
);

CREATE TABLE transacoes (
	id serial primary key,
  descricao text not null,
  valor integer,
  data timestamp DEFAULT now(),
  categoria_id integer references categorias(id),
  usuario_id integer references usuarios(id),
  tipo text
); 