import { createFileRoute, Link } from "@tanstack/react-router";
import PageHero from "@/components/site/PageHero";
import Reveal from "@/components/site/Reveal";
import { insights } from "@/data/catalogue";
import { applyPublishedContent, usePublishedContent } from "@/lib/site-preview";

export const Route = createFileRoute("/_site/insights")({
  component: InsightsPage,
  head: () => ({
    meta: [
      { title: "News & Insights — Pusapati Group" },
      {
        name: "description",
        content:
          "Notes from the Pusapati Group plant and site — concrete technology, materials, infrastructure and group updates.",
      },
    ],
  }),
});

function InsightsPage() {
  const publishedInsights = usePublishedContent("news");
  const liveInsights = applyPublishedContent(insights, publishedInsights, "news", (post) => `insight-${post.id}`, (post, fields) => ({
    ...post,
    title: fields.title,
    category: fields.category,
    date: fields.date,
    read: fields.read,
    excerpt: fields.excerpt,
    body: fields.content.split(/\n{2,}/).filter(Boolean),
  }), (fields) => ({
    id: fields.id,
    category: fields.category,
    date: fields.date,
    read: fields.read,
    title: fields.title,
    excerpt: fields.excerpt,
    body: (fields.content || "").split(/\n{2,}/).filter(Boolean),
  }));
  return (
    <>
      <PageHero
        eyebrow="News & insights"
        title="Notes from the plant and the site."
        intro="Short technical and editorial pieces on materials, concrete technology and infrastructure delivery — written by the group's operating teams. Company announcements are published here once approved."
        meta={[
          { label: "Articles", value: `${liveInsights.length}` },
          { label: "Topics", value: "Materials · Engineering · Group" },
        ]}
      />

      <section className="bg-paper">
        <div className="container-x py-14 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-12">
            <aside className="lg:col-span-3">
              <div className="lg:sticky lg:top-28">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate">In this issue</p>
                <ul className="mt-4 space-y-3">
                  {liveInsights.map((post) => (
                    <li key={post.id}>
                      <a
                        href={`#${post.id}`}
                        className="block text-[13px] leading-snug text-ink/75 transition-colors hover:text-orange"
                      >
                        {post.title}
                      </a>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 border border-ink/12 p-4">
                  <p className="text-[12px] leading-relaxed text-slate">
                    Media enquiries and interview requests are handled by the group desk.
                  </p>
                  <Link
                    to="/contact"
                    hash="main"
                    className="mt-3 inline-block text-[11px] font-semibold uppercase tracking-[0.14em] text-ink hover:text-orange"
                  >
                    Contact the group
                  </Link>
                </div>
              </div>
            </aside>

            <div className="lg:col-span-9">
              <div className="space-y-14">
                {liveInsights.map((post, i) => (
                  <Reveal key={post.id} as="article" className="scroll-mt-28">
                    <div id={post.id} className="border-t border-ink/15 pt-6">
                      <div className="flex flex-wrap items-center gap-3 font-mono text-[10px] uppercase tracking-[0.16em] text-slate">
                        <span className="text-orange">{post.category}</span>
                        <span className="h-1 w-1 rounded-full bg-slate/40" />
                        <span>{post.date}</span>
                        <span className="h-1 w-1 rounded-full bg-slate/40" />
                        <span>{post.read}</span>
                      </div>
                      <h2 className="mt-4 max-w-[26ch] font-display text-[clamp(1.6rem,3vw,2.4rem)] font-semibold leading-[1.06] tracking-[-0.03em] text-ink">
                        {post.title}
                      </h2>
                      <p className="mt-4 max-w-2xl text-[15px] leading-[1.8] text-slate">{post.excerpt}</p>
                      <div className="mt-6 max-w-2xl space-y-4 text-[15px] leading-[1.85] text-slate">
                        {post.body.map((para) => (
                          <p key={para}>{para}</p>
                        ))}
                      </div>
                      {i === 0 && (
                        <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.14em] text-slate/60">
                          Editorial · technical note
                        </p>
                      )}
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}