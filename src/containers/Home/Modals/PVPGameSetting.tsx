import { useState } from 'react'
import { motion, AnimatePresence } from "framer-motion"
import { Button } from '@/components/ui/button'
import { Input } from "@/components/ui/input"
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup } from "@/components/ui/select"
import { ArrowLeft, Settings, ScrollText } from "lucide-react"

import modalVariants from '@/motion/variants/ModalVariants'
import tabVariants from '@/motion/variants/TabVariants'
import GameRule from '@/constants/GameRuleContent'
import type { PVPSettingProps } from '@/types/PropTypes/PVPSettingsProps'
const PVPGameSetting = ({ isOpen, onClose, onStartGame, updatePVPSettings, settings }: PVPSettingProps) => {

    // const [settings, setSettings] = useState<GameSettings>({
    //     difficulty: "easy",
    //     playerFirst: true,
    //     customPiles: "3,5,7,4"
    // })

    const [customPiles, setCustomPiles] = useState<string>(
        settings["pvp"].customPiles?.join(",") || "3,5,7,4,2,8",
    )

    const handleCustomPilesChange = (value: string) => {
        setCustomPiles(value)
        try {
            const piles = value
                .split(",")
                .map((n) => Number.parseInt(n.trim()))
                .filter((n) => !isNaN(n) && n > 0 && n <= 9)

            if (piles.length > 0 && piles.length <= 9) {
                updatePVPSettings({ customPiles: piles })
            } else if (value.trim() === "") {
                updatePVPSettings({ customPiles: undefined })
            }
        } catch {
            // Invalid input, ignore
        }
    }


    const [activeTab, seActiveTab] = useState<string>("customize")

    const closeModal = (): void => {
        seActiveTab('customize')
        onClose()
    }

    const handleStartGame = (): void => {
        onStartGame()
    }
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className='fixed inset-0 bg-black/60 backdrop-blur-sm 
                    items-center justify-center flex p-4 z-50 '
                    onClick={onClose}
                >
                    <motion.div
                        className='modal-content w-full max-w-md bg-white/10 
                                   backdrop-blur-xl border  border-white/20 rounded-2xl shadow-2xl overflow-hidden'
                        variants={modalVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="modal-header flex items-center justify-between p-6 border-b border-white/10">
                            <div className='flex  items-center space-x-3'>
                                <Button
                                    variant={"ghost"}
                                    size={"sm"}
                                    className='text-white/70 hover:text-white hover:bg-white/10 p-2 cursor-pointer'
                                    onClick={() => { closeModal() }}
                                >
                                    <ArrowLeft
                                        className='w-5 h-5 cursor-pointer'
                                    />
                                </Button>
                                <h2 className='text-xl font-semibold text-white'>Cài đặt chế độ chơi với người</h2>
                            </div>
                        </div>
                        <div className="tabs-container flex p-2 bg-white/5">
                            <motion.button
                                variants={tabVariants}
                                animate={activeTab === "customize" ? "active" : "inactive"}
                                className='flex-1 justify-center flex items-center space-x-2 py-3 rounded-lg  cursor-pointer'
                                onClick={() => seActiveTab("customize")}
                            >
                                <Settings
                                    className='w-4 h-4'
                                />
                                <span className='text-sm font-medium '>Tùy chỉnh trò chơi</span>
                            </motion.button>
                            <motion.button
                                variants={tabVariants}
                                onClick={() => seActiveTab("rule")}
                                animate={activeTab === "rule" ? "active" : "inactive"}
                                className='flex-1 flex justify-center items-center space-x-2 py-3 rounded-lg  cursor-pointer'
                            >
                                <ScrollText className='w-4 h-4' />
                                <span className='text-sm font-medium '>Luật chơi</span>
                            </motion.button>
                        </div>
                        <div className="content p-6 space-y-6 min-h-[376px]">
                            <AnimatePresence mode='wait'>
                                {activeTab === "customize" &&
                                    (
                                        <motion.div
                                            className='space-y-6'
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                        >
                                            <div className="custom-piles-container space-y-3">
                                                <Label className="text-white/80 text-sm font-medium">Nhập tên Người chơi 1 (Player 1):</Label>
                                                <Input
                                                    className='bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:ring-purple-400/50 focus:border-purple-400/50'
                                                    placeholder={"Player 1"}
                                                    value={settings.pvp.player1Name}
                                                    onChange={(e) => updatePVPSettings({ player1Name: e.target.value })}
                                                />
                                                <Label className="text-white/80 text-sm font-medium">Nhập tên người chơi 2 (Player 2):</Label>
                                                <Input
                                                    className='bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:ring-purple-400/50 focus:border-purple-400/50'
                                                    placeholder='Player 2'
                                                    value={settings.pvp.player2Name}
                                                    onChange={(e) => updatePVPSettings({ player2Name: e.target.value })}
                                                />
                                            </div>
                                            <div className="first-player-toggle flex items-center justify-between">
                                                <Label className='text-white/80 text-sm font-medium'>Player 1 đi trước</Label>
                                                <Switch
                                                    className='data-[state=checked]:bg-purple-500 cursor-pointer'
                                                    checked={settings.pvp.player1GoesFirst}

                                                    onCheckedChange={(checked) => { updatePVPSettings({ player1GoesFirst: checked }) }}

                                                ></Switch>
                                            </div>
                                            <div className="custom-piles-container space-y-3">
                                                <Label className="text-white/80 text-sm font-medium">Tùy chỉnh số lượng đá mỗi đống</Label>
                                                <Input
                                                    id="custom-piles"
                                                    className='bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:ring-purple-400/50 focus:border-purple-400/50'
                                                    placeholder={customPiles}
                                                    value={customPiles}
                                                    onChange={(e) => handleCustomPilesChange(e.target.value)}
                                                />

                                                <p className='text-xs text-white/50'>Nhập kích thước các đống cách nhau bằng dấu phẩy từ, tối đa 9 đống,mỗi đống có tối đa 9 viên đá. Mặc định là 6 đống</p>
                                            </div>
                                        </motion.div>
                                    )}

                                {activeTab === "rule" && (
                                    <motion.div
                                        className=''
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                    >
                                        <div className="">
                                            <h3 className="text-white text-lg font-semibold text-center mb-1">Luật chơi NIM</h3>
                                            <div className="back-blur bg-white/15 rounded-xl p-2 ">
                                                <ul className="text-white/70 text-sm space-y-2 text-left max-w-md mx-auto list-decimal list-inside">
                                                    {GameRule.playStepsPVP.map((step, index) => {
                                                        return (
                                                            <li key={`step- ${index}`} dangerouslySetInnerHTML={{ __html: step }}></li>
                                                        )
                                                    })}
                                                </ul>
                                                <p className="text-white/50 text-xs mt-4" dangerouslySetInnerHTML={{ __html: GameRule.note }}>
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                            </AnimatePresence>
                        </div>
                        <div className="footer flex space-x-3 p-6 border-t border-white/10">
                            <Button className='flex-1 text-white/70 hover:text-white hover:bg-white/10 border border-white/20 cursor-pointer'
                                onClick={() => { closeModal() }}
                            >
                                Bỏ qua
                            </Button>
                            <Button
                                onClick={() => { handleStartGame() }}
                                className='flex-1 bg-gradient-to-r from-purple-500/80 to-pink-500/80
                                 hover:from-purple-400/80 hover:to-pink-400/80
                                 text-white border-0 shadow-lg hover:shadow-purple-500/25 cursor-pointer'
                            >
                                Bắt đầu chơi
                            </Button>
                        </div>
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 opacity-60" />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default PVPGameSetting