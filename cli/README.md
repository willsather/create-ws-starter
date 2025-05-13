# Registry SDK

Automatically create a component registry within a Next.js application using your Shadcn/ui components.

## Getting Started

1. Install
   ```shell 
    npm i registry-sdk
   ```

2. Create `@/lib/registry.tsx` configuration file with your components (this example uses a `Footer.tsx`)

   ```tsx
   import { buildRegistry } from "registry-sdk"
   
   export const registry = buildRegistry({
      baseURL: "http://localhost:3000",
      components: [
         {
            name: "footer",
            title: "Footer",
            description: "A footer containing base links and social media links.",
   
            demo: {
               default: <Footer/>
            },
   
            dependencies: ["button"],
            registryDependencies: ["button"],
   
            files: [
               {
                  path: "src/components/footer.tsx",
                  target: "@/components/footer.tsx",
               }
            ]
         },
      ],
   });
   ```

3. Mount Route Handler at `/app/api/registry/r/[...name]/route.ts`

   ```ts
   import { registry } from "@/lib/registry"; // path to your registry config file
   import { toNextJsRouteHandler } from "registry-sdk/nextjs";
   
   export const { GET, generateStaticParams } = toNextJsRouteHandler(registry);
   ```

4. (Optional) Mount Page Handler at `/app/api/registry/[[...name]]/page.tsx`

   ```tsx
   import { registry } from "@/lib/registry"; // path to your registry config file
   import { toNextJsPageHandler } from "registry-sdk/nextjs";
   
   const { page, generateStaticParams } = toNextJsPageHandler(registry);
   
   export default page;
   export { generateStaticParams };
   ```

5. Navigate to `/registry` to view your component registry with individual component previews each with `Open in v0`
   buttons.

> [!NOTE]  
> The `registry-sdk` exposes routes and pages under `/registry/*`, with the [`registry-item.json`](https://ui.shadcn.com/docs/registry/registry-item-json) files located at `/registry/r/${name}.json`.
