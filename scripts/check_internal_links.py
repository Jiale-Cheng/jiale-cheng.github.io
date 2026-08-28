#!/usr/bin/env python3
"""Check internal links and fragments in a generated Jekyll site."""

from __future__ import annotations

import sys
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit


SITE_HOST = "jiale-cheng.github.io"


class PageParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.links: list[str] = []
        self.ids: set[str] = set()

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        values = dict(attrs)
        if values.get("id"):
            self.ids.add(values["id"])
        if tag == "a" and values.get("name"):
            self.ids.add(values["name"])
        for attribute in ("href", "src"):
            if values.get(attribute):
                self.links.append(values[attribute])

    handle_startendtag = handle_starttag


def parse_page(path: Path) -> PageParser:
    parser = PageParser()
    parser.feed(path.read_text(encoding="utf-8"))
    return parser


def target_candidates(root: Path, source: Path, url_path: str) -> list[Path]:
    decoded = unquote(url_path)
    target = root / decoded.lstrip("/") if decoded.startswith("/") else source.parent / decoded
    target = target.resolve()
    candidates = [target]
    if decoded.endswith("/") or not target.suffix:
        candidates.append(target / "index.html")
        candidates.append(target.with_suffix(".html"))
    return candidates


def main() -> int:
    root = Path(sys.argv[1] if len(sys.argv) > 1 else "_site").resolve()
    pages = sorted(root.rglob("*.html"))
    parsed = {page: parse_page(page) for page in pages}
    problems: list[str] = []

    for source, page in parsed.items():
        for value in page.links:
            if value.startswith(("mailto:", "tel:", "javascript:", "data:", "//")):
                continue
            url = urlsplit(value)
            if url.scheme and url.scheme not in {"http", "https"}:
                continue
            if url.netloc and url.netloc.lower() != SITE_HOST:
                continue

            url_path = url.path or ("/" if url.netloc else "")
            candidates = target_candidates(root, source, url_path)
            target = next((candidate for candidate in candidates if candidate.is_file()), None)
            if target is None:
                shown = source.relative_to(root)
                problems.append(f"{shown}: {value} -> missing target")
                continue

            if url.fragment and target.suffix.lower() == ".html":
                target_page = parsed.get(target)
                if target_page and unquote(url.fragment) not in target_page.ids:
                    shown = source.relative_to(root)
                    problems.append(f"{shown}: {value} -> missing fragment")

    if problems:
        print("\n".join(problems))
        return 1

    print(f"Checked {len(pages)} HTML files: all internal links resolve.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
