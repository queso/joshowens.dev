const path = require('path');
const componentWithMDXScope = require('gatsby-mdx/component-with-mdx-scope');

const PAGINATION_OFFSET = 4;

const pluckTags = edges =>
  Object.keys(
    edges.reduce((acc, value) => {
      value.node.fields.tags.forEach(tag => {
        if (!acc[tag]) {
          acc[tag] = tag;
        }
      });

      return acc;
    }, {}),
  );

const groupByTag = edges =>
  edges.reduce((acc, value) => {
    value.node.fields.tags.forEach(tag => {
      if (!acc[tag]) {
        acc[tag] = [];
      }
      acc[tag].push(value);
    });
    return acc;
  }, {});

const createTagPages = (createPage, edges) => {
  const tags = pluckTags(edges);

  const posts = groupByTag(edges);

  Object.keys(posts).forEach(tag => {
    createPaginatedPages(
      createPage,
      posts[tag],
      `/tag/${tag}`,
      { tags, activetag: tag },
    );
  });
};

const createPosts = (createPage, edges) => {
  edges.forEach(({ node }, i) => {
    const prev = i === 0 ? null : edges[i - 1].node;
    const next = i === edges.length - 1 ? null : edges[i + 1].node;

    createPage({
      path: node.fields.slug,
      component: componentWithMDXScope(
        path.resolve(`./src/templates/post.js`),
        node.code.scope,
        __dirname,
      ),
      context: {
        id: node.id,
        prev,
        next,
      },
    });
  });
};

const createBlog = (createPage, edges) => {
  const tags = pluckTags(edges);

  createPaginatedPages(createPage, edges, '/', { tags });
};

const createPaginatedPages = (
  createPage,
  edges,
  pathPrefix,
  context,
) => {
  const pages = edges.reduce((acc, value, index) => {
    const pageIndex = Math.floor(index / PAGINATION_OFFSET);

    if (!acc[pageIndex]) {
      acc[pageIndex] = [];
    }

    acc[pageIndex].push(value.node.id);

    return acc;
  }, []);

  pages.forEach((page, index) => {
    if (index > 0 && pathPrefix == "/") {
      pathPrefix = "/page";
    }
    const previousPagePath = pathPrefix == "/" ?`/page/${index + 1}`  : `${pathPrefix}/${index + 1}` ;
    let nextPagePath =
      index === 1 ? pathPrefix : `${pathPrefix}/${index - 1}`;
    if (index === 1 && pathPrefix == "/page") {
      nextPagePath = "/";
    }

    createPage({
      path: index > 0 ? `${pathPrefix}/${index}` : `${pathPrefix}`,
      component: path.resolve(`src/templates/blog.js`),
      context: {
        pagination: {
          page,
          nextPagePath: index === 0 ? null : nextPagePath,
          previousPagePath:
            index === pages.length - 1 ? null : previousPagePath,
          pageCount: pages.length,
          pathPrefix,
        },
        ...context,
      },
    });
  });
};

exports.createPages = ({ actions, graphql }) =>
  graphql(`
    query {
      allMdx(sort: { order: DESC, fields: [frontmatter___date] }) {
        edges {
          node {
            id
            excerpt(pruneLength: 250)
            fields {
              title
              slug
              tags
              supportPage
            }
            timeToRead
            code {
              scope
            }
          }
        }
      }
    }
  `).then(({ data, errors }) => {
    if (errors) {
      return Promise.reject(errors);
    }

    const { edges } = data.allMdx;

    createBlog(actions.createPage, edges);
    createPosts(actions.createPage, edges);
    createTagPages(actions.createPage, edges);
  });

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.resolve(__dirname, 'src'), 'node_modules'],
      alias: {
        $components: path.resolve(__dirname, 'src/components'),
      },
    },
  });
};

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `Mdx`) {
    const parent = getNode(node.parent);

    createNodeField({
      name: 'id',
      node,
      value: node.id,
    });

    createNodeField({
      name: 'title',
      node,
      value: node.frontmatter.title,
    });

    createNodeField({
      name: 'description',
      node,
      value: node.frontmatter.description,
    });

    createNodeField({
      name: 'slug',
      node,
      value: node.frontmatter.slug,
    });

    createNodeField({
      name: 'date',
      node,
      value: node.frontmatter.date || '',
    });

    createNodeField({
      name: 'banner',
      node,
      banner: node.frontmatter.banner,
    });

    createNodeField({
      name: 'supportPage',
      node,
      value: node.frontmatter.supportPage || false,
    });

    createNodeField({
      name: 'tags',
      node,
      value: node.frontmatter.tags || [],
    });

    createNodeField({
      name: 'keywords',
      node,
      value: node.frontmatter.keywords || [],
    });
  }
};
