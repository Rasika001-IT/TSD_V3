"use client";
import Link from "next/link";

const REPORT_LABELS = {
  industry_report: "Industry Report",
  tsd_insights: "TSD Insights",
  market_pulse: "Market Pulse",
  whitepaper: "Whitepaper",
  annual_outlook: "Annual Outlook",
};

const ReportTemplate = ({ post, taxonomyData = [], mustReadPosts = [] }) => {
  if (!post) return null;

  return (
    <section className="max-w-[900px] mx-auto px-4 sm:px-6 py-8 sm:py-14">
      {post.report_type && (
        <span className="inline-block bg-primary/15 text-primary text-xs font-semibold uppercase tracking-widest px-3 py-1 mb-4">
          {REPORT_LABELS[post.report_type] || "Report"}
        </span>
      )}

      <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl leading-tight mb-4">
        {post.title.replace(/<[^>]+>/g, "")}
      </h1>

      {post.subtitle && <p className="text-lg text-gray-600 mb-6 font-body">{post.subtitle}</p>}

      {post.image && (
        <img src={post.image} alt={post.title} className="w-full h-[260px] sm:h-[380px] object-cover mb-8" />
      )}

      {/* DOWNLOAD BOX */}
      <div className="border border-gray-200 rounded-xl p-6 bg-white mb-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="font-heading text-xl">Download the report</div>
          <div className="text-sm text-gray-500">
            {[post.page_count ? `${post.page_count} pages` : null, post.is_gated ? "Lead capture required" : "Free download"]
              .filter(Boolean)
              .join(" · ")}
          </div>
        </div>
        {post.pdf_url ? (
          post.is_gated ? (
            <Link href={`/reports/${post.slug}/download`} className="bg-primary text-white px-5 py-3 rounded-md text-sm font-medium hover:opacity-90 whitespace-nowrap">
              Get the report →
            </Link>
          ) : (
            <a href={post.pdf_url} target="_blank" rel="noreferrer" className="bg-primary text-white px-5 py-3 rounded-md text-sm font-medium hover:opacity-90 whitespace-nowrap">
              Download PDF →
            </a>
          )
        ) : (
          <span className="text-sm text-gray-400">PDF coming soon</span>
        )}
      </div>

      {post.content && (
        <article
          className="prose prose-sm sm:prose-base lg:prose-lg max-w-none font-inter"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      )}

      {mustReadPosts.length > 0 && (
        <section className="mt-16">
          <h2 className="font-heading text-2xl mb-6">Related</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mustReadPosts.map((item) => (
              <Link key={item.slug} href={`/article/${item.slug}`} className="group">
                <img src={item.image} alt={item.title} className="w-full h-[200px] object-cover mb-3" />
                <h3 className="font-heading text-lg group-hover:opacity-80">{item.title}</h3>
              </Link>
            ))}
          </div>
        </section>
      )}
    </section>
  );
};

export default ReportTemplate;
