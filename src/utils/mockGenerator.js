import { randomFloat, randomInt, randomItem, randomWalk, getTimestamp } from './mathHelpers';

const ASSET_TYPES = ['locomotive', 'signal', 'bridge', 'level_crossing'];
const ZONES = ['Northern', 'Southern', 'Eastern', 'Western', 'Central'];
const MODELS = {
    locomotive: ['WAP7', 'WAP5', 'WAG9', 'WDG4G'],
    signal: ['LED-S1', 'LED-S2', 'MECH-S1'],
    bridge: ['Steel-Truss', 'Concrete-Arch', 'Masonry'],
    level_crossing: ['Auto-Barrier', 'Manual-Gate']
};

export const generateInitialAssets = (count = 210) => {
    const assets = [];
    for (let i = 0; i < count; i++) {
        const type = randomItem(ASSET_TYPES);
        const id = `${type.charAt(0).toUpperCase()}-${String(i + 1).padStart(3, '0')}`;
        assets.push({
            id,
            type,
            zone: randomItem(ZONES),
            model: randomItem(MODELS[type]),
            installDate: new Date(2015 + randomInt(0, 8), randomInt(0, 11), randomInt(1, 28)).toISOString().split('T')[0],
            health: randomInt(70, 100),
            lastSeen: getTimestamp(),
            gps: {
                lat: randomFloat(8.4, 37.6), // India range
                lng: randomFloat(68.7, 97.2)
            },
            metadata: {
                owner: "IR",
                serial: `SN-${String(randomInt(1000, 9999))}`
            }
        });
    }
    return assets;
};

export const generateTelemetry = (asset) => {
    const isLoco = asset.type === 'locomotive';
    return {
        temperature: randomFloat(20, 85),
        vibration: randomFloat(0.1, 15),
        speed: isLoco ? randomFloat(0, 120) : 0,
        gpsJitter: {
            lat: (Math.random() - 0.5) * 0.001,
            lng: (Math.random() - 0.5) * 0.001
        },
        timestamp: getTimestamp()
    };
};

export const generateHealthHistory = (asset, days = 30) => {
    const history = [];
    let currentHealth = asset.health;
    for (let i = 0; i < days; i++) {
        currentHealth = randomWalk(currentHealth, 2, 0, 100);
        history.push({
            date: new Date(Date.now() - (days - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            health: Math.round(currentHealth)
        });
    }
    return history;
};

export const updateAssetHealth = (asset, telemetry) => {
    let penalty = 0;
    if (telemetry.temperature > 75) penalty += 2;
    if (telemetry.vibration > 12) penalty += 3;

    // Random failure chance (very low)
    if (Math.random() < 0.001) penalty += 40;

    const newHealth = clamp(asset.health - penalty + (penalty === 0 ? 0.5 : 0), 0, 100);
    return Math.round(newHealth);
};

const clamp = (val, min, max) => Math.max(min, Math.min(max, val));
