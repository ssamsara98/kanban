const mdl = {
  chainWebpack: (config) => {
    config.plugin("html").tap((args) => {
      args[0].title = "KamVan";
      return args;
    });
  },
};

module.exports = mdl;
