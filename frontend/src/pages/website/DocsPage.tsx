import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Icon } from "@iconify/react";

interface Article {
  slug: string;
  title: string;
  content: string;
}

interface Section {
  category: string;
  description: string;
  icon: string;
  articles: Article[];
}

export default function DocsPage() {
  const { t } = useTranslation();

  const [activeSlug, setActiveSlug] = useState("introduction");
  const [search, setSearch] = useState("");

  const sections = t("docs.sections", {
    returnObjects: true,
  }) as Section[];

  const [openCategories, setOpenCategories] = useState<string[]>(
    sections.map((section) => section.category),
  );

  const allArticles = sections.flatMap((section) =>
    section.articles.map((article) => ({
      ...article,
      category: section.category,
      description: section.description,
      icon: section.icon,
    })),
  );

  const filtered = search.trim()
    ? allArticles.filter(
        (article) =>
          article.title
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          article.content
            .toLowerCase()
            .includes(search.toLowerCase()),
      )
    : null;

  const activeArticle = allArticles.find(
    (article) => article.slug === activeSlug,
  );

  const activeCategory = sections.find((section) =>
    section.articles.some((article) => article.slug === activeSlug),
  );

  const toggleCategory = (category: string) => {
    setOpenCategories((prev) =>
      prev.includes(category)
        ? prev.filter((item) => item !== category)
        : [...prev, category],
    );
  };

  const renderContent = (text: string) =>
    text.split("\n").map((line, index) => {
      if (line.startsWith("**") && line.endsWith("**")) {
        return (
          <h3
            key={index}
            className="mt-8 mb-2 text-sm font-semibold text-white"
          >
            {line.replace(/\*\*/g, "")}
          </h3>
        );
      }

      if (line.startsWith("- ")) {
        return (
          <li
            key={index}
            className="ml-5 mb-2 list-disc text-sm leading-7 text-ink-300"
          >
            {line.slice(2)}
          </li>
        );
      }

      if (line.match(/^\d+ —/)) {
        const [number, ...rest] = line.split(" ");

        return (
          <div
            key={index}
            className="mb-3 flex gap-3 text-sm leading-7"
          >
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-brand-500/10 text-xs font-semibold text-brand-400">
              {number.replace("—", "")}
            </span>

            <span className="text-ink-300">
              {rest.join(" ")}
            </span>
          </div>
        );
      }

      if (line.trim() === "") {
        return <div key={index} className="h-2" />;
      }

      return (
        <p
          key={index}
          className="text-sm leading-7 text-ink-300"
        >
          {line}
        </p>
      );
    });

  return (
    <div className="min-h-[calc(100vh-120px)] bg-surface-950 text-white">
      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-brand-500/[0.05] blur-3xl" />

        <div className="absolute right-0 top-1/3 h-96 w-96 rounded-full bg-cyan-400/[0.04] blur-3xl" />
      </div>

      <div className="relative flex">
        {/* Sidebar */}
        <aside
          className="
            sticky top-0 hidden h-screen w-72 shrink-0
            overflow-y-auto
            border-r border-white/[0.06]
            bg-surface-950/80
            px-5 py-7
            backdrop-blur-xl
            lg:block
          "
        >
          {/* Docs identity */}
          <div className="mb-7">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-500/10">
                <Icon
                  icon="mdi:book-open-page-variant-outline"
                  width={20}
                  className="text-brand-400"
                />
              </div>

              <div>
                <p className="text-sm font-semibold text-white">
                  Mistli
                </p>

                <p className="text-[11px] text-ink-500">
                  {t("docs.navigation.docs")}
                </p>
              </div>
            </div>

            {/* Search */}
            <div className="relative">
              <Icon
                icon="mdi:magnify"
                width={18}
                className="
                  pointer-events-none absolute left-3 top-1/2
                  -translate-y-1/2 text-ink-500
                "
              />

              <input
                type="text"
                placeholder={t("docs.search.placeholder")}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="
                  w-full rounded-xl
                  border border-white/[0.08]
                  bg-white/[0.035]
                  py-2.5 pl-10 pr-3
                  text-xs text-white
                  outline-none
                  transition-all
                  placeholder:text-ink-600
                  focus:border-brand-500/40
                  focus:bg-white/[0.05]
                  focus:ring-2
                  focus:ring-brand-500/10
                "
              />
            </div>
          </div>

          {/* Search results */}
          {filtered ? (
            <div>
              <div className="mb-3 flex items-center justify-between">
                <p className="text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-500">
                  {t("docs.search.results")}
                </p>

                <span className="text-[10px] text-ink-600">
                  {filtered.length}
                </span>
              </div>

              {filtered.length === 0 && (
                <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                  <Icon
                    icon="mdi:file-search-outline"
                    width={22}
                    className="mb-2 text-ink-600"
                  />

                  <p className="text-xs text-ink-500">
                    {t("docs.search.noResults")}
                  </p>
                </div>
              )}

              {filtered.map((article) => (
                <button
                  key={article.slug}
                  onClick={() => {
                    setActiveSlug(article.slug);
                    setSearch("");
                  }}
                  className="
                    mb-1 flex w-full items-center gap-2
                    rounded-lg px-3 py-2.5
                    text-left text-xs
                    text-ink-400
                    transition-all
                    hover:bg-white/[0.04]
                    hover:text-white
                  "
                >
                  <Icon
                    icon="mdi:file-document-outline"
                    width={15}
                    className="shrink-0 text-ink-600"
                  />

                  {article.title}
                </button>
              ))}
            </div>
          ) : (
            <nav>
              {sections.map((section) => {
                const isOpen = openCategories.includes(
                  section.category,
                );

                return (
                  <div
                    key={section.category}
                    className="mb-5"
                  >
                    <button
                      onClick={() =>
                        toggleCategory(section.category)
                      }
                      className="
                        mb-2 flex w-full items-center justify-between
                        rounded-lg px-2 py-1
                        text-left
                        transition-colors
                        hover:bg-white/[0.03]
                      "
                    >
                      <span className="flex items-center gap-2">
                        <Icon
                          icon={section.icon}
                          width={16}
                          className="text-brand-400/80"
                        />

                        <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-500">
                          {section.category}
                        </span>
                      </span>

                      <Icon
                        icon="mdi:chevron-down"
                        width={15}
                        className={`
                          text-ink-600
                          transition-transform
                          ${isOpen ? "rotate-180" : ""}
                        `}
                      />
                    </button>

                    {isOpen && (
                      <div className="space-y-0.5">
                        {section.articles.map((article) => {
                          const active =
                            activeSlug === article.slug;

                          return (
                            <button
                              key={article.slug}
                              onClick={() =>
                                setActiveSlug(article.slug)
                              }
                              className={`
                                group flex w-full items-center gap-2
                                rounded-lg px-3 py-2
                                text-left text-xs
                                transition-all
                                ${
                                  active
                                    ? "bg-brand-500/10 text-brand-300"
                                    : "text-ink-400 hover:bg-white/[0.04] hover:text-white"
                                }
                              `}
                            >
                              <span
                                className={`
                                  h-1.5 w-1.5 rounded-full
                                  transition-all
                                  ${
                                    active
                                      ? "bg-brand-400 shadow-[0_0_8px_rgba(121,146,252,0.8)]"
                                      : "bg-ink-700 group-hover:bg-ink-500"
                                  }
                                `}
                              />

                              {article.title}
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>
          )}
        </aside>

        {/* Main */}
        <main className="min-w-0 flex-1">
          <div className="mx-auto max-w-4xl px-6 py-8 sm:px-10 lg:px-16 lg:py-12">
            {activeArticle && (
              <>
                {/* Breadcrumb */}
                <div className="mb-7 flex flex-wrap items-center gap-2 text-[11px]">
                  <span className="text-ink-500">
                    {t("docs.navigation.docs")}
                  </span>

                  <Icon
                    icon="mdi:chevron-right"
                    width={14}
                    className="text-ink-700"
                  />

                  <span className="text-ink-500">
                    {activeCategory?.category}
                  </span>

                  <Icon
                    icon="mdi:chevron-right"
                    width={14}
                    className="text-ink-700"
                  />

                  <span className="text-brand-400">
                    {activeArticle.title}
                  </span>
                </div>

                {/* Article header */}
                <header className="mb-9">
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-500/15 bg-brand-500/[0.07] px-3 py-1.5">
                    <Icon
                      icon={
                        activeCategory?.icon ||
                        "mdi:file-document-outline"
                      }
                      width={14}
                      className="text-brand-400"
                    />

                    <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-brand-300">
                      {activeCategory?.category}
                    </span>
                  </div>

                  <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                    {activeArticle.title}
                  </h1>

                  <p className="mt-3 max-w-2xl text-sm leading-7 text-ink-400">
                    {activeCategory?.description}
                  </p>

                  <div className="mt-8 h-px bg-gradient-to-r from-brand-500/30 via-white/[0.06] to-transparent" />
                </header>

                {/* Article */}
                <article className="max-w-3xl">
                  {renderContent(activeArticle.content)}
                </article>

                {/* Bottom navigation */}
                <div className="mt-14 flex items-stretch justify-between gap-4 border-t border-white/[0.06] pt-6">
                  {(() => {
                    const index = allArticles.findIndex(
                      (article) =>
                        article.slug === activeSlug,
                    );

                    const prev = allArticles[index - 1];
                    const next = allArticles[index + 1];

                    return (
                      <>
                        {prev ? (
                          <button
                            onClick={() =>
                              setActiveSlug(prev.slug)
                            }
                            className="
                              group flex max-w-[45%] flex-col
                              items-start rounded-xl
                              border border-white/[0.06]
                              bg-white/[0.02]
                              px-4 py-3
                              text-left
                              transition-all
                              hover:border-brand-500/20
                              hover:bg-brand-500/[0.04]
                            "
                          >
                            <span className="mb-1 flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-ink-600">
                              <Icon
                                icon="mdi:arrow-left"
                                width={14}
                              />

                              {t("docs.navigation.previous")}
                            </span>

                            <span className="text-xs font-medium text-ink-300 group-hover:text-brand-300">
                              {prev.title}
                            </span>
                          </button>
                        ) : (
                          <div />
                        )}

                        {next && (
                          <button
                            onClick={() =>
                              setActiveSlug(next.slug)
                            }
                            className="
                              group flex max-w-[45%] flex-col
                              items-end rounded-xl
                              border border-white/[0.06]
                              bg-white/[0.02]
                              px-4 py-3
                              text-right
                              transition-all
                              hover:border-brand-500/20
                              hover:bg-brand-500/[0.04]
                            "
                          >
                            <span className="mb-1 flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-ink-600">
                              {t("docs.navigation.next")}

                              <Icon
                                icon="mdi:arrow-right"
                                width={14}
                              />
                            </span>

                            <span className="text-xs font-medium text-ink-300 group-hover:text-brand-300">
                              {next.title}
                            </span>
                          </button>
                        )}
                      </>
                    );
                  })()}
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
