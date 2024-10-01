"use client";

import { useEffect } from 'react';

const ColorModeScript = () => {
    useEffect(() => {
        import('@/utils/color-modes').then(module => {
            const initColorMode = module.default;
            initColorMode();
        });
    }, []);

    return null;
};

export default ColorModeScript;