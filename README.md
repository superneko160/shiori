# 🔖Shiori

本をどこまで読んだかメモしておく用のアプリ

## Architecture

![アーキテクチャ図](/docs/architecture.png)

## SetUp Environment file

```bash
npm install
```

### Prisma

edit `.env` file.

```env
DATABASE_URL="postgresql://postgres:yourpassword@localhost:5432/shiori?schema=public"
```

### Auth.js

create and edit `.env.local` file.

```env
AUTH_SECRET="your-secret-here"
GOOGLE_CLIENT_ID="your-google-client-id-here"
GOOGLE_CLIENT_SECRET="your-google-client-secret-here"
```

## Create Database

```sql
CREATE DATABASE shiori
WITH
    ENCODING = 'UTF8'
    LC_COLLATE = 'ja_JP.UTF-8'
    LC_CTYPE = 'ja_JP.UTF-8'
    TEMPLATE template0;
```

edit `.env.local` file.

```env
DATABASE_URL="postgresql://neondb_xxxxxxx"
```

## Execute migration

```sh
npx prisma migrate dev
```

## Run

```sh
npm run dev
```

## Access

```
http://localhost:3000
```

## Stacks

| Category          | Technology          |
| ----------------- | ------------------- |
| Framework         | Next.js(App Router) |
| Language          | TypeScript          |
| Package manager   | npm                 |
| CSS Framework     | Tailwind CSS        |
| UI Library        | shadcn/ui           |
| Database          | Neon(PostgreSQL)    |
| ORM               | Prisma              |
| Authentication    | Auth.js             |
| Linter            | ESLint              |
| Formatter         | Prettier            |
| Testing Framework | Vitest              |
| Hosting Service   | Vercel              |
| Others            | Husky               |
