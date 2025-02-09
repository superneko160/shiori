# 🔖Shiori

本をどこまで読んだかメモしておく用のアプリ

## SetUp Environment file

```bash
npm install
```

### Prisma

```bash
touch .env
```

```env
DATABASE_URL="postgresql://postgres:yourpassword@localhost:5432/shiori?schema=public"
```

### Clerk

```bash
touch .env.local
```

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=xxxxx
CLERK_SECRET_KEY=xxxxx
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

## Execute migration

```bash
npx prisma migrate dev
```

## Run

```bash
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
| Database          | PostgreSQL          |
| ORM               | Prisma              |
| Authentication    | Clerk               |
| Linter            | ESLint              |
| Formatter         | Prettier            |
| Testing Framework | Vitest              |
| Others            | Husky               |
