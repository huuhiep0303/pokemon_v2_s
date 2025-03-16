export function getIndexName(name) {
    const map = {
        "hp": "hp",
        "attack": "atk",
        "defense": "def",
        "special-attack": "spa",
        "special-defense": "spd",
        "speed": "spd"
    };
    return map[name] || null;
}

export function getUniqueClass(name) {
    const map = {
        "hp": "hp",
        "attack": "atk",
        "defense": "def",
        "special-attack": "spa",
        "special-defense": "spd-1",
        "speed": "spd-2"
    };
    return map[name] || null;
}

export function getIDPokemon(url) {
    const parts = url.split('/'); 
    return parseInt(parts[parts.length - 2], 10);
}

export async function fetchPromise(URL) {
    try {
        const response = await fetch(URL);
        return await response.json();
    } 
    catch (error) {
        console.error("Error", error);
        return null;
    }
}

