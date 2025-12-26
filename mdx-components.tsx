import { transformerColorizedBrackets } from "@shikijs/colorized-brackets";
import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import React from "react";
import { createHighlighter, Highlighter } from "shiki";
import theme from "./src/app/syntax-theme.json";

function getTextContent(node: React.ReactNode): string {
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (!node) return "";

  if (Array.isArray(node)) {
    return node.map(getTextContent).join("");
  }

  if (typeof node === "object" && "props" in node) {
    return getTextContent(
      (node as { props: { children: React.ReactNode } }).props.children,
    );
  }

  return "";
}

function generateId(text: string) {
  return text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

let highlighter: Highlighter | null = null;

async function getHighlighter() {
  if (!highlighter) {
    highlighter = await createHighlighter({
      langs: [
        "javascript",
        "typescript",
        "jsx",
        "tsx",
        "json",
        "css",
        "html",
        "bash",
        "shell",
        "python",
        "yaml",
        "markdown",
      ],
      themes: [theme],
    });
  }
  return highlighter;
}

async function CodeBlock({
  code,
  lang,
  filename,
  title,
}: {
  code: string;
  lang: string;
  filename?: string;
  title?: string;
}) {
  let out = (await getHighlighter()).codeToHtml(code, {
    lang,
    theme: theme.name,
    transformers: [
      transformerColorizedBrackets({
        themes: {
          "Tailwind CSS": [
            "var(--color-purple-200)",
            "var(--color-cyan-300)",
            "var(--color-blue-300)",
            "var(--color-emerald-300)",
            "var(--color-pink-300)",
            "var(--color-amber-200)",
          ],
        },
      }),
    ],
  });

  const header = filename || title;

  return (
    <div className="not-prose group relative rounded-xl bg-gray-950 dark:bg-gray-950/50 dark:ring-1 dark:ring-white/10">
      <div className="relative rounded-xl p-1">
        {header && (
          <div className="flex items-center justify-between border-b border-white/5 px-4 py-2">
            <div className="flex items-center gap-2">
              <div className="text-xs font-medium text-gray-400 dark:text-gray-500">
                {header}
              </div>
            </div>
          </div>
        )}
        <div
          className="overflow-x-auto rounded-lg [&>pre]:my-0 [&>pre]:bg-transparent [&>pre]:p-4 [&>pre]:leading-relaxed"
          dangerouslySetInnerHTML={{ __html: out }}
        />
      </div>
    </div>
  );
}

const IMAGE_DIMENSION_REGEX = /^[^|]+\|\d+x\d+$/;

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h1: ({ children }) => {
      let id = generateId(getTextContent(children));
      return <h1 id={id}>{children}</h1>;
    },
    h2: ({ children }) => {
      let id = generateId(getTextContent(children));
      return <h2 id={id}>{children}</h2>;
    },
    h3: ({ children }) => {
      let id = generateId(getTextContent(children));
      return <h3 id={id}>{children}</h3>;
    },
    h4: ({ children }) => {
      let id = generateId(getTextContent(children));
      return <h4 id={id}>{children}</h4>;
    },
    img: ({ alt, ...props }) => {
      let schemePlaceholder = encodeURIComponent("{scheme}");
      let width, height;
      if (IMAGE_DIMENSION_REGEX.test(alt)) {
        [width, height] = alt.split("|")[1].split("x").map(Number);
        alt = alt.split("|")[0];
      }
      if (props.src.includes(schemePlaceholder)) {
        return (
          <>
            <Image
              {...props}
              alt={alt}
              width={width}
              height={height}
              src={props.src.replace(schemePlaceholder, "light")}
              className="dark:hidden"
            />
            <Image
              {...props}
              alt={alt}
              width={width}
              height={height}
              src={props.src.replace(schemePlaceholder, "dark")}
              className="not-dark:hidden"
            />
          </>
        );
      } else {
        return <Image {...props} alt={alt} width={width} height={height} />;
      }
    },
    async pre(props) {
      let child = React.Children.only(props.children);
      if (!child) return null;
      let { children: code, className, meta } = child.props;
      let lang = className ? className.replace("language-", "") : "";

      // Parse meta string for filename and title
      let filename: string | undefined;
      let title: string | undefined;

      if (meta) {
        const filenameMatch = meta.match(/filename="([^"]+)"/);
        const titleMatch = meta.match(/title="([^"]+)"/);
        filename = filenameMatch?.[1];
        title = titleMatch?.[1];
      }

      return (
        <CodeBlock code={code} lang={lang} filename={filename} title={title} />
      );
    },
    ...components,
  };
}
