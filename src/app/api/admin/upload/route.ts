import { NextResponse } from "next/server";
import { promises as fs } from "node:fs";
import path from "node:path";

const UPLOAD_DIR = path.join(process.cwd(), "public", "images", "uploads");
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif"]);

function isLocalOnly() {
  return process.env.NODE_ENV !== "production";
}

function safeExt(filename: string) {
  const ext = path.extname(filename).toLowerCase();
  return [".jpg", ".jpeg", ".png", ".webp", ".gif"].includes(ext) ? ext : ".jpg";
}

export async function POST(request: Request) {
  if (!isLocalOnly()) {
    return NextResponse.json(
      { error: "The editor only works when running the site locally (npm run dev)." },
      { status: 403 }
    );
  }

  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file provided." }, { status: 400 });
  }
  if (!ALLOWED_TYPES.has(file.type)) {
    return NextResponse.json({ error: "Unsupported image type." }, { status: 400 });
  }

  await fs.mkdir(UPLOAD_DIR, { recursive: true });

  const ext = safeExt(file.name);
  const base = path
    .basename(file.name, path.extname(file.name))
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 40);
  const filename = `${Date.now()}-${base || "image"}${ext}`;

  const buffer = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(path.join(UPLOAD_DIR, filename), buffer);

  return NextResponse.json({ path: `/images/uploads/${filename}` });
}
