import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import assetsData from '../data/assets.json';
import { generateTelemetry, updateAssetHealth } from '../utils/mockGenerator';
import { randomInt, randomItem, getTimestamp } from '../utils/mathHelpers';

const MockSocketContext = createContext(null);

export const MockSocketProvider = ({ children }) => {
    const [isPaused, setIsPaused] = useState(false);
    const subscribers = useRef(new Map());
    const timerRef = useRef(null);
    const assets = useRef(assetsData);

    const emit = (update) => {
        subscribers.current.forEach((callback) => callback(update));
        // Also update our local ref to keep track of state if needed
        const index = assets.current.findIndex(a => a.id === update.id);
        if (index !== -1) {
            assets.current[index] = { ...assets.current[index], ...update };
        }
    };

    const tick = () => {
        if (isPaused) return;

        // Select 3-8 random assets
        const count = randomInt(3, 8);
        const updates = [];

        for (let i = 0; i < count; i++) {
            const asset = randomItem(assets.current);
            const telemetry = generateTelemetry(asset);
            const newHealth = updateAssetHealth(asset, telemetry);

            const update = {
                id: asset.id,
                telemetry,
                health: newHealth,
                lastSeen: getTimestamp()
            };

            updates.push(update);
            emit(update);
        }

        // Schedule next tick
        const nextTick = randomInt(1000, 4000);
        timerRef.current = setTimeout(tick, nextTick);
    };

    useEffect(() => {
        tick();
        return () => clearTimeout(timerRef.current);
    }, [isPaused]);

    const value = {
        subscribe: (callback) => {
            const id = Math.random().toString(36).substr(2, 9);
            subscribers.current.set(id, callback);
            return id;
        },
        unsubscribe: (id) => {
            subscribers.current.delete(id);
        },
        pause: () => setIsPaused(true),
        resume: () => setIsPaused(false),
        emitOnce: () => {
            const asset = randomItem(assets.current);
            const telemetry = generateTelemetry(asset);
            const newHealth = updateAssetHealth(asset, telemetry);
            emit({
                id: asset.id,
                telemetry,
                health: newHealth,
                lastSeen: getTimestamp()
            });
        },
        isPaused,
        getAllAssets: () => assets.current
    };

    return (
        <MockSocketContext.Provider value={value}>
            {children}
        </MockSocketContext.Provider>
    );
};

export const useMockSocket = () => {
    const context = useContext(MockSocketContext);
    if (!context) {
        throw new Error('useMockSocket must be used within a MockSocketProvider');
    }
    return context;
};
