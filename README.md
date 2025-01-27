# Shiori

本をどこまで読んだかメモしておく用のアプリ

## SetUp Environment file

```bash
npm install
```

```bash
touch .env
```

```bash
DATABASE_URL="mysql://root@localhost:3306/shiori
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
| Linter            | ESLint              |
| Formatter         | Prettier            |
| Testing Framework	| Vitest              |
| Others            | Husky               |
