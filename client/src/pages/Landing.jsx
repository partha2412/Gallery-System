import {
  ArrowRight,
  Search,
  ShieldCheck,
  Sparkles,
  Cloud,
  Images,
  Lock,
  Upload,
  Zap,
} from "lucide-react";

export default function LandingPage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#fafafa] text-[#111111]">

      {/* ========================================= */}
      {/* HERO */}
      {/* ========================================= */}

      <section className="relative">

        {/* Background decoration */}

        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute left-1/2 top-[-260px] h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-blue-500/[0.07] blur-3xl" />

          <div className="absolute right-[-200px] top-[300px] h-[400px] w-[400px] rounded-full bg-purple-500/[0.05] blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-24 sm:px-8 sm:pb-28 sm:pt-32 lg:px-10 lg:pb-32 lg:pt-40">

          <div className="mx-auto max-w-4xl text-center">

            {/* Badge */}

            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-black/[0.07] bg-white px-3.5 py-1.5 text-xs font-medium text-black/55 shadow-sm">

              <Sparkles
                size={13}
                className="text-black/50"
              />

              <span>
                Your photos, intelligently organized
              </span>

            </div>

            {/* Heading */}

            <h1 className="text-5xl font-semibold leading-[1.02] tracking-[-0.055em] text-[#111111] sm:text-6xl lg:text-7xl">

              Your memories.
              <br />

              <span className="text-black/35">
                One beautiful gallery.
              </span>

            </h1>

            {/* Description */}

            <p className="mx-auto mt-7 max-w-2xl text-base leading-7 text-black/45 sm:text-lg">
              Upload your photos, keep everything organized,
              and find exactly what you're looking for with
              intelligent semantic search.
            </p>

            {/* CTA */}

            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">

              <button
                type="button"
                className="group flex h-12 items-center justify-center gap-2 rounded-xl bg-[#111111] px-6 text-sm font-medium text-white shadow-xl shadow-black/10 transition-all duration-200 hover:-translate-y-0.5 hover:bg-black active:translate-y-0"
              >
                Start building your gallery

                <ArrowRight
                  size={16}
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </button>

              <button
                type="button"
                className="flex h-12 items-center justify-center rounded-xl border border-black/[0.08] bg-white px-6 text-sm font-medium text-black/65 transition hover:border-black/[0.15] hover:text-black"
              >
                Explore features
              </button>

            </div>

          </div>

          {/* ================================= */}
          {/* HERO PRODUCT PREVIEW */}
          {/* ================================= */}

          <div className="relative mx-auto mt-16 max-w-6xl sm:mt-20">

            {/* Glow */}

            <div className="pointer-events-none absolute -inset-10 rounded-[40px] bg-black/[0.04] blur-3xl" />

            {/* Window */}

            <div className="relative overflow-hidden rounded-2xl border border-black/[0.08] bg-white shadow-[0_30px_80px_-30px_rgba(0,0,0,0.25)]">

              {/* Window top */}

              <div className="flex h-12 items-center border-b border-black/[0.06] bg-white px-4">

                <div className="flex items-center gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-black/10" />
                  <span className="h-2.5 w-2.5 rounded-full bg-black/10" />
                  <span className="h-2.5 w-2.5 rounded-full bg-black/10" />
                </div>

                <div className="mx-auto hidden h-7 w-64 rounded-lg bg-black/[0.025] sm:block" />

                <div className="w-[45px]" />

              </div>

              {/* Dashboard */}

              <div className="p-5 sm:p-7">

                {/* Dashboard header */}

                <div className="mb-6 flex items-center justify-between">

                  <div>
                    <div className="h-4 w-20 rounded bg-black/10" />
                    <div className="mt-2 h-2.5 w-32 rounded bg-black/[0.05]" />
                  </div>

                  <div className="h-9 w-24 rounded-lg bg-black/90" />

                </div>

                {/* Search */}

                <div className="mb-6 flex h-10 items-center rounded-lg border border-black/[0.07] bg-black/[0.015] px-3">

                  <Search
                    size={14}
                    className="text-black/25"
                  />

                  <div className="ml-2 h-2.5 w-32 rounded bg-black/[0.06]" />

                </div>

                {/* Image grid */}

                <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">

                  <div className="aspect-square overflow-hidden rounded-xl bg-gradient-to-br from-slate-200 to-slate-100">
                    <div className="h-full w-full bg-gradient-to-br from-blue-200/50 via-white/20 to-slate-300/60" />
                  </div>

                  <div className="aspect-square overflow-hidden rounded-xl bg-gradient-to-br from-stone-200 to-stone-100">
                    <div className="h-full w-full bg-gradient-to-br from-orange-200/50 via-white/20 to-stone-300/60" />
                  </div>

                  <div className="aspect-square overflow-hidden rounded-xl bg-gradient-to-br from-zinc-200 to-zinc-100">
                    <div className="h-full w-full bg-gradient-to-br from-purple-200/50 via-white/20 to-zinc-300/60" />
                  </div>

                  <div className="aspect-square overflow-hidden rounded-xl bg-gradient-to-br from-gray-200 to-gray-100">
                    <div className="h-full w-full bg-gradient-to-br from-emerald-200/40 via-white/20 to-gray-300/60" />
                  </div>

                  <div className="hidden aspect-square overflow-hidden rounded-xl bg-gradient-to-br from-neutral-200 to-neutral-100 sm:block">
                    <div className="h-full w-full bg-gradient-to-br from-pink-200/40 via-white/20 to-neutral-300/60" />
                  </div>

                  <div className="hidden aspect-square overflow-hidden rounded-xl bg-gradient-to-br from-slate-200 to-slate-100 sm:block">
                    <div className="h-full w-full bg-gradient-to-br from-cyan-200/40 via-white/20 to-slate-300/60" />
                  </div>

                  <div className="hidden aspect-square overflow-hidden rounded-xl bg-gradient-to-br from-stone-200 to-stone-100 sm:block">
                    <div className="h-full w-full bg-gradient-to-br from-yellow-200/40 via-white/20 to-stone-300/60" />
                  </div>

                  <div className="hidden aspect-square overflow-hidden rounded-xl bg-gradient-to-br from-zinc-200 to-zinc-100 sm:block">
                    <div className="h-full w-full bg-gradient-to-br from-indigo-200/40 via-white/20 to-zinc-300/60" />
                  </div>

                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================= */}
      {/* TRUST / INTRO */}
      {/* ========================================= */}

      <section className="border-y border-black/[0.06] bg-white">

        <div className="mx-auto max-w-7xl px-6 py-16 sm:px-8 lg:px-10">

          <div className="mx-auto max-w-2xl text-center">

            <p className="text-xs font-medium uppercase tracking-[0.2em] text-black/30">
              Simple by design
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
              Everything you need.
              <br />
              Nothing you don't.
            </h2>

            <p className="mt-4 text-sm leading-6 text-black/40 sm:text-base">
              A focused photo management experience designed
              around finding, organizing and protecting your
              memories.
            </p>

          </div>

        </div>
      </section>

      {/* ========================================= */}
      {/* FEATURES */}
      {/* ========================================= */}

      <section className="bg-[#fafafa]">

        <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-10 lg:py-28">

          <div className="grid gap-4 md:grid-cols-3">

            {/* Feature 1 */}

            <div className="group rounded-2xl border border-black/[0.07] bg-white p-7 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/[0.04]">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-black/[0.07] bg-black/[0.025]">
                <Upload
                  size={19}
                  strokeWidth={1.7}
                />
              </div>

              <h3 className="mt-6 text-lg font-medium tracking-[-0.02em]">
                Effortless uploads
              </h3>

              <p className="mt-2 text-sm leading-6 text-black/40">
                Upload your photos quickly and keep them
                together in one organized collection.
              </p>

            </div>

            {/* Feature 2 */}

            <div className="group rounded-2xl border border-black/[0.07] bg-white p-7 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/[0.04]">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-black/[0.07] bg-black/[0.025]">
                <Search
                  size={19}
                  strokeWidth={1.7}
                />
              </div>

              <h3 className="mt-6 text-lg font-medium tracking-[-0.02em]">
                Intelligent search
              </h3>

              <p className="mt-2 text-sm leading-6 text-black/40">
                Search your collection naturally instead of
                manually scrolling through hundreds of images.
              </p>

            </div>

            {/* Feature 3 */}

            <div className="group rounded-2xl border border-black/[0.07] bg-white p-7 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/[0.04]">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-black/[0.07] bg-black/[0.025]">
                <ShieldCheck
                  size={19}
                  strokeWidth={1.7}
                />
              </div>

              <h3 className="mt-6 text-lg font-medium tracking-[-0.02em]">
                Private by default
              </h3>

              <p className="mt-2 text-sm leading-6 text-black/40">
                Your personal collection stays separated from
                everyone else's photos.
              </p>

            </div>

          </div>

        </div>
      </section>

      {/* ========================================= */}
      {/* FEATURE SHOWCASE */}
      {/* ========================================= */}

      <section className="overflow-hidden bg-[#111111] text-white">

        <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-10 lg:py-28">

          <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">

            {/* Text */}

            <div>

              <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.1] bg-white/[0.05]">
                <Sparkles
                  size={18}
                  strokeWidth={1.6}
                />
              </div>

              <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/30">
                Search differently
              </p>

              <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
                Find photos using
                <br />
                the way you think.
              </h2>

              <p className="mt-5 max-w-lg text-sm leading-7 text-white/40 sm:text-base">
                Instead of remembering filenames, describe
                what you're looking for. Semantic search helps
                you discover the right image using natural
                language.
              </p>

              <div className="mt-8 flex flex-wrap gap-2">

                <span className="rounded-lg border border-white/[0.08] bg-white/[0.04] px-3 py-2 text-xs text-white/45">
                  sunset at the beach
                </span>

                <span className="rounded-lg border border-white/[0.08] bg-white/[0.04] px-3 py-2 text-xs text-white/45">
                  people outdoors
                </span>

                <span className="rounded-lg border border-white/[0.08] bg-white/[0.04] px-3 py-2 text-xs text-white/45">
                  mountains
                </span>

              </div>

            </div>

            {/* Search card */}

            <div className="relative">

              <div className="absolute -inset-10 rounded-full bg-white/[0.025] blur-3xl" />

              <div className="relative rounded-2xl border border-white/[0.08] bg-white/[0.035] p-4 shadow-2xl">

                <div className="flex items-center gap-3 rounded-xl border border-white/[0.08] bg-black/20 px-4 py-3">

                  <Search
                    size={17}
                    className="text-white/30"
                  />

                  <span className="text-sm text-white/60">
                    photos of a sunset at the beach
                  </span>

                  <Zap
                    size={15}
                    className="ml-auto text-white/25"
                  />

                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">

                  <div className="aspect-[4/3] rounded-xl bg-gradient-to-br from-orange-200/40 via-purple-300/20 to-black" />

                  <div className="aspect-[4/3] rounded-xl bg-gradient-to-br from-blue-200/30 via-orange-200/30 to-black" />

                  <div className="aspect-[4/3] rounded-xl bg-gradient-to-br from-pink-200/30 via-orange-300/20 to-black" />

                  <div className="aspect-[4/3] rounded-xl bg-gradient-to-br from-yellow-200/30 via-purple-200/20 to-black" />

                </div>

              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================= */}
      {/* MORE FEATURES */}
      {/* ========================================= */}

      <section className="bg-white">

        <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-10 lg:py-28">

          <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

            <div>
              <Cloud
                size={20}
                strokeWidth={1.6}
                className="text-black/50"
              />

              <h3 className="mt-5 text-sm font-medium">
                Cloud storage
              </h3>

              <p className="mt-2 text-sm leading-6 text-black/35">
                Keep your collection accessible whenever
                you need it.
              </p>
            </div>

            <div>
              <Images
                size={20}
                strokeWidth={1.6}
                className="text-black/50"
              />

              <h3 className="mt-5 text-sm font-medium">
                Organized gallery
              </h3>

              <p className="mt-2 text-sm leading-6 text-black/35">
                A clean visual space for your entire
                collection.
              </p>
            </div>

            <div>
              <Lock
                size={20}
                strokeWidth={1.6}
                className="text-black/50"
              />

              <h3 className="mt-5 text-sm font-medium">
                Controlled access
              </h3>

              <p className="mt-2 text-sm leading-6 text-black/35">
                Keep your own images separate and private.
              </p>
            </div>

            <div>
              <Zap
                size={20}
                strokeWidth={1.6}
                className="text-black/50"
              />

              <h3 className="mt-5 text-sm font-medium">
                Fast experience
              </h3>

              <p className="mt-2 text-sm leading-6 text-black/35">
                Built for quick uploads, browsing and
                discovery.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ========================================= */}
      {/* FINAL CTA */}
      {/* ========================================= */}

      <section className="bg-[#fafafa]">

        <div className="mx-auto max-w-4xl px-6 py-24 text-center sm:px-8 lg:py-32">

          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-black/[0.07] bg-white shadow-sm">
            <Images
              size={20}
              strokeWidth={1.6}
            />
          </div>

          <h2 className="mt-7 text-3xl font-semibold tracking-[-0.045em] sm:text-5xl">
            Your gallery should
            <br />
            feel effortless.
          </h2>

          <p className="mx-auto mt-5 max-w-lg text-sm leading-6 text-black/40 sm:text-base">
            Bring your photos together and spend less time
            searching for them.
          </p>

          <button
            type="button"
            className="group mt-8 inline-flex h-12 items-center gap-2 rounded-xl bg-[#111111] px-6 text-sm font-medium text-white shadow-xl shadow-black/10 transition hover:-translate-y-0.5 hover:bg-black"
          >
            Get started

            <ArrowRight
              size={16}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </button>

        </div>

      </section>

    </main>
  );
}