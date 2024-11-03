# Modern Blog Platform

A feature-rich blog platform built with Next.js, offering an exceptional experience for both bloggers and readers.

## 🌟 Features

- **📝 MDX and Markdown Support**

  - Write blog posts in MDX and Markdown
  - Combine easy formatting with custom React components
  - Flexible content creation options

- **🔍 SEO Optimization**

  - Integrated sitemap
  - Robots.txt configuration
  - JSON-LD schema support
  - Enhanced content discoverability

- **📡 RSS Feed**

  - Built-in RSS feed support
  - Easy subscription for readers
  - Automatic content updates

- **🖼️ Dynamic OG Images**

  - Automatically generated Open Graph images
  - Enhanced social media presence
  - Customizable templates

- **💻 Developer-Friendly Features**
  - Syntax highlighting for code snippets
  - Modern development stack
  - Comprehensive documentation

## 🛠️ Tech Stack

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Shadcn/ui](https://ui.shadcn.com/)
- [Prisma](https://www.prisma.io/)
- [Vercel Postgres](https://vercel.com/storage/postgres)

## 🚀 Getting Started

1. Clone the repository:

```bash
git clone https://github.com/Torres7707/next-blog.git
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Set up environment variables:

```bash
cp .env.example .env
```

4. Run the development server:

```bash
npm run dev
# or
yarn dev
```

## 📝 Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
DATABASE_URL=
NEXT_PUBLIC_APP_URL=
# Add other necessary environment variables
```

## 📁 Project Structure

```
├── app/
│   ├── api/
│   └── (routes)/
├── components/
│   ├── ui/
│   └── shared/
├── lib/
├── prisma/
├── public/
└── styles/
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Special thanks to the creators of the technologies used in this project
- Special thanks to [this tutorial](https://www.youtube.com/watch?v=htgktwXYw6g) for the helpful guidance
