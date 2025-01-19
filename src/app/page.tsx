import { HydrateClient } from "~/trpc/server";
import BookList from "./_components/BookList";

export default async function Home() {
  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-start bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <h1 className="text-[2rem] font-extrabold tracking-tight sm:text-[4rem] lg:text-[5rem]">
            Books <span className="text-[hsl(280,100%,70%)]">Metadata</span> App
          </h1>
          <div className="flex flex-col items-center gap-2">
            <p className="text-2xl tracking-widest text-white">Search books</p>
          </div>
          <BookList />
        </div>
      </main>
    </HydrateClient>
  );
}
