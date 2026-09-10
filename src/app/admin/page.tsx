"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

type Service = {
  slug: string;
  name: string;
  summary: string;
  intro: string;
  metaTitle: string;
  metaDescription: string;
  image: string;
  items: string[];
};

type Project = {
  slug: string;
  name: string;
  category: string;
  location?: string;
  note?: string;
  description?: string;
  featured?: boolean;
  cover: string;
  images: string[];
};

type Credential = {
  slug: string;
  title: string;
  short: string;
  detail: string;
};

type Associate = {
  name: string;
  logo: string;
};

type Contact = {
  address: string;
  phones: { label: string; number: string }[];
  email: string;
};

type Stat = { value: number; suffix: string; label: string };
type Value = { icon: "award" | "target" | "users" | "map-pin"; title: string; text: string };

type SiteCopy = {
  hero: {
    eyebrow: string;
    headline: string;
    subheadline: string;
    primaryCtaLabel: string;
    secondaryCtaLabel: string;
    badge: string;
    stats: Stat[];
  };
  aboutPreview: { eyebrow: string; headline: string; body: string; points: string[] };
  credentialsSection: { eyebrow: string; headline: string; description: string };
  ctaBanner: { eyebrow: string; headline: string; description: string };
  aboutPage: {
    heroEyebrow: string;
    heroTitle: string;
    heroDescription: string;
    storyEyebrow: string;
    storyHeadline: string;
    storyParagraphs: string[];
    valuesEyebrow: string;
    valuesHeadline: string;
    values: Value[];
  };
  contactPage: {
    heroEyebrow: string;
    heroTitle: string;
    heroDescription: string;
    directLinesEyebrow: string;
    directLinesHeadline: string;
    officeHeadline: string;
    formEyebrow: string;
    formHeadline: string;
    formDescription: string;
  };
};

type SiteContent = {
  siteCopy: SiteCopy;
  services: Service[];
  projects: Project[];
  credentials: Credential[];
  associates: Associate[];
  contact: Contact;
};

const ICON_OPTIONS: Value["icon"][] = ["award", "target", "users", "map-pin"];

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const TABS = ["Site Text", "Services", "Projects", "Credentials", "Associates", "Contact"] as const;
type Tab = (typeof TABS)[number];

function field(label: string, children: React.ReactNode) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block font-medium text-neutral-700">{label}</span>
      {children}
    </label>
  );
}

const inputClass =
  "w-full rounded-md border border-neutral-300 px-3 py-2 text-sm focus:border-neutral-900 focus:outline-none";

function ImageUploader({
  value,
  onChange,
  label = "Image",
}: {
  value: string;
  onChange: (path: string) => void;
  label?: string;
}) {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (res.ok) onChange(data.path);
      else alert(data.error || "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="flex items-center gap-3">
      {value && (
        <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-md border border-neutral-200">
          <Image src={value} alt="" fill sizes="96px" className="object-cover" />
        </div>
      )}
      <div className="flex-1">
        <span className="mb-1 block text-sm font-medium text-neutral-700">{label}</span>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleFile(file);
          }}
          className="text-xs"
        />
        {uploading && <p className="mt-1 text-xs text-neutral-500">Uploading…</p>}
      </div>
    </div>
  );
}

export default function AdminPage() {
  const [content, setContent] = useState<SiteContent | null>(null);
  const [tab, setTab] = useState<Tab>("Services");
  const [status, setStatus] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [publishing, setPublishing] = useState(false);

  useEffect(() => {
    fetch("/api/admin/content")
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to load content");
        setContent(data);
      })
      .catch((err) => setError(err.message));
  }, []);

  async function save() {
    if (!content) return;
    setStatus("Saving…");
    const res = await fetch("/api/admin/content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(content),
    });
    const data = await res.json();
    if (res.ok) {
      setStatus("Saved. Refresh the site to see changes.");
    } else {
      setStatus("");
      setError(data.error || "Save failed");
    }
    setTimeout(() => setStatus(""), 4000);
  }

  async function publish() {
    if (!content) return;
    setPublishing(true);
    setStatus("Saving…");
    const saveRes = await fetch("/api/admin/content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(content),
    });
    if (!saveRes.ok) {
      const data = await saveRes.json();
      setStatus("");
      setError(data.error || "Save failed");
      setPublishing(false);
      return;
    }

    setStatus("Publishing to the live site…");
    const publishRes = await fetch("/api/admin/publish", { method: "POST" });
    const data = await publishRes.json();
    if (publishRes.ok) {
      setStatus(data.message || "Published.");
    } else {
      setStatus("");
      alert(data.error || "Publish failed. Ask Claude Code to check git status/credentials.");
    }
    setPublishing(false);
    setTimeout(() => setStatus(""), 6000);
  }

  if (error) {
    return (
      <div className="mx-auto max-w-2xl px-6 pb-24 pt-32 text-center">
        <h1 className="font-heading text-2xl">Editor unavailable</h1>
        <p className="mt-3 text-neutral-600">{error}</p>
        <p className="mt-3 text-sm text-neutral-500">
          This editor only works while running the site locally with{" "}
          <code className="rounded bg-neutral-100 px-1.5 py-0.5">npm run dev</code>.
        </p>
      </div>
    );
  }

  if (!content) {
    return <div className="px-6 pb-24 pt-32 text-center text-neutral-500">Loading…</div>;
  }

  return (
    <div className="mx-auto max-w-5xl px-6 pb-16 pt-28 sm:pt-32">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-neutral-200 pb-6">
        <div>
          <h1 className="font-heading text-3xl">AGI Content Editor</h1>
          <p className="mt-1 text-sm text-neutral-500">
            <strong>Save changes</strong> writes to this computer only — nothing on the live site
            changes yet. <strong>Publish to live site</strong> saves and pushes it live (takes a
            minute or two to go out).
          </p>
        </div>
        <div className="flex items-center gap-3">
          {status && <span className="text-sm text-neutral-600">{status}</span>}
          <button
            onClick={save}
            className="rounded-md border border-neutral-300 px-5 py-2.5 text-sm font-medium text-neutral-700 hover:border-neutral-900"
          >
            Save changes
          </button>
          <button
            onClick={publish}
            disabled={publishing}
            className="rounded-md bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-neutral-700 disabled:opacity-60"
          >
            {publishing ? "Publishing…" : "Publish to live site"}
          </button>
        </div>
      </div>

      <div className="mb-8 flex flex-wrap gap-2">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`rounded-full border px-4 py-1.5 text-sm ${
              tab === t
                ? "border-neutral-900 bg-neutral-900 text-white"
                : "border-neutral-300 text-neutral-600 hover:border-neutral-900"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "Site Text" && (
        <div className="space-y-10">
          <div className="rounded-xl border border-neutral-200 p-6">
            <h2 className="mb-4 font-heading text-xl">Homepage hero</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {field(
                "Eyebrow label",
                <input
                  className={inputClass}
                  value={content.siteCopy.hero.eyebrow}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      siteCopy: {
                        ...content.siteCopy,
                        hero: { ...content.siteCopy.hero, eyebrow: e.target.value },
                      },
                    })
                  }
                />
              )}
              {field(
                "Badge (e.g. B-BBEE Level 2)",
                <input
                  className={inputClass}
                  value={content.siteCopy.hero.badge}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      siteCopy: {
                        ...content.siteCopy,
                        hero: { ...content.siteCopy.hero, badge: e.target.value },
                      },
                    })
                  }
                />
              )}
            </div>
            <div className="mt-4">
              {field(
                "Headline",
                <textarea
                  className={inputClass}
                  rows={2}
                  value={content.siteCopy.hero.headline}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      siteCopy: {
                        ...content.siteCopy,
                        hero: { ...content.siteCopy.hero, headline: e.target.value },
                      },
                    })
                  }
                />
              )}
            </div>
            <div className="mt-4">
              {field(
                "Subheadline",
                <textarea
                  className={inputClass}
                  rows={3}
                  value={content.siteCopy.hero.subheadline}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      siteCopy: {
                        ...content.siteCopy,
                        hero: { ...content.siteCopy.hero, subheadline: e.target.value },
                      },
                    })
                  }
                />
              )}
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {field(
                "Primary button label",
                <input
                  className={inputClass}
                  value={content.siteCopy.hero.primaryCtaLabel}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      siteCopy: {
                        ...content.siteCopy,
                        hero: { ...content.siteCopy.hero, primaryCtaLabel: e.target.value },
                      },
                    })
                  }
                />
              )}
              {field(
                "Secondary button label",
                <input
                  className={inputClass}
                  value={content.siteCopy.hero.secondaryCtaLabel}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      siteCopy: {
                        ...content.siteCopy,
                        hero: { ...content.siteCopy.hero, secondaryCtaLabel: e.target.value },
                      },
                    })
                  }
                />
              )}
            </div>
            <div className="mt-4">
              <span className="mb-2 block text-sm font-medium text-neutral-700">Stats strip</span>
              <div className="grid gap-3 sm:grid-cols-2">
                {content.siteCopy.hero.stats.map((s, i) => (
                  <div key={i} className="flex gap-2">
                    <input
                      className={inputClass}
                      type="number"
                      value={s.value}
                      onChange={(e) => {
                        const stats = [...content.siteCopy.hero.stats];
                        stats[i] = { ...s, value: Number(e.target.value) };
                        setContent({
                          ...content,
                          siteCopy: { ...content.siteCopy, hero: { ...content.siteCopy.hero, stats } },
                        });
                      }}
                    />
                    <input
                      className={inputClass}
                      placeholder="Suffix e.g. +"
                      value={s.suffix}
                      onChange={(e) => {
                        const stats = [...content.siteCopy.hero.stats];
                        stats[i] = { ...s, suffix: e.target.value };
                        setContent({
                          ...content,
                          siteCopy: { ...content.siteCopy, hero: { ...content.siteCopy.hero, stats } },
                        });
                      }}
                    />
                    <input
                      className={inputClass}
                      placeholder="Label"
                      value={s.label}
                      onChange={(e) => {
                        const stats = [...content.siteCopy.hero.stats];
                        stats[i] = { ...s, label: e.target.value };
                        setContent({
                          ...content,
                          siteCopy: { ...content.siteCopy, hero: { ...content.siteCopy.hero, stats } },
                        });
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-neutral-200 p-6">
            <h2 className="mb-4 font-heading text-xl">Homepage &ldquo;About AGI&rdquo; preview</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {field(
                "Eyebrow label",
                <input
                  className={inputClass}
                  value={content.siteCopy.aboutPreview.eyebrow}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      siteCopy: {
                        ...content.siteCopy,
                        aboutPreview: { ...content.siteCopy.aboutPreview, eyebrow: e.target.value },
                      },
                    })
                  }
                />
              )}
              {field(
                "Headline",
                <input
                  className={inputClass}
                  value={content.siteCopy.aboutPreview.headline}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      siteCopy: {
                        ...content.siteCopy,
                        aboutPreview: { ...content.siteCopy.aboutPreview, headline: e.target.value },
                      },
                    })
                  }
                />
              )}
            </div>
            <div className="mt-4">
              {field(
                "Body paragraph",
                <textarea
                  className={inputClass}
                  rows={3}
                  value={content.siteCopy.aboutPreview.body}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      siteCopy: {
                        ...content.siteCopy,
                        aboutPreview: { ...content.siteCopy.aboutPreview, body: e.target.value },
                      },
                    })
                  }
                />
              )}
            </div>
            <div className="mt-4">
              {field(
                "Bullet points (one per line)",
                <textarea
                  className={inputClass}
                  rows={4}
                  value={content.siteCopy.aboutPreview.points.join("\n")}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      siteCopy: {
                        ...content.siteCopy,
                        aboutPreview: {
                          ...content.siteCopy.aboutPreview,
                          points: e.target.value.split("\n").filter(Boolean),
                        },
                      },
                    })
                  }
                />
              )}
            </div>
          </div>

          <div className="rounded-xl border border-neutral-200 p-6">
            <h2 className="mb-4 font-heading text-xl">Credentials section (Home &amp; About)</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {field(
                "Eyebrow label",
                <input
                  className={inputClass}
                  value={content.siteCopy.credentialsSection.eyebrow}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      siteCopy: {
                        ...content.siteCopy,
                        credentialsSection: { ...content.siteCopy.credentialsSection, eyebrow: e.target.value },
                      },
                    })
                  }
                />
              )}
              {field(
                "Headline",
                <input
                  className={inputClass}
                  value={content.siteCopy.credentialsSection.headline}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      siteCopy: {
                        ...content.siteCopy,
                        credentialsSection: { ...content.siteCopy.credentialsSection, headline: e.target.value },
                      },
                    })
                  }
                />
              )}
            </div>
            <div className="mt-4">
              {field(
                "Description",
                <textarea
                  className={inputClass}
                  rows={2}
                  value={content.siteCopy.credentialsSection.description}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      siteCopy: {
                        ...content.siteCopy,
                        credentialsSection: { ...content.siteCopy.credentialsSection, description: e.target.value },
                      },
                    })
                  }
                />
              )}
            </div>
          </div>

          <div className="rounded-xl border border-neutral-200 p-6">
            <h2 className="mb-4 font-heading text-xl">Bottom &ldquo;Ready to start?&rdquo; banner</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {field(
                "Eyebrow label",
                <input
                  className={inputClass}
                  value={content.siteCopy.ctaBanner.eyebrow}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      siteCopy: {
                        ...content.siteCopy,
                        ctaBanner: { ...content.siteCopy.ctaBanner, eyebrow: e.target.value },
                      },
                    })
                  }
                />
              )}
              {field(
                "Headline",
                <input
                  className={inputClass}
                  value={content.siteCopy.ctaBanner.headline}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      siteCopy: {
                        ...content.siteCopy,
                        ctaBanner: { ...content.siteCopy.ctaBanner, headline: e.target.value },
                      },
                    })
                  }
                />
              )}
            </div>
            <div className="mt-4">
              {field(
                "Description",
                <textarea
                  className={inputClass}
                  rows={2}
                  value={content.siteCopy.ctaBanner.description}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      siteCopy: {
                        ...content.siteCopy,
                        ctaBanner: { ...content.siteCopy.ctaBanner, description: e.target.value },
                      },
                    })
                  }
                />
              )}
            </div>
          </div>

          <div className="rounded-xl border border-neutral-200 p-6">
            <h2 className="mb-4 font-heading text-xl">About page</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {field(
                "Hero eyebrow",
                <input
                  className={inputClass}
                  value={content.siteCopy.aboutPage.heroEyebrow}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      siteCopy: {
                        ...content.siteCopy,
                        aboutPage: { ...content.siteCopy.aboutPage, heroEyebrow: e.target.value },
                      },
                    })
                  }
                />
              )}
              {field(
                "Hero title",
                <input
                  className={inputClass}
                  value={content.siteCopy.aboutPage.heroTitle}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      siteCopy: {
                        ...content.siteCopy,
                        aboutPage: { ...content.siteCopy.aboutPage, heroTitle: e.target.value },
                      },
                    })
                  }
                />
              )}
            </div>
            <div className="mt-4">
              {field(
                "Hero description",
                <textarea
                  className={inputClass}
                  rows={2}
                  value={content.siteCopy.aboutPage.heroDescription}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      siteCopy: {
                        ...content.siteCopy,
                        aboutPage: { ...content.siteCopy.aboutPage, heroDescription: e.target.value },
                      },
                    })
                  }
                />
              )}
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {field(
                "Story eyebrow",
                <input
                  className={inputClass}
                  value={content.siteCopy.aboutPage.storyEyebrow}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      siteCopy: {
                        ...content.siteCopy,
                        aboutPage: { ...content.siteCopy.aboutPage, storyEyebrow: e.target.value },
                      },
                    })
                  }
                />
              )}
              {field(
                "Story headline",
                <input
                  className={inputClass}
                  value={content.siteCopy.aboutPage.storyHeadline}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      siteCopy: {
                        ...content.siteCopy,
                        aboutPage: { ...content.siteCopy.aboutPage, storyHeadline: e.target.value },
                      },
                    })
                  }
                />
              )}
            </div>
            <div className="mt-4">
              {field(
                "Story paragraphs (one per line)",
                <textarea
                  className={inputClass}
                  rows={5}
                  value={content.siteCopy.aboutPage.storyParagraphs.join("\n")}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      siteCopy: {
                        ...content.siteCopy,
                        aboutPage: {
                          ...content.siteCopy.aboutPage,
                          storyParagraphs: e.target.value.split("\n").filter(Boolean),
                        },
                      },
                    })
                  }
                />
              )}
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {field(
                "Values section eyebrow",
                <input
                  className={inputClass}
                  value={content.siteCopy.aboutPage.valuesEyebrow}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      siteCopy: {
                        ...content.siteCopy,
                        aboutPage: { ...content.siteCopy.aboutPage, valuesEyebrow: e.target.value },
                      },
                    })
                  }
                />
              )}
              {field(
                "Values section headline",
                <input
                  className={inputClass}
                  value={content.siteCopy.aboutPage.valuesHeadline}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      siteCopy: {
                        ...content.siteCopy,
                        aboutPage: { ...content.siteCopy.aboutPage, valuesHeadline: e.target.value },
                      },
                    })
                  }
                />
              )}
            </div>
            <div className="mt-6 space-y-4">
              {content.siteCopy.aboutPage.values.map((v, i) => (
                <div key={i} className="rounded-lg border border-neutral-200 p-4">
                  <div className="grid gap-3 sm:grid-cols-[140px_1fr]">
                    <label className="block text-sm">
                      <span className="mb-1 block font-medium text-neutral-700">Icon</span>
                      <select
                        className={inputClass}
                        value={v.icon}
                        onChange={(e) => {
                          const values = [...content.siteCopy.aboutPage.values];
                          values[i] = { ...v, icon: e.target.value as Value["icon"] };
                          setContent({
                            ...content,
                            siteCopy: { ...content.siteCopy, aboutPage: { ...content.siteCopy.aboutPage, values } },
                          });
                        }}
                      >
                        {ICON_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </label>
                    {field(
                      "Title",
                      <input
                        className={inputClass}
                        value={v.title}
                        onChange={(e) => {
                          const values = [...content.siteCopy.aboutPage.values];
                          values[i] = { ...v, title: e.target.value };
                          setContent({
                            ...content,
                            siteCopy: { ...content.siteCopy, aboutPage: { ...content.siteCopy.aboutPage, values } },
                          });
                        }}
                      />
                    )}
                  </div>
                  <div className="mt-3">
                    {field(
                      "Text",
                      <textarea
                        className={inputClass}
                        rows={2}
                        value={v.text}
                        onChange={(e) => {
                          const values = [...content.siteCopy.aboutPage.values];
                          values[i] = { ...v, text: e.target.value };
                          setContent({
                            ...content,
                            siteCopy: { ...content.siteCopy, aboutPage: { ...content.siteCopy.aboutPage, values } },
                          });
                        }}
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-neutral-200 p-6">
            <h2 className="mb-4 font-heading text-xl">Contact page</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              {field(
                "Hero eyebrow",
                <input
                  className={inputClass}
                  value={content.siteCopy.contactPage.heroEyebrow}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      siteCopy: {
                        ...content.siteCopy,
                        contactPage: { ...content.siteCopy.contactPage, heroEyebrow: e.target.value },
                      },
                    })
                  }
                />
              )}
              {field(
                "Hero title",
                <input
                  className={inputClass}
                  value={content.siteCopy.contactPage.heroTitle}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      siteCopy: {
                        ...content.siteCopy,
                        contactPage: { ...content.siteCopy.contactPage, heroTitle: e.target.value },
                      },
                    })
                  }
                />
              )}
            </div>
            <div className="mt-4">
              {field(
                "Hero description",
                <textarea
                  className={inputClass}
                  rows={2}
                  value={content.siteCopy.contactPage.heroDescription}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      siteCopy: {
                        ...content.siteCopy,
                        contactPage: { ...content.siteCopy.contactPage, heroDescription: e.target.value },
                      },
                    })
                  }
                />
              )}
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {field(
                "Direct lines eyebrow",
                <input
                  className={inputClass}
                  value={content.siteCopy.contactPage.directLinesEyebrow}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      siteCopy: {
                        ...content.siteCopy,
                        contactPage: { ...content.siteCopy.contactPage, directLinesEyebrow: e.target.value },
                      },
                    })
                  }
                />
              )}
              {field(
                "Direct lines headline",
                <input
                  className={inputClass}
                  value={content.siteCopy.contactPage.directLinesHeadline}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      siteCopy: {
                        ...content.siteCopy,
                        contactPage: { ...content.siteCopy.contactPage, directLinesHeadline: e.target.value },
                      },
                    })
                  }
                />
              )}
            </div>
            <div className="mt-4">
              {field(
                "Office section headline",
                <input
                  className={inputClass}
                  value={content.siteCopy.contactPage.officeHeadline}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      siteCopy: {
                        ...content.siteCopy,
                        contactPage: { ...content.siteCopy.contactPage, officeHeadline: e.target.value },
                      },
                    })
                  }
                />
              )}
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              {field(
                "Form eyebrow",
                <input
                  className={inputClass}
                  value={content.siteCopy.contactPage.formEyebrow}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      siteCopy: {
                        ...content.siteCopy,
                        contactPage: { ...content.siteCopy.contactPage, formEyebrow: e.target.value },
                      },
                    })
                  }
                />
              )}
              {field(
                "Form headline",
                <input
                  className={inputClass}
                  value={content.siteCopy.contactPage.formHeadline}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      siteCopy: {
                        ...content.siteCopy,
                        contactPage: { ...content.siteCopy.contactPage, formHeadline: e.target.value },
                      },
                    })
                  }
                />
              )}
            </div>
            <div className="mt-4">
              {field(
                "Form description",
                <textarea
                  className={inputClass}
                  rows={2}
                  value={content.siteCopy.contactPage.formDescription}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      siteCopy: {
                        ...content.siteCopy,
                        contactPage: { ...content.siteCopy.contactPage, formDescription: e.target.value },
                      },
                    })
                  }
                />
              )}
            </div>
          </div>
        </div>
      )}

      {tab === "Services" && (
        <div className="space-y-10">
          {content.services.map((service, i) => (
            <div key={service.slug} className="rounded-xl border border-neutral-200 p-6">
              <h2 className="mb-4 font-heading text-xl">{service.name}</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {field(
                  "Name",
                  <input
                    className={inputClass}
                    value={service.name}
                    onChange={(e) => {
                      const services = [...content.services];
                      services[i] = { ...service, name: e.target.value };
                      setContent({ ...content, services });
                    }}
                  />
                )}
                {field(
                  "Summary (card blurb)",
                  <input
                    className={inputClass}
                    value={service.summary}
                    onChange={(e) => {
                      const services = [...content.services];
                      services[i] = { ...service, summary: e.target.value };
                      setContent({ ...content, services });
                    }}
                  />
                )}
              </div>
              <div className="mt-4">
                {field(
                  "Intro paragraph (service page)",
                  <textarea
                    className={inputClass}
                    rows={4}
                    value={service.intro}
                    onChange={(e) => {
                      const services = [...content.services];
                      services[i] = { ...service, intro: e.target.value };
                      setContent({ ...content, services });
                    }}
                  />
                )}
              </div>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {field(
                  "Meta title (Google)",
                  <input
                    className={inputClass}
                    value={service.metaTitle}
                    onChange={(e) => {
                      const services = [...content.services];
                      services[i] = { ...service, metaTitle: e.target.value };
                      setContent({ ...content, services });
                    }}
                  />
                )}
                {field(
                  "Meta description (Google)",
                  <input
                    className={inputClass}
                    value={service.metaDescription}
                    onChange={(e) => {
                      const services = [...content.services];
                      services[i] = { ...service, metaDescription: e.target.value };
                      setContent({ ...content, services });
                    }}
                  />
                )}
              </div>
              <div className="mt-4">
                {field(
                  "Items (one per line)",
                  <textarea
                    className={inputClass}
                    rows={3}
                    value={service.items.join("\n")}
                    onChange={(e) => {
                      const services = [...content.services];
                      services[i] = {
                        ...service,
                        items: e.target.value.split("\n").filter(Boolean),
                      };
                      setContent({ ...content, services });
                    }}
                  />
                )}
              </div>
              <div className="mt-4">
                <ImageUploader
                  value={service.image}
                  onChange={(path) => {
                    const services = [...content.services];
                    services[i] = { ...service, image: path };
                    setContent({ ...content, services });
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "Projects" && (
        <div className="space-y-10">
          <button
            onClick={() => {
              const name = "New Project";
              let slug = slugify(name);
              const existing = new Set(content.projects.map((p) => p.slug));
              let n = 2;
              while (existing.has(slug)) {
                slug = `${slugify(name)}-${n}`;
                n += 1;
              }
              const placeholder = "/images/hero.jpg";
              const newProject: Project = {
                slug,
                name,
                category: "Corporate",
                location: "",
                description: "",
                featured: false,
                cover: placeholder,
                images: [placeholder],
              };
              setContent({ ...content, projects: [newProject, ...content.projects] });
            }}
            className="rounded-md border border-neutral-900 px-4 py-2 text-sm font-medium text-neutral-900 hover:bg-neutral-900 hover:text-white"
          >
            + Add project
          </button>

          {content.projects.map((project, i) => (
            <div key={project.slug} className="rounded-xl border border-neutral-200 p-6">
              <div className="flex items-center justify-between">
                <h2 className="font-heading text-xl">{project.name || "Untitled project"}</h2>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 text-sm text-neutral-600">
                    <input
                      type="checkbox"
                      checked={Boolean(project.featured)}
                      onChange={(e) => {
                        const projects = [...content.projects];
                        projects[i] = { ...project, featured: e.target.checked };
                        setContent({ ...content, projects });
                      }}
                    />
                    Featured
                  </label>
                  <button
                    onClick={() => {
                      if (!confirm(`Delete "${project.name}"? This can't be undone.`)) return;
                      setContent({
                        ...content,
                        projects: content.projects.filter((_, k) => k !== i),
                      });
                    }}
                    className="text-sm text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {field(
                  "Name",
                  <input
                    className={inputClass}
                    value={project.name}
                    onChange={(e) => {
                      const projects = [...content.projects];
                      projects[i] = { ...project, name: e.target.value };
                      setContent({ ...content, projects });
                    }}
                  />
                )}
                {field(
                  "Category",
                  <input
                    className={inputClass}
                    value={project.category}
                    onChange={(e) => {
                      const projects = [...content.projects];
                      projects[i] = { ...project, category: e.target.value };
                      setContent({ ...content, projects });
                    }}
                  />
                )}
                {field(
                  "Location",
                  <input
                    className={inputClass}
                    value={project.location ?? ""}
                    onChange={(e) => {
                      const projects = [...content.projects];
                      projects[i] = { ...project, location: e.target.value };
                      setContent({ ...content, projects });
                    }}
                  />
                )}
                {field(
                  "Note (optional)",
                  <input
                    className={inputClass}
                    value={project.note ?? ""}
                    onChange={(e) => {
                      const projects = [...content.projects];
                      projects[i] = { ...project, note: e.target.value };
                      setContent({ ...content, projects });
                    }}
                  />
                )}
              </div>

              <div className="mt-4">
                {field(
                  "Description / caption (shown on the homepage carousel and gallery)",
                  <textarea
                    className={inputClass}
                    rows={2}
                    value={project.description ?? ""}
                    onChange={(e) => {
                      const projects = [...content.projects];
                      projects[i] = { ...project, description: e.target.value };
                      setContent({ ...content, projects });
                    }}
                  />
                )}
              </div>

              <div className="mt-4">
                <ImageUploader
                  label="Cover image"
                  value={project.cover}
                  onChange={(path) => {
                    const projects = [...content.projects];
                    projects[i] = { ...project, cover: path };
                    setContent({ ...content, projects });
                  }}
                />
              </div>

              <div className="mt-4">
                <span className="mb-2 block text-sm font-medium text-neutral-700">
                  Gallery images
                </span>
                <div className="flex flex-wrap gap-3">
                  {project.images.map((img, j) => (
                    <div key={j} className="relative h-20 w-28 overflow-hidden rounded-md border border-neutral-200">
                      <Image src={img} alt="" fill sizes="112px" className="object-cover" />
                      {project.images.length > 1 && (
                        <button
                          onClick={() => {
                            const projects = [...content.projects];
                            const images = project.images.filter((_, k) => k !== j);
                            projects[i] = { ...project, images };
                            setContent({ ...content, projects });
                          }}
                          className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-black/70 text-xs text-white"
                          aria-label="Remove image"
                        >
                          ×
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <div className="mt-3 max-w-sm">
                  <ImageUploader
                    label="Add image"
                    value=""
                    onChange={(path) => {
                      const projects = [...content.projects];
                      projects[i] = { ...project, images: [...project.images, path] };
                      setContent({ ...content, projects });
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "Credentials" && (
        <div className="space-y-6">
          {content.credentials.map((c, i) => (
            <div key={c.slug} className="rounded-xl border border-neutral-200 p-6">
              <div className="grid gap-4 sm:grid-cols-2">
                {field(
                  "Title",
                  <input
                    className={inputClass}
                    value={c.title}
                    onChange={(e) => {
                      const credentials = [...content.credentials];
                      credentials[i] = { ...c, title: e.target.value };
                      setContent({ ...content, credentials });
                    }}
                  />
                )}
                {field(
                  "Short line",
                  <input
                    className={inputClass}
                    value={c.short}
                    onChange={(e) => {
                      const credentials = [...content.credentials];
                      credentials[i] = { ...c, short: e.target.value };
                      setContent({ ...content, credentials });
                    }}
                  />
                )}
              </div>
              <div className="mt-4">
                {field(
                  "Detail",
                  <textarea
                    className={inputClass}
                    rows={3}
                    value={c.detail}
                    onChange={(e) => {
                      const credentials = [...content.credentials];
                      credentials[i] = { ...c, detail: e.target.value };
                      setContent({ ...content, credentials });
                    }}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === "Associates" && (
        <div className="space-y-6">
          {content.associates.map((a, i) => (
            <div key={i} className="flex items-center gap-4 rounded-xl border border-neutral-200 p-4">
              {field(
                "Name",
                <input
                  className={inputClass}
                  value={a.name}
                  onChange={(e) => {
                    const associates = [...content.associates];
                    associates[i] = { ...a, name: e.target.value };
                    setContent({ ...content, associates });
                  }}
                />
              )}
              <ImageUploader
                label="Logo"
                value={a.logo}
                onChange={(path) => {
                  const associates = [...content.associates];
                  associates[i] = { ...a, logo: path };
                  setContent({ ...content, associates });
                }}
              />
            </div>
          ))}
        </div>
      )}

      {tab === "Contact" && (
        <div className="max-w-xl space-y-4 rounded-xl border border-neutral-200 p-6">
          {field(
            "Address",
            <input
              className={inputClass}
              value={content.contact.address}
              onChange={(e) =>
                setContent({ ...content, contact: { ...content.contact, address: e.target.value } })
              }
            />
          )}
          {field(
            "Email",
            <input
              className={inputClass}
              value={content.contact.email}
              onChange={(e) =>
                setContent({ ...content, contact: { ...content.contact, email: e.target.value } })
              }
            />
          )}
          <div>
            <span className="mb-2 block text-sm font-medium text-neutral-700">Phones</span>
            <div className="space-y-2">
              {content.contact.phones.map((p, i) => (
                <div key={i} className="flex gap-2">
                  <input
                    className={inputClass}
                    placeholder="Label"
                    value={p.label}
                    onChange={(e) => {
                      const phones = [...content.contact.phones];
                      phones[i] = { ...p, label: e.target.value };
                      setContent({ ...content, contact: { ...content.contact, phones } });
                    }}
                  />
                  <input
                    className={inputClass}
                    placeholder="Number"
                    value={p.number}
                    onChange={(e) => {
                      const phones = [...content.contact.phones];
                      phones[i] = { ...p, number: e.target.value };
                      setContent({ ...content, contact: { ...content.contact, phones } });
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
