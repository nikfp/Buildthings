// vite.config.ts
import "vitest/config";
import { sveltekit } from "@sveltejs/kit/vite";
import path from "path";
var config = {
  plugins: [sveltekit()],
  resolve: {
    alias: {
      $houdini: path.resolve(".", "$houdini"),
      $graphql: path.resolve("src", "lib", "graphql-client")
    }
  },
  server: {
    fs: {
      allow: ["."]
    }
  },
  test: {
    globals: true,
    coverage: {
      all: true,
      skipFull: true,
      src: ["./src"],
      exclude: [
        "**/generated/**/*",
        "**/graphql-client/**/*",
        "**/*.d.ts",
        "**/*.spec.ts",
        "**/*.svelte",
        "**/generated-types/**/*",
        "**/*/graphql-server/executor.ts"
      ]
    }
  }
};
var vite_config_default = config;
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGVzdC9jb25maWcnO1xuaW1wb3J0IHsgc3ZlbHRla2l0IH0gZnJvbSAnQHN2ZWx0ZWpzL2tpdC92aXRlJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuXG4vKiogQHR5cGUge2ltcG9ydCgndml0ZScpLlVzZXJDb25maWd9ICovXG5jb25zdCBjb25maWcgPSB7XG5cdHBsdWdpbnM6IFtzdmVsdGVraXQoKV0sXG5cdHJlc29sdmU6IHtcblx0XHRhbGlhczoge1xuXHRcdFx0JGhvdWRpbmk6IHBhdGgucmVzb2x2ZSgnLicsICckaG91ZGluaScpLFxuXHRcdFx0JGdyYXBocWw6IHBhdGgucmVzb2x2ZSgnc3JjJywgJ2xpYicsICdncmFwaHFsLWNsaWVudCcpXG5cdFx0fVxuXHR9LFxuXHRzZXJ2ZXI6IHtcblx0XHRmczoge1xuXHRcdFx0YWxsb3c6IFsnLiddXG5cdFx0fVxuXHR9LFxuXHR0ZXN0OiB7XG5cdFx0Z2xvYmFsczogdHJ1ZSxcblx0XHRjb3ZlcmFnZToge1xuXHRcdFx0YWxsOiB0cnVlLFxuXHRcdFx0c2tpcEZ1bGw6IHRydWUsXG5cdFx0XHRzcmM6IFsnLi9zcmMnXSxcblx0XHRcdGV4Y2x1ZGU6IFtcblx0XHRcdFx0JyoqL2dlbmVyYXRlZC8qKi8qJyxcblx0XHRcdFx0JyoqL2dyYXBocWwtY2xpZW50LyoqLyonLFxuXHRcdFx0XHQnKiovKi5kLnRzJyxcblx0XHRcdFx0JyoqLyouc3BlYy50cycsXG5cdFx0XHRcdCcqKi8qLnN2ZWx0ZScsXG5cdFx0XHRcdCcqKi9nZW5lcmF0ZWQtdHlwZXMvKiovKicsXG5cdFx0XHRcdCcqKi8qL2dyYXBocWwtc2VydmVyL2V4ZWN1dG9yLnRzJ1xuXHRcdFx0XVxuXHRcdH1cblx0fVxufTtcblxuZXhwb3J0IGRlZmF1bHQgY29uZmlnO1xuLy8gZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbi8vIHRlc3Q6IHtcbi8vIFx0Z2xvYmFsczogdHJ1ZSxcbi8vIFx0Y292ZXJhZ2U6IHtcbi8vIFx0XHRhbGw6IHRydWUsXG4vLyBcdFx0c2tpcEZ1bGw6IHRydWUsXG4vLyBcdFx0c3JjOiBbJy4vc3JjJ10sXG4vLyBcdFx0ZXhjbHVkZTogW1xuLy8gXHRcdFx0JyoqL2dlbmVyYXRlZC8qKi8qJyxcbi8vIFx0XHRcdCcqKi9ncmFwaHFsLWNsaWVudC8qKi8qJyxcbi8vIFx0XHRcdCcqKi8qLmQudHMnLFxuLy8gXHRcdFx0JyoqLyouc3BlYy50cycsXG4vLyBcdFx0XHQnKiovKi5zdmVsdGUnLFxuLy8gXHRcdFx0JyoqL2dlbmVyYXRlZC10eXBlcy8qKi8qJyxcbi8vIFx0XHRcdCcqKi8qL2dyYXBocWwtc2VydmVyL2V4ZWN1dG9yLnRzJ1xuLy8gXHRcdF1cbi8vIFx0fVxuLy8gfVxuLy8gfSk7XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQUE7QUFDQTtBQUNBO0FBR0EsSUFBTSxTQUFTO0FBQUEsRUFDZCxTQUFTLENBQUMsVUFBVSxDQUFDO0FBQUEsRUFDckIsU0FBUztBQUFBLElBQ1IsT0FBTztBQUFBLE1BQ04sVUFBVSxLQUFLLFFBQVEsS0FBSyxVQUFVO0FBQUEsTUFDdEMsVUFBVSxLQUFLLFFBQVEsT0FBTyxPQUFPLGdCQUFnQjtBQUFBLElBQ3REO0FBQUEsRUFDRDtBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ1AsSUFBSTtBQUFBLE1BQ0gsT0FBTyxDQUFDLEdBQUc7QUFBQSxJQUNaO0FBQUEsRUFDRDtBQUFBLEVBQ0EsTUFBTTtBQUFBLElBQ0wsU0FBUztBQUFBLElBQ1QsVUFBVTtBQUFBLE1BQ1QsS0FBSztBQUFBLE1BQ0wsVUFBVTtBQUFBLE1BQ1YsS0FBSyxDQUFDLE9BQU87QUFBQSxNQUNiLFNBQVM7QUFBQSxRQUNSO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsTUFDRDtBQUFBLElBQ0Q7QUFBQSxFQUNEO0FBQ0Q7QUFFQSxJQUFPLHNCQUFROyIsCiAgIm5hbWVzIjogW10KfQo=
