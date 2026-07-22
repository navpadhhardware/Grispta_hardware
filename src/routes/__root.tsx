// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import {
//   Outlet,
//   Link,
//   createRootRouteWithContext,
//   useRouter,
//   HeadContent,
//   Scripts,
// } from "@tanstack/react-router";
// import { useEffect, type ReactNode } from "react";

// import appCss from "../styles.css?url";
// import { reportLovableError } from "../lib/lovable-error-reporting";
// import { Nav } from "../components/Nav";
// import { Footer } from "../components/Footer";
// import { WhatsAppFloat } from "../components/WhatsAppFloat";
// import { CartProvider } from "../lib/cart";

// function NotFoundComponent() {
//   return (
//     <div className="flex min-h-screen items-center justify-center bg-background px-4">
//       <div className="max-w-md text-center">
//         <h1 className="font-display text-8xl text-primary">404</h1>
//         <h2 className="mt-4 text-xl font-semibold">Page not found</h2>
//         <p className="mt-2 text-sm text-muted-foreground">
//           This page doesn't exist or has been moved.
//         </p>
//         <div className="mt-6">
//           <Link to="/" className="btn-primary">Go home</Link>
//         </div>
//       </div>
//     </div>
//   );
// }

// function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
//   console.error(error);
//   const router = useRouter();
//   useEffect(() => {
//     reportLovableError(error, { boundary: "tanstack_root_error_component" });
//   }, [error]);

//   return (
//     <div className="flex min-h-screen items-center justify-center bg-background px-4">
//       <div className="max-w-md text-center">
//         <h1 className="text-xl font-semibold">This page didn't load</h1>
//         <p className="mt-2 text-sm text-muted-foreground">Something went wrong on our end.</p>
//         <div className="mt-6 flex flex-wrap justify-center gap-2">
//           <button onClick={() => { router.invalidate(); reset(); }} className="btn-primary">Try again</button>
//           <a href="/" className="btn-outline">Go home</a>
//         </div>
//       </div>
//     </div>
//   );
// }

// export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
//   head: () => ({
//     meta: [
//       { charSet: "utf-8" },
//       { name: "viewport", content: "width=device-width, initial-scale=1" },
//       { title: "Gripsta — Premium Architectural & Furniture Hardware" },
//       { name: "description", content: "Gripsta builds premium hinges, drawer channels, drywall screws and lid supports — engineered for precision, built to last." },
//       { name: "author", content: "Gripsta" },
//       { property: "og:title", content: "Gripsta — Where Innovation Meets Durability" },
//       { property: "og:description", content: "Premium architectural & furniture hardware for modern interiors." },
//       { property: "og:type", content: "website" },
//       { name: "twitter:card", content: "summary" },
//     ],
//     links: [
//       { rel: "stylesheet", href: appCss },
//       { rel: "preconnect", href: "https://fonts.googleapis.com" },
//       { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
//       { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;500;600;700&display=swap" },
//     ],
//   }),
//   shellComponent: RootShell,
//   component: RootComponent,
//   notFoundComponent: NotFoundComponent,
//   errorComponent: ErrorComponent,
// });

// function RootShell({ children }: { children: ReactNode }) {
//   return (
//     <html lang="en">
//       <head><HeadContent /></head>
//       <body>
//         {children}
//         <Scripts />
//       </body>
//     </html>
//   );
// }

// function RootComponent() {
//   const { queryClient } = Route.useRouteContext();
//   return (
//     <QueryClientProvider client={queryClient}>
//       <CartProvider>
//         <Nav />
//         <main className="min-h-screen">
//           <Outlet />
//         </main>
//         <Footer />
//         <WhatsAppFloat />
//       </CartProvider>
//     </QueryClientProvider>
//   );
// }
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Nav } from "../components/Nav";
import { Footer } from "../components/Footer";
import { WhatsAppFloat } from "../components/WhatsAppFloat";
import { CartProvider } from "../lib/cart";
function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-8xl text-primary">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          This page doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link to="/" className="btn-primary">Go home</Link>
        </div>
      </div>
    </div>
  );
}
function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold">This page didn't load</h1>
        <p className="mt-2 text-sm text-muted-foreground">Something went wrong on our end.</p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button onClick={() => { router.invalidate(); reset(); }} className="btn-primary">Try again</button>
          <a href="/" className="btn-outline">Go home</a>
        </div>
      </div>
    </div>
  );
}
export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Gripsta — Premium Architectural & Furniture Hardware" },
      { name: "description", content: "Gripsta, by Navpadhhardware, builds premium hinges, drawer channels, drywall screws and lid supports — engineered for precision, built to last." },
      { name: "author", content: "Gripsta" },
      { property: "og:title", content: "Gripsta — Where Innovation Meets Durability" },
      { property: "og:description", content: "Premium architectural & furniture hardware for modern interiors." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;500;600;700&display=swap" },
      // { rel: "icon", href: "/favicon.png" }
      { rel: "apple-touch-icon",sizes="192x192", href: "/favicon.png" }
      
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Navpadh hardware",
          "alternateName": "Gripsta",
          "url": "https://www.gripsta.in",
          "logo": "https://www.gripsta.in/logo.png",
          "description": "Gripsta, by Navpadhhardware, builds premium hinges, drawer channels, drywall screws and lid supports — engineered for precision, built to last."
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});
function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}
function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <Nav />
        <main className="min-h-screen">
          <Outlet />
        </main>
        <Footer />
        <WhatsAppFloat />
      </CartProvider>
    </QueryClientProvider>
  );
}
