import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://littlepug.github.io',
  base: '/',
  output: 'static',
  markdown: {
    shikiConfig: {
      theme: 'github-dark-dimmed',
      wrap: true,
    },
  },
});
