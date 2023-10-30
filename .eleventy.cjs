const path = require("path");
const htmlmin = require('html-minifier');
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const EleventyVitePlugin = require('@11ty/eleventy-plugin-vite');


module.exports = function (eleventyConfig) {

  eleventyConfig.setServerOptions({
    port: 3000,
  });

  eleventyConfig.addPlugin(EleventyVitePlugin, {
    tempFolderName: '.11ty-vite',

    viteOptions: {
      publicDir: 'public',
      root: 'src',


      plugins: [],

      resolve: {
        // Create alias for directories, simplifying import paths
        alias: {
          '@styles': path.resolve('.', '/src/styles'),
          '@app': path.resolve('.', '/src/app'),
          '@classes': path.resolve('.', '/src/app/classes'),
          '@pages': path.resolve('.', '/src/app/pages'),
          '@fonts': path.resolve('.', '/src/fonts'),
        },
      },
    },


  });

  eleventyConfig.addPlugin(eleventyNavigationPlugin);


  // Specify directories and files that should bypass Eleventy's processing and be copied "as-is"
  eleventyConfig.addPassthroughCopy('public');
  eleventyConfig.addPassthroughCopy('src/app');
  eleventyConfig.addPassthroughCopy('src/fonts');
  eleventyConfig.addPassthroughCopy('src/styles');
  eleventyConfig.setServerPassthroughCopyBehavior('copy');

  // Minify HTML files before writing to the output directory
  eleventyConfig.addTransform('htmlmin', (content, outputPath) => {
    if (outputPath && outputPath.endsWith('.html')) {
      const minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
      });
      return minified;
    }
    return content;
  });


  return {
    dir: {
      input: 'src/views',
      output: '_site',
      includes: '_includes',
      data: '_data',
    },
    passthroughFileCopy: true,
    htmlTemplateEngine: 'pug',
  };
}
