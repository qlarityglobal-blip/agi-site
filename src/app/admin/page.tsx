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

type SiteContent = {
  services: Service[];
  projects: Project[];
  credentials: Credential[];
  associates: Associate[];
  contact: Contact;
};

const TABS = ["Services", "Projects", "Credentials", "Associates", "Contact"] as const;
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

  if (error) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-24 text-center">
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
    return <div className="px-6 py-24 text-center text-neutral-500">Loading…</div>;
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-neutral-200 pb-6">
        <div>
          <h1 className="font-heading text-3xl">AGI Content Editor</h1>
          <p className="mt-1 text-sm text-neutral-500">
            Local editor — edits write straight to the site files on this machine. Commit and
            push to deploy the changes live.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {status && <span className="text-sm text-neutral-600">{status}</span>}
          <button
            onClick={save}
            className="rounded-md bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-neutral-700"
          >
            Save changes
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
          {content.projects.map((project, i) => (
            <div key={project.slug} className="rounded-xl border border-neutral-200 p-6">
              <div className="flex items-center justify-between">
                <h2 className="font-heading text-xl">{project.name}</h2>
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
