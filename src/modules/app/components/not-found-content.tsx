import ButtonLink from "@/components/ui/button-link";

export default function NotFoundContent() {
  return (
    <div className="flex min-h-svh items-center px-4 pt-28 pb-24 sm:px-8">
      <div className="container mx-auto flex max-w-xl flex-col items-start gap-5">
        <p className="text-muted text-sm tabular-nums">404</p>
        <h1 className="title">This page doesn&apos;t exist.</h1>
        <p className="text-muted text-pretty">
          The link may be old or mistyped. Here are the places most people are
          looking for.
        </p>
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="/" variant="solidDark">
            Go home
          </ButtonLink>
          <ButtonLink href="/portfolio">See the portfolio</ButtonLink>
          <ButtonLink href="/schedule">Book a call</ButtonLink>
        </div>
      </div>
    </div>
  );
}
