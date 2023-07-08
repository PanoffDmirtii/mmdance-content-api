module.exports = {
  updateAmocrmAccessToken: {
    task: async ({ strapi }) => {
      await strapi.service('api::amocrm-token.amocrm-token').updateAuthTokens();

    },
    options: {
      rule: "0 */12 * * *",
    },
  },
};
