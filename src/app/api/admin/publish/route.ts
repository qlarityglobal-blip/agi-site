import { NextResponse } from "next/server";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { existsSync } from "node:fs";
import path from "node:path";

const run = promisify(execFile);
const UPLOADS_DIR = path.join(process.cwd(), "public", "images", "uploads");

function isLocalOnly() {
  return process.env.NODE_ENV !== "production";
}

export async function POST() {
  if (!isLocalOnly()) {
    return NextResponse.json(
      { error: "Publishing only works when running the site locally (npm run dev)." },
      { status: 403 }
    );
  }

  try {
    const { stdout: statusOut } = await run("git", ["status", "--porcelain"]);
    if (!statusOut.trim()) {
      return NextResponse.json({ ok: true, message: "Nothing to publish — no changes since the last publish." });
    }

    const addPaths = ["src/content/site.json"];
    if (existsSync(UPLOADS_DIR)) addPaths.push("public/images/uploads");
    await run("git", ["add", ...addPaths]);

    const { stdout: stagedOut } = await run("git", ["diff", "--cached", "--name-only"]);
    if (!stagedOut.trim()) {
      return NextResponse.json({ ok: true, message: "Nothing to publish — no content changes since the last publish." });
    }

    await run("git", ["commit", "-m", "Update site content via admin editor"]);
    await run("git", ["push", "origin", "main"]);

    return NextResponse.json({ ok: true, message: "Published. Your live site will update in a minute or two." });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: `Publish failed: ${message}` }, { status: 500 });
  }
}
