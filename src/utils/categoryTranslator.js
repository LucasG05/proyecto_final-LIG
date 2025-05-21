export const CATEGORY_MAP = {
    "electronics": "Electrónica",
    "jewelery": "Joyería",
    "men's clothing": "Ropa Masculina",
    "women's clothing": "Ropa Femenina"
}

export function translateCategory(cat) {
    if (CATEGORY_MAP[cat]) return CATEGORY_MAP[cat]
    return cat
        .split(' ')
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ')
}