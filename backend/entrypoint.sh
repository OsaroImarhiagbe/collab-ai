#!/bin/bash
set -e

MAX_RETRIES=30
RETRY_INTERVAL=2
count=0

echo "⏳ Waiting for database to be ready..."

until pg_isready -h db -p 5432 -U "${POSTGRES_USER}" -d "${POSTGRES_DB}" -q; do
    count=$((count + 1))
    if [ "$count" -ge "$MAX_RETRIES" ]; then
        echo "❌ Database did not become ready after $((MAX_RETRIES * RETRY_INTERVAL))s. Exiting."
        exit 1
    fi
    echo "Database is unavailable - retry $count/$MAX_RETRIES..."
    sleep "$RETRY_INTERVAL"
done

echo "✅ Database is ready!"

# Show pending migrations before applying (great for debugging)
echo "📋 Pending migrations:"
alembic history --indicate-current

echo "🚀 Running Alembic migrations..."

if alembic upgrade head; then
    echo "✅ Migrations applied successfully."
else
    echo "❌ Migration failed. Container kept alive for debugging."
    echo "   → Inspect:  docker compose exec backend alembic history --indicate-current"
    echo "   → Rollback: docker compose exec backend alembic downgrade -1"
    echo "   → Check:    docker compose exec backend alembic current"
    while true; do sleep 3600; done
fi

echo "🟢 Starting FastAPI server..."
exec uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload



