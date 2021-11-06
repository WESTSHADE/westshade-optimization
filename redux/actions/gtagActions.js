import Utils from "../../utils/utils";

const utils = new Utils();

const fetchProduct = async (id) => {
    if (!id) return;
    return await utils.getProductByWooId(id);
};

export const viewItem = (detail) => {
    if (typeof gtag !== 'undefined') {
        const {sku, name, categories, price} = detail;

        let category = "";

        if (categories.length > 0) {
            category = categories.reduce((c, p, index) => index === 0 ? p.name : c + "/" + p.name, "");
        }

        gtag('event', 'view_item', {
            "items": [
                {
                    "id": sku,
                    "name": name,
                    "brand": "Westshade",
                    "category": category,
                    "price": price
                }
            ]
        });
    }
}

export const addToCart = (products = [], variants = [], count,) => {
    if (typeof gtag !== 'undefined') {
        products.map((product, index) => {
            const {sku, name, categories, type, price} = product;

            let variant = "", category = "";

            if (categories.length > 0) {
                category = categories.reduce((c, p, index) => index === 0 ? p.name : c + "/" + p.name, "");
            }
            if (variants[index]) {
                variant = variants[index].attributes.reduce((v, p, index) => index === 0 ? (p.name + ": " + p.option) : (v + "; " + p.name + ": " + p.option), "");
            } else if (!variants[index] && type === "variable") {
                return;
            }

            gtag('event', 'add_to_cart', {
                "items": [
                    {
                        "id": sku,
                        "name": name,
                        "brand": "Westshade",
                        "category": category,
                        "variant": variant,
                        "quantity": count,
                        "price": price
                    }
                ]
            });
        })
    }
}

export const removeFromCart = (detail, count) => {
    if (typeof gtag !== 'undefined') {
        const {sku, name, attributes, categories, price} = detail;

        let variant = "", category = "";

        if (categories.length > 0) {
            category = categories.reduce((c, p, index) => index === 0 ? p.name : c + "/" + p.name, "");
        }
        if (attributes.length > 0) {
            variant = attributes.reduce((v, p, index) => index === 0 ? (p.name + ": " + p.option) : (v + "; " + p.name + ": " + p.option), "");
        }

        gtag('event', 'remove_from_cart', {
            "items": [
                {
                    "id": sku,
                    "name": name,
                    "brand": "Westshade",
                    "category": category,
                    "variant": variant,
                    "quantity": count,
                    "price": price
                }
            ]
        });
    }
}

export const beginCheckout = (products, lineItem) => {
    if (typeof gtag !== 'undefined') {

        let items = [];

        products.map((product, index) => {
            const {sku, name, attributes, categories, price} = product;

            let variant = "", category = "", count = 0;

            if (categories.length > 0) {
                category = categories.reduce((c, p, index) => index === 0 ? p.name : c + "/" + p.name, "");
            }
            if (attributes.length > 0) {
                variant = attributes.reduce((v, p, index) => index === 0 ? (p.name + ": " + p.option) : (v + "; " + p.name + ": " + p.option), "");
            }
            if (lineItem[index]) {
                count = lineItem[index].quantity;
            }

            items.push({
                "id": sku,
                "name": name,
                "brand": "Westshade",
                "category": category,
                "variant": variant,
                "quantity": count,
                "price": price
            });
        })

        gtag('event', 'begin_checkout', {
            "items": items,
        });
    }
}

export const viewPromotion = (coupons) => {
    if (typeof gtag !== 'undefined') {

        let promotions = [];

        coupons.map(coupon => {
            promotions.push({
                id: coupon.id,
                name: coupon.code
            })
        })

        gtag('event', 'view_promotion', {
            "promotions": promotions
        });
    }
}

export const purchase = (detail) => {
    if (typeof gtag !== 'undefined') {

        const {id, currency, coupon_lines, line_items, shipping_total, total_tax, total} = detail;

        let lineItems_gtag = [];
        let couponItems = [];

        coupon_lines.map((coupon) => couponItems.push(coupon.code));
        line_items.map(async (item) => {
            let variant = "", category = "";

            let product = await fetchProduct(item.product_id);

            if (product && product.categories.length > 0) {
                category = product.categories.reduce((c, p, index) => index === 0 ? p.name : c + "/" + p.name, "");
            }

            if (item.meta_data.length > 0) {
                variant = item.meta_data.reduce((v, p, index) => index === 0 ? p.key !== "_reduced_stock" ? (p.display_key + ": " + p.display_value) : "" : p.key !== "_reduced_stock" ? (v + "; " + p.display_key + ": " + p.display_value) : v, "");
            }

            lineItems_gtag.push({id: item.sku, name: item.name, brand: "Westshade", category: category, variant: variant, quantity: item.quantity, price: item.price})
        });

        gtag('event', 'purchase', {
            "transaction_id": id,
            // "affiliation": "Westshade",
            "value": total,
            "currency": currency,
            "tax": total_tax,
            "shipping": shipping_total,
            "items": lineItems_gtag
        });
    }
}
