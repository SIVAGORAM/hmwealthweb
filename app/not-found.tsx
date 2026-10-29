import { Button, Container } from "@/components/ui/kit";

export default function NotFound() {
  return (
    <section className="bg-gradient-to-b from-mint/70 to-white">
      <Container className="flex min-h-[60vh] flex-col items-center justify-center gap-6 py-24 text-center">
        <p className="text-7xl font-extrabold text-brand">404</p>
        <h1 className="text-3xl font-extrabold text-ink sm:text-4xl">We couldn’t find that page</h1>
        <p className="max-w-md text-lg text-body">The link may be old or the page may have moved.</p>
        <Button href="/">Go to home page</Button>
      </Container>
    </section>
  );
}
