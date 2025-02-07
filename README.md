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
DATABASE_URL="mysql://root@localhost:3306/shiori
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
CREATE DATABASE IF NOT EXISTS `shiori`
DEFAULT CHARACTER SET utf8
COLLATE utf8_general_ci;
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
| Database          | MySQL               |
| ORM               | Prisma              |
| Authentication    | Clerk               |
| Linter            | ESLint              |
| Formatter         | Prettier            |
| Testing Framework | Vitest              |
| Others            | Husky               |
