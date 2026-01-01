#Development Setup

Follow these steps to set up and run the project locally.

1. Install Yarn (if not installed)

Install Yarn globally:

npm install -g yarn

2. Install Project Dependencies

From the root folder of the project, run:

yarn install

3. Configure Environment Variables

Go to the api folder:

cd api


Copy the example environment file:

cp .env.example .env


Edit .env if needed to update API keys, ports, or database URLs.

4. Start Docker

Make sure Docker Desktop is running.

From the root project folder, start Docker services:

docker compose up


This will start all required services (like databases) in Docker.

5. Prisma Setup (API Only – First Time)

From the api folder, generate the Prisma client:

yarn prisma generate


Only required the first time or after changing the Prisma schema.

6. Start Development Server

From the root folder, start both frontend and backend:

yarn run dev


The app should now be running locally.

7. Build Application (Optional)

Before merging changes, build the app:

yarn run build

Project Structure

/: The main project folder (frontend + backend)

/api: Backend code, Prisma setup, and environment configuration

/frontend: Frontend code (React, Next.js, or similar)

/docs: Project documentation (e.g., this file, reports, diagrams)
