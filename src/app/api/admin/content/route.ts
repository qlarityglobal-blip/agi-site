import { NextResponse } from "next/server";
import { promises as fs } from "node:fs";
import path from "node:path";

const CONTENT_PATH = path.join(process.cwd(), "src", "content", "site.json");

function isLocalOnly() {
  return process.env.NODE_ENV !== "production";
}

export async function GET() {
  if (!isLocalOnly()) {
    return NextResponse.json(
      { error: "The editor only works when running the site locally (npm run dev)." },
      { status: 403 }
    );
  }
  const raw = await fs.readFile(CONTENT_PATH, "utf-8");
  return NextResponse.json(JSON.parse(raw));
}

export async function POST(request: Request) {
  if (!isLocalOnly()) {
    return NextResponse.json(
      { error: "The editor only works when running the site locally (npm run dev)." },
      { status: 403 }
    );
  }
  const body = await request.json();
  await fs.writeFile(CONTENT_PATH, JSON.stringify(body, null, 2) + "\n", "utf-8");
  return NextResponse.json({ ok: true });
}
