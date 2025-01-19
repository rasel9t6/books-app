# Book Metadata Manager

This application allows users to search for books using the Google Books API.

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. `.env` fill in the required values:

   - `DATABASE_URL`: file:./db.sqlite
   - `GOOGLE_BOOKS_API`: https://www.googleapis.com/books/v1/volumes
   - `GOOGLE_BOOKS_API_KEY` : "AIzaSyBZyqo35yb9Vmc3ROBN_M_pFQVSxx7DTmM"

4. Run the development server:
   ```bash
   npm run dev
   ```

## Deployment

[Books Metadata App](https://books-metadata-app.vercel.app/)

## Features

- Search for books using the Google Books API
- View book details including title, authors, publication date, total pages, download and description
- Responsive design for mobile and desktop

## Tech Stack

- Next.js
- tRPC
- Prisma
- Tailwind CSS
- Google Books API
