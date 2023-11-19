Installing and setting up `next-sitemap`, a module for generating sitemaps in Next.js applications, is a straightforward process. Here's a step-by-step guide:

### 1. Install `next-sitemap`

You'll need to add `next-sitemap` to your project. You can do this using either npm or yarn:

- **Using npm:**

  ```bash
  npm install next-sitemap
  ```

- **Using Yarn:**
  ```bash
  yarn add next-sitemap
  ```

### 2. Create a Configuration File

`next-sitemap` requires a configuration file (`next-sitemap.config.js`) at the root of your project. Here's a basic example:

```javascript
module.exports = {
  siteUrl: "https://www.yourdomain.com",
  generateRobotsTxt: true, // (optional)
  // ...other options
};
```

Replace `https://www.yourdomain.com` with your own domain.

### 3. Additional Configuration Options

You can customize the behavior of `next-sitemap` by adding more options to your configuration file. Some common options include:

- `exclude`: An array of paths to exclude from the sitemap.
- `robotsTxtOptions`: Customize the generated `robots.txt` file.

### 4. Update Your `package.json` Scripts (Optional)

For convenience, you can add a script to your `package.json` to generate the sitemap:

```json
"scripts": {
  "build:sitemap": "next build && next-sitemap"
}
```

Now, you can generate your sitemap by running `npm run build:sitemap` or `yarn build:sitemap`.

### 5. Generating the Sitemap

Whenever you build your Next.js application, you should also generate the sitemap. If you've set up a script as above, it will automatically happen when you run your build command.

### 6. Deployment

After generating your sitemap, it will be available in the `public` directory of your Next.js project. Make sure that this sitemap is accessible from your deployed website (usually under `https://www.yourdomain.com/sitemap.xml`).

### 7. Verify Sitemap

After deploying your application with the new sitemap, it's good practice to verify that the sitemap is correctly set up by visiting `https://www.yourdomain.com/sitemap.xml` in your browser.

### Conclusion

That's it! You've successfully set up `next-sitemap` in your Next.js application. This will help search engines better index your website. Remember to keep your sitemap updated, especially when you make significant changes to your site's structure or content.

---

---

id: affa6f1d-9801-4610-bb0d-e857f8ed2db6
title: Simple Static MDX Blog
image: 0W4XLGITrHg
tags:

- webdev
- mac
  date: 2023-11-17
  excerpt: Creating a static MDX blog in Next.js 14 involves several steps, including setting up your Next.js environment, creating MDX files, and configuring your pages to render these files.
  description: Creating a static MDX blog in Next.js 14 involves several steps, including setting up your Next.js environment, creating MDX files, and configuring your pages to render these files.
  author: O. Wolfson
  link: simple-static-mdx-blog

---

See the [live demo](https://simple-mdx-blog.vercel.app/) and [GitHub repository](https://github.com/owolfdev/simple-mdx-blog) for this project.

Creating a static MDX blog in Next.js 14 involves several steps, including setting up your Next.js environment, creating MDX files, and configuring your pages to render these files. Below is a comprehensive tutorial to guide you through this process:

### 1. Setting Up the Next.js Project

1. **Initialize the Next.js Project**:

   - Run `npx create-next-app@latest my-mdx-blog` to create a new Next.js project.
   - Navigate into your project directory using `cd my-mdx-blog`.

2. **Install Dependencies**:

   - Install necessary packages like `fs`, `path`, `gray-matter`, and `next-mdx-remote` using npm or yarn. For example:
     ```
     npm install gray-matter next-mdx-remote
     ```

### 2. Creating MDX Files

1. **Create a Blog Directory**:

   - Inside your project, create a directory named `blogs` where you'll store your MDX files.

2. **Write MDX Files**:
   - Each blog post will be an MDX file within the `blogs` directory. These files can contain JSX and markdown content.

Example MDX file (sample.mdx):

````markdown
---
title: "Sample MDX File"
date: "2023-11-17"
description: "This is a sample MDX file."
---

# This is a sample MDX file

This is a sample MDX file. It contains JSX and markdown content.

![Image](https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0)

```javascript
console.log("Hello, world!");
```

<YouTube videoId="dQw4w9WgXcQ" />
````

### 3. Creating the Main Page

1. **Import Necessary Modules**:

   - Your `Home` component will import modules like `fs`, `path`, `matter`, and Next.js components.

2. **Read and Process MDX Files**:

   - Use `fs` to read the files from the `blogs` directory.
   - Process each file's contents with `gray-matter` to extract front matter (metadata) and content.

3. **Render Blog List**:

   - Use the extracted data to render a list of blog posts on the main page.
   - Each list item links to the individual blog post page.

```javascript
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Link from "next/link";

export default function Home() {
  const blogDirectory = path.join(process.cwd(), "blogs");
  const fileNames = fs.readdirSync(blogDirectory);

  const blogs = fileNames.map((fileName) => {
    const slug = fileName.replace(".mdx", "");
    const fullPath = path.join(blogDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    const { data: frontMatter } = matter(fileContents);

    const date = new Date(frontMatter.date);

    // Format the date to a readable string format
    // For example, "October 1, 2021"
    const formattedDate = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    return {
      slug,
      formattedDate,
      meta: frontMatter,
    };
  });

  return (
    <div>
      <div className="flex flex-col gap-8">
        <h1 className="font-bold text-4xl">Next.js MDX Blog</h1>
        <div>
          <p>A static blog built with Next.js and MDX</p>
        </div>

        <section className="flex flex-col gap-4">
          <h2 className="font-bold text-2xl">Blog Posts</h2>

          <ul className="flex flex-col gap-4">
            {blogs.map((blog) => (
              <li key={blog.slug} className="border px-3 py-2 rounded-xl">
                <Link href={`/blog/${blog.slug}`}>
                  <h3 className="font-bold text-xl">{blog.meta.title}</h3>
                  <div>{blog.formattedDate}</div>
                  <div>{blog.meta.description}</div>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
```

### 4. Creating Individual Blog Post Pages

1. **Dynamic Routes**:

   - Use Next.js dynamic routing to create a page for each blog post. Create a page file at `app/blog/[slug]/page.tsx`, and insert the code below.

```javascript
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";
import YouTube from "@/components/mdx/youtube";
import Code from "@/components/mdx/code-component/code";

// Content for these pages will be fetched with getPost function.
// This function is called at build time.
// It returns the content of the post with the matching slug.
// It also returns the slug itself, which Next.js will use to determine which page to render at build time.
//For example, { props: { slug: "my-first-post", content: "..." } }
async function getPost({ slug }: { slug: string }) {
  const markdownFile = fs.readFileSync(
    path.join("blogs", slug + ".mdx"),
    "utf-8"
  );
  const { data: frontMatter, content } = matter(markdownFile);
  return {
    frontMatter,
    slug,
    content,
  };
}

// generateStaticParams generates static paths for blog posts.
// This function is called at build time.
// It returns an array of possible values for slug.
// For example, [{ params: { slug: "my-first-post" } }, { params: { slug: "my-second-post" } }]
export async function generateStaticParams() {
  const files = fs.readdirSync(path.join("blogs"));
  const params = files.map((filename) => ({
    slug: filename.replace(".mdx", ""),
  }));

  return params;
}

export default async function Page({ params }: { params: { slug: string } }) {
  // Params contains the post `slug`

  // Fetch the post content based on the slug
  const props = await getPost(params);

  // Customize components for MDX rendering.
  // For example, the Code component will render code blocks with syntax highlighting.
  // The YouTube component will render YouTube videos.
  const components = {
    pre: Code,
    YouTube,
  };

  return (
    <article className="prose prose-sm md:prose-base lg:prose-lg mx-auto">
      <h1>{props.frontMatter.title}</h1>
      <MDXRemote source={props.content} components={components} />
    </article>
  );
}
```

2. **Get Static Props**:

   - Implement `getPost` and `generateStaticParams` functions to fetch the content for each MDX file based on the slug.
   - Use `fs` to read the MDX file content and `gray-matter` to parse it.

3. **Render MDX Content**:
   - Use `MDXRemote` from `next-mdx-remote` to render the MDX content on the page.
   - Customize components like `Code` and `YouTube` for MDX rendering.

### 5. Styling and Custom Components

1. **Styling**:

   - Apply CSS or use a CSS framework like Tailwind CSS to style your blog pages.

2. **MDX Components**:

   - Create custom components like `YouTube` and `Code` to enhance your MDX content.

YouTube component:

```javascript
import React from "react";

const YouTube = ({ videoId }: { videoId: string }) => {
  const videoSrc = `https://www.youtube.com/embed/${videoId}`;
  return (
    <iframe
      width="560"
      height="315"
      src={videoSrc}
      allow="autoplay; encrypted-media"
      allowFullScreen
    ></iframe>
  );
};

export default YouTube;
```

Code component:

```javascript
import React from "react";
import AdminBar from "@/components/mdx/code-component/admin";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { nightOwl } from "react-syntax-highlighter/dist/cjs/styles/prism";

const Code = (props: any) => {
  const codeContent =
    typeof props.children === "string"
      ? props.children
      : props.children.props.children;
  const className = props.children.props.className || "";
  const matches = className.match(/language-(?<lang>.*)/);
  const language = matches?.groups?.lang || "";

  return (
    <div className="text-sm flex flex-col gap-0">
      <AdminBar code={codeContent} language={language} />
      <SyntaxHighlighter
        className="rounded-lg"
        style={nightOwl}
        language={language}
      >
        {codeContent}
      </SyntaxHighlighter>
    </div>
  );
};

export default Code;
```

3. **Integrate Components in MDX**:
   - Pass these components to `MDXRemote` to render them within your MDX content.

```javascript
<MDXRemote source={props.content} components={components} />
```

### 6. Deploying Your Blog

1. **Choose a Host**:

   - Select a hosting platform like Vercel or Netlify for deploying your Next.js blog.

2. **Deploy**:

   - Follow the deployment instructions provided by your chosen platform. Typically, this involves linking your GitHub repository and configuring build settings.

3. **Continuous Deployment**:
   - Set up continuous deployment so that every push to your repository automatically updates your live blog.

### Conclusion

By following these steps, you will have a static MDX blog running on Next.js 14. The key is to effectively manage your MDX files and ensure they are rendered correctly on your Next.js pages. The combination of MDX for content and Next.js for rendering provides a powerful and flexible blogging platform.
