# Next.js Starter (App Router)

## Getting Started

### Development mode

```bash
pnpm install
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

### Production mode

```bash
pnpm install
pnpm run build
pnpm run start
```

Your app should be up and running on [http://localhost:3000](http://localhost:3000)!

### Vercel Features

#### Analytics

This starter uses [Vercel Analytics](https://vercel.com/docs/analytics) to gather user metrics and integrate directly
into the Vercel dashboard, without the need for a third party tool or cookies.

#### Speed Insights

This starter also uses [Vercel Speed Insights](https://vercel.com/docs/speed-insights) to provide detailed performance
metrics directly in Vercel's dashboard. This allows for a more granular Core Web Vitals dataset that is tracked per
deployment, rather than the standard rolling 30-day average.

#### Feature Flags

This starter uses the [Flags SDK](https://flags-sdk.dev/) to abstract feature flags and integrate into the [Vercel
Toolbar](https://vercel.com/docs/vercel-toolbar)

1. Generate `FLAGS_TOKEN`
    ```bash
   node -e "console.log(crypto.randomBytes(32).toString('base64url'))"
   ```
2. Add to [`env.local`](./.env.local)

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions
are welcome!
