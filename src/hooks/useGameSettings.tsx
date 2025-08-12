"use client"

import { useState, useEffect } from "react"
import type { GameSettings } from "@/types/settings"
import { saveSettings, loadSettings } from "@/lib/storage"

export const useGameSettings = () => {
    const [settings, setSettings] = useState<GameSettings>(loadSettings())

    useEffect(() => {
        saveSettings(settings)
    }, [settings])

    const updatePVESettings = (updates: Partial<GameSettings["pve"]>) => {
        setSettings((prev) => ({
            ...prev,
            pve: { ...prev.pve, ...updates },
        }))
    }

    const updatePVPSettings = (updates: Partial<GameSettings["pvp"]>) => {
        setSettings((prev) => ({
            ...prev,
            pvp: { ...prev.pvp, ...updates },
        }))
    }

    return {
        settings,
        updatePVESettings,
        updatePVPSettings,
    }
}
