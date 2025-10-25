@echo off
echo Starting Threadly development environment...

REM Check if PostgreSQL is running
echo Checking PostgreSQL status...
pg_isready -h localhost -p 5432
if %ERRORLEVEL% NEQ 0 (
    echo PostgreSQL is not running. Please start PostgreSQL first.
    exit /b 1
)

REM Generate Prisma client
echo Generating Prisma client...
npx prisma generate

REM Push database schema
echo Pushing database schema...
npx prisma db push

REM Start the development server
echo Starting Next.js development server...
npm run dev