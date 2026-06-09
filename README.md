# Best Internation Resources Platform

This repository contains the complete frontend website and backend admin dashboard for Best Internation Resources LLC. It is built using a modern, scalable tech stack to ensure high performance, SEO optimization, and easy maintenance.

## Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Database**: Prisma ORM (Configured with SQLite for local dev, ready for PostgreSQL in production)
- **Authentication**: Custom JWT with HTTP-only cookies

## Local Setup Instructions

1. **Install Node.js**: Ensure you have Node.js 18+ installed on your machine.
2. **Install Dependencies**:
   ```bash
   npm install
   ```
3. **Setup Environment Variables**:
   Copy the example environment file and customize it.
   ```bash
   cp .env.example .env
   ```
   *Note: For local development, the default SQLite `DATABASE_URL` in `.env.example` is sufficient.*
4. **Initialize Database**:
   Push the Prisma schema to create your local SQLite database.
   ```bash
   npx prisma db push
   ```
5. **Run the Development Server**:
   ```bash
   npm run dev
   ```
6. **Access the App**:
   - Website: [http://localhost:3000](http://localhost:3000)
   - Admin Dashboard: [http://localhost:3000/dashboard](http://localhost:3000/dashboard)
     - Default login: `admin@bestinternation.com`
     - Default password: `password123`

## Production Deployment Guide

We recommend deploying the application on **Vercel** and using **Supabase** (PostgreSQL) for the database. Your domain is managed by **GoDaddy**.

### Step 1: Set up PostgreSQL Database (Supabase)
1. Go to [Supabase](https://supabase.com/) and create a new project.
2. Go to Project Settings -> Database, and copy your **Connection String (URI)**.
3. In your codebase, open `prisma/schema.prisma` and change the provider:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```
4. Push your codebase to a GitHub repository.

### Step 2: Deploy to Vercel
1. Go to [Vercel](https://vercel.com/) and create a new project.
2. Import your GitHub repository.
3. In the "Environment Variables" section, add the following:
   - `DATABASE_URL`: Your Supabase connection string.
   - `JWT_SECRET`: Generate a secure random string (e.g., `openssl rand -base64 32`).
   - `ADMIN_EMAIL`: Your preferred admin email.
   - `ADMIN_PASSWORD`: A strong password.
4. Set the Build Command to `npx prisma generate && next build`.
5. Click **Deploy**. Vercel will build and launch your application.

### Step 3: Connect GoDaddy Domain
1. In your Vercel project dashboard, go to **Settings** > **Domains**.
2. Add your domain `bestinternationresources.com`.
3. Vercel will provide you with DNS records (typically an `A` record and a `CNAME` record).
4. Log in to your **GoDaddy** account, go to the DNS Management for your domain, and add/update the records provided by Vercel.
5. Vercel will automatically provision a free SSL certificate, securing your site with HTTPS.

## Maintainer
Built by Antigravity - Advanced Agentic Coding.
