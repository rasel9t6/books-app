import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { env } from "~/env.js";

type GoogleBook = {
  id: string;
  volumeInfo: {
    title: string;
    authors: string[];
    publishedDate?: string;
    description?: string;
    imageLinks?: {
      thumbnail: string;
    };
    pageCount?: number;
  };
  accessInfo: {
    epub: {
      downloadLink: string;
    };
    webReaderLink: string;
  };
};

type GoogleBooksResponse = {
  items?: GoogleBook[];
};

export const bookRouter = createTRPCRouter({
  search: publicProcedure
    .input(z.object({ title: z.string() }))
    .query(async ({ input }) => {
      // Fetch book data from Google Books API
      const response = await fetch(
        `${env.GOOGLE_BOOKS_API}?q=${encodeURIComponent(input.title)}&key=${env.GOOGLE_BOOKS_API_KEY}`,
      );
      // Check if the request was successful
      if (!response.ok) {
        throw new Error("Failed to fetch from Google Books API");
      }

      // Parse the JSON response
      const data = (await response.json()) as GoogleBooksResponse;
      // Return the formatted list of books or an empty array
      return (
        data.items?.map((item) => ({
          id: item.id,
          title: item.volumeInfo.title,
          authors: item.volumeInfo.authors ?? [],
          publishedDate: item.volumeInfo.publishedDate,
          description: item.volumeInfo.description,
          imageUrl: item.volumeInfo.imageLinks?.thumbnail,
          pageCount: item.volumeInfo.pageCount,
          downloadLink: item.accessInfo?.epub?.downloadLink,
          webReader: item.accessInfo?.webReaderLink,
        })) ?? []
      );
    }),

  save: publicProcedure
    .input(
      z.object({
        bookId: z.string(),
        title: z.string(),
        authors: z.array(z.string()),
        description: z.string().optional(),
        imageUrl: z.string().optional(),
        publishedDate: z.string().optional(),
        pageCount: z.number().optional(),
        downloadLink: z.string().optional(),
        webReader: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const savedBook = await ctx.db.savedBook.upsert({
        where: { bookId: input.bookId },
        update: input,
        create: input,
      });
      return savedBook;
    }),

  isSaved: publicProcedure
    .input(z.object({ bookId: z.string() }))
    .query(async ({ ctx, input }) => {
      const savedBook = await ctx.db.savedBook.findUnique({
        where: { bookId: input.bookId },
      });
      return !!savedBook;
    }),
});
