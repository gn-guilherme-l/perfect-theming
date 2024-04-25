import { vitePlugin as remix } from "@remix-run/dev";
import { installGlobals } from "@remix-run/node";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import esbuildPluginStyledComponents from "esbuild-plugin-styled-components";

installGlobals();

export default defineConfig(({ isSsrBuild, mode }) => {
  return {
    plugins: [remix(), tsconfigPaths()],
    optimizeDeps: {
      esbuildOptions: {
        plugins: [
          esbuildPluginStyledComponents({
            ssr: isSsrBuild,
            displayName: mode !== "production",
          }),
        ],
      },
    },
    ssr: {
      noExternal: [
        "styled-components",
        "@emotion/*",
      ],
    },
  }
});
