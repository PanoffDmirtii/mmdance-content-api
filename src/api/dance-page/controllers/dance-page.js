'use strict';

/**
 * dance-page controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::dance-page.dance-page', ({ strapi }) => ({
  async findDanceNavigation(ctx) {
    const { results } = await strapi.service('api::dance-page.dance-page').find({ select: ['title', 'priority', 'slug'] });
    return  await this.sanitizeOutput(results, ctx);
  }
}));
