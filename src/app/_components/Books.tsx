"use client";
import { api } from "~/trpc/react";
import Image from "next/image";
import Link from "next/link";
import Loading from "../loading";

interface BooksProps {
  query: string;
}

export default function Books({ query }: BooksProps) {
  const { data: books, isLoading } = api.book.search.useQuery(
    { title: query },
    {
      enabled: !!query,
    },
  );

  if (isLoading) {
    return <Loading />;
  }

  if (!books || books.length === 0) {
    return <div>No books found</div>;
  }
  console.log(books[0]);
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {books.map((book) => (
        <div
          key={book.id}
          className="flex flex-col justify-between gap-2 rounded-lg bg-white/10 p-4"
        >
          <Image
            src={book.imageUrl ?? "/placeholder-image.jpg"}
            alt={book.title}
            width={100}
            height={100}
            className="rounded-lg object-cover"
          />
          <h3 className="text-xl font-bold">{book.title}</h3>
          <p>
            <strong>Authors:</strong> {book.authors.join(", ")}
          </p>
          <p>
            <strong>Published Date:</strong> {book.publishedDate}
          </p>
          <p className="line-clamp-3">{book.description}</p>
          {book.pageCount && (
            <p className="text-[hsl(280,100%,70%)]">{book.pageCount} pages</p>
          )}
          <div className="flex items-center justify-between gap-1">
            {book.downloadLink && (
              <Link
                href={book.downloadLink}
                className="rounded-full bg-white px-4 py-2 text-black"
              >
                Download
              </Link>
            )}
            {book.webReader && (
              <Link
                href={book.webReader}
                className="rounded-full border px-4 py-2"
              >
                Web Reader
              </Link>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
