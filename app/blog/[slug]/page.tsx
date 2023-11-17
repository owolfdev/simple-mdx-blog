import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import YouTube from "@/components/mdx/youtube";
import Code from "@/components/mdx/code-component/code";

async function getPost({ slug }: { slug: string }) {
  const markdownFile = fs.readFileSync(
    path.join("blogs", slug + ".mdx"),
    "utf-8"
  );
  const { data: fontMatter, content } = matter(markdownFile);
  return {
    fontMatter,
    slug,
    content,
  };
}

export async function generateStaticParams() {
  const files = fs.readdirSync(path.join("blogs"));
  const params = files.map((filename) => ({
    slug: filename.replace(".mdx", ""),
  }));

  return params;
}

export default async function Page({ params }: { params: { slug: string } }) {
  const props = await getPost(params);

  const components = {
    pre: Code,
    YouTube,
  };

  return (
    <article className="prose prose-sm md:prose-base lg:prose-lg mx-auto">
      <h1>{props.fontMatter.title}</h1>
      <MDXRemote source={props.content} components={components} />
    </article>
  );
}
