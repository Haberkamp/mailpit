import * as esbuild from "esbuild";
import tailwindPlugin from "esbuild-plugin-tailwindcss";

const doWatch = process.env.WATCH == "true" ? true : false;
const doMinify = process.env.MINIFY == "true" ? true : false;

const ctx = await esbuild.context({
  entryPoints: ["server/ui-src/index.tsx"],
  bundle: true,
  minify: doMinify,
  sourcemap: false,
  outdir: "server/ui/dist/",
  loader: {
    ".svg": "file",
    ".woff": "file",
    ".woff2": "file",
  },
  logLevel: "info",
  plugins: [
    tailwindPlugin({
      /* options */
    }),
  ],
});

if (doWatch) {
  await ctx.watch();
} else {
  await ctx.rebuild();
  ctx.dispose();
}
