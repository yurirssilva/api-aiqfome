#!/bin/sh

echo "Aguardando PostgreSQL em postgresDB:5432..."

while ! nc -z postgresDB 5432; do
  sleep 1
done

echo "PostgreSQL está pronto! Iniciando a aplicação..."
exec "$@"