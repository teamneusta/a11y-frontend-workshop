module.exports = async function (eleventyConfig) {
    const { EleventyHtmlBasePlugin } = await import("@11ty/eleventy");
    eleventyConfig.addPlugin(EleventyHtmlBasePlugin);

    eleventyConfig.addPassthroughCopy({
        'js/**/*.*': 'js',
    });

    eleventyConfig.addPassthroughCopy({
        'img/**/*.*': 'img',
    });

    return {
        pathPrefix: '/',
        markdownTemplateEngine: 'njk',
        dir: {
            input: '.',
            includes: '_includes',
            output: 'public',
        },
    };
};
