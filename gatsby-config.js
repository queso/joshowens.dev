module.exports = {
  pathPrefix: '/',
  siteMetadata: {
    siteUrl: 'https://joshowens.me',
    author: 'Josh Owens',
    title: 'My thougts on Unicorns, Rainbows, and Code',
    description: 'The blog of Josh Owens, developer, teacher, entrepreneur',
    keywords: [
      'Software Engineer',
      'Web Developer',
      'Consultant',
      'Freelancer',
      'Teacher'
    ],
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/content/blog`,
        name: 'blog',
      },
    },
    {
      resolve: `gatsby-mdx`,
      options: {
        extensions: ['.mdx', '.md'],
        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 1035,
              sizeByPixelDensity: true,
            },
          },
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              classPrefix: 'language-',
              inlineCodeMarker: null,
              aliases: {},
            },
          },
        ],
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-styled-components',
    'gatsby-plugin-catch-links',
    'gatsby-plugin-react-helmet',
		'gatsby-plugin-netlify-headers',
    {
      resolve: 'gatsby-plugin-web-font-loader',
      options: {
        google: {
          families: ['Roboto:400,900', 'Roboto Slab:300,400']
        }
      }
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/assets`,
        name: 'images',
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'A learning, teaching and writing software engineer',
        short_name: 'joshowens',
        start_url: '/',
        background_color: '#fff',
        theme_color: '#525dce',
        display: 'standalone',
        icon: 'assets/logo.png',
      },
    },
    'gatsby-plugin-offline',
  ],
};
