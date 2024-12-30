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
npx prisma migrate dev --name init
```

## Run

```bash
npm run dev
```

## Access

```
http://localhost:3000
```
