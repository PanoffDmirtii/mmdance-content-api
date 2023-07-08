'use strict';

/**
 * amocrm-token service
 */

const { createCoreService } = require('@strapi/strapi').factories;
const axios = require('axios')

module.exports = createCoreService('api::amocrm-token.amocrm-token', ({ strapi }) =>  ({
  async updateAuthTokens() {
    const data = await super.find();
    const baseURL = process.env.AMOCRM_BASE_URL;
    const client_id = process.env.AMOCRM_CLIENT_ID;
    const client_secret = process.env.AMOCRM_CLIENT_SECRET;
    const redirect_uri = process.env.AMOCRM_REDIRECT_URI;

    const client = axios.create({
      baseURL,
    })

    try {
      const { data: { access_token, refresh_token } } = await client.post(
        '/oauth2/access_token',
        {
          client_id,
          client_secret,
          grant_type: 'refresh_token',
          refresh_token: data.refresh_token,
          redirect_uri,
      }, {
          headers: {
            'Content-Type': 'application/json'
          }
        })

      console.log({old: data.refresh_token, new: refresh_token});

      if (access_token && refresh_token) {
        await strapi.entityService.update('api::amocrm-token.amocrm-token', data.id, { data: {
            access_token, refresh_token
          } })
      }


    } catch (error) {
      console.error(`updateAuthTokens => ${error.message}`);
    }


  }
}));
