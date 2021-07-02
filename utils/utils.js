import Client from "shopify-buy";
import Config from "../config/config.json";

export default class Utils {
  client = null;

  constructor() {
    this.client = Client.buildClient({
      domain: Config.domain,
      storefrontAccessToken: Config.storefrontAccessToken,
    });
  }

  async getProductByName(productName) {
    return await this.client.product.fetchByHandle(productName);
  }

  async getProductById(productId) {
    return await this.client.product.fetch(productId);
  }

  /*
   *
   * Sample Product Options
   *
   * const options = {
   *   Size: "10x10",
   *   Color: "White"
   * }
   *
   */
  async getVariantByOptions(product, options) {
    return await this.client.product.helpers.variantForOptions(
      product,
      options
    );
  }

  /*
   *
   * Sample Items Object
   *
   * const items = [{
   *   variantId: "Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8zOTkyNjQ3Nzc4MzE5Nw==",
   *   quantity: 1
   * },
   * {
   *   variantId: "Z2lkOi8vc2grwsfdgdehdgefgGsoEasCXsweQgfvsedfafsefsf4MzE5Nw==",
   *   quantity: 3
   * }]
   *
   */
  async checkout(items) {
    const checkout = await this.client.checkout.create();
    return await this.client.checkout.addLineItems(checkout.id, items);
  }

  async getVariantStock(variant) {
    const shopifyId = parseInt(atob(variant.id).split("/").pop());
    const stock = await fetch(
      "http://localhost:8888/variant/stock?shopifyId=" + shopifyId
    );
    const json = await stock.json();
    return json.variant.inventory_quantity;
  }
}
