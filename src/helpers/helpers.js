const baseUrl = (price, price_sale) => {
    if (price_sale != 0) {
        return 'Giá: ' + formatCash(price) +
            'đ&ensp;< sup style = "text-decoration: line-through; opacity:0.6" > '
            + formatCash(price) + 'đ</sup>';
    }
    return 'Giá: ' + price + 'đ';
};

function formatCash(str) {
    return str.split('').reverse().reduce((prev, next, index) => {
        return ((index % 3) ? next : (next + '.')) + prev
    })
}

export default {
    baseUrl,
};