import { useState } from 'react'
import { motion } from "motion/react"
import { Button } from '@/components/ui/button'
import PVEGameSetting from '@/containers/Home/Modals/PVEGameSetting'
import PVPGameSetting from '@/containers/Home/Modals/PVPGameSetting'
import gameButtons from '@/containers/GameButton/GameButon'
import buttonVariants from '@/motion/variants/buttonVariants'
import Startfield from '@/motion/Starfield'
import SavedGames from '@/containers/Home/Modals/SavedGame'
import type { GameMode } from '@/types/commonType'
import type { SavedGame } from '@/types/savedGame'
import type { GameSettings } from '@/types/settings'


interface HomePageProps {
    onSelectMode: (mode: GameMode) => void
    mode: GameMode
    onStartGame: () => void
    onLoadGame: (savedGame: SavedGame) => void
    updatePVESettings: (updates: Partial<GameSettings["pve"]>) => void
    updatePVPSettings: (updates: Partial<GameSettings["pvp"]>) => void
    settings: GameSettings
}
const HomePage = ({ onSelectMode, mode, onStartGame, onLoadGame, settings, updatePVESettings, updatePVPSettings }: HomePageProps) => {


    const [hoveredButton, setHoveredButton] = useState<string | null>(null)
    const [isShowModalPveSetting, setIsShowModalPveSetting] = useState<boolean>(false)
    const [isShowModalPVPSetting, setIsShowModalPVPSetting] = useState<boolean>(false)
    const [isShowModalSavedGame, setIsShowModalSavedGame] = useState<boolean>(false)

    const setCloseModalPVESetting = (): void => {
        setIsShowModalPveSetting(false)
    }

    const setCloseModalPVPSetting = (): void => {
        setIsShowModalPVPSetting(false)
    }

    const setCloseModalSavedGame = (): void => {
        setIsShowModalSavedGame(false)
    }

    const setShowModalPVE = (): void => {
        setIsShowModalPveSetting(true)
    }

    const setShowModalPVP = (): void => {
        setIsShowModalPVPSetting(true)
    }

    const setShowSavedGame = (): void => {
        setIsShowModalSavedGame(true)
    }

    return (
        <>

            <div className='home-page-container min-h-screen w-full 
            bg-[url(@/assets/backgound/bg_2.jpg)] bg-cover  bg-no-repeat
            relative flex items-center justify-center overflow-hidden'
            >

                <div className="overlay absolute inset-0 bg-black/30 "></div>
                <div className="particle-floating">
                </div>
                <div className="main-container space-y-12 relative z-10 text-center px-6 ">
                    <motion.div
                        className="title space-y-4 px-[10px]"
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                    >
                        <h1 className='mb-4 text-6xl md:text-8xl font-semibold text-white  tracking-wider'>
                            <span className='bg-gradient-to-r from-purple-300 via-pink-200 to-blue-300 bg-clip-text text-transparent'
                            >
                                NIM
                            </span>
                        </h1>
                        <p className='text-xl md:text-2xl  text-white/70 font-normal'>Trò chơi chiến thuật cổ điển</p>
                        <p className='text-xl md:text-2xl  text-white/70 font-light'>Trải nghiệm 3D</p>
                    </motion.div>
                    <motion.div
                        className="button-container space-y-6 max-w-md mx-auto"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                    >
                        <div className="button-game">
                            <motion.div
                                key={gameButtons.PVEButton.id}
                                className='relative'
                                variants={buttonVariants}
                                initial="initial"
                                whileHover="hover"
                                whileTap='tap'
                                onHoverStart={() => setHoveredButton(gameButtons.PVEButton.id)}
                                onHoverEnd={() => setHoveredButton(null)}
                            >
                                <Button
                                    className={
                                        `w-full h-16 font-medium  relative overflow-hidden
                                            bg-white/8 backdrop-blur-lg border text-lg hover:cursor-pointer
                                            ${hoveredButton === gameButtons.PVEButton.id ?
                                            `border-white/25 shadow-[0_0_25px_${gameButtons.PVEButton.glowColor}]`
                                            :
                                            "border-white/15 shadow-[0_0_15px_rgba(255,255,255,0.05)]"
                                        }
                                            transition-all duration-400 ease-out
                                            text-white/90 hover:text-white
                                            hover:bg-white/12
                                            
                                        `
                                    }
                                    onClick={() => {
                                        // console.log('check buttion')
                                        onSelectMode("PVE")
                                        setShowModalPVE()
                                    }}

                                >
                                    {/* Màu phủ lên trên button */}
                                    <motion.div
                                        className={`gradient-overlay inset-0 absolute bg-gradient-to-r ${gameButtons.PVEButton.spaceColor} opacity-60`}
                                        animate={
                                            hoveredButton === gameButtons.PVEButton.id ?
                                                { opacity: [0.2, 0.8, 0.2] }
                                                :
                                                { opacity: 0.6 }
                                        }
                                        transition={{
                                            duration: 1,
                                            repeat: hoveredButton === gameButtons.PVEButton.id ? Number.POSITIVE_INFINITY : 0,
                                            ease: "easeOut"
                                        }}
                                    >

                                    </motion.div>
                                    <div className="starfiled-effect absolute inset-0 overflow-hidden">
                                        <Startfield />
                                    </div>
                                    <div className="button-content relative z-10 flex items-center justify-center gap-[5px]">
                                        <motion.div
                                            animate={hoveredButton === gameButtons.PVEButton.id ? { rotate: 360 } : { rotate: 0 }}
                                            transition={{ duration: 0.6, ease: "easeOut" }}
                                        >
                                            <gameButtons.PVEButton.icon className='w-5 h-5 drop-shadow-sm' />
                                        </motion.div>
                                        <span className='drop-shadow-sm' >{gameButtons.PVEButton.text}</span>
                                    </div>
                                    <div className="gradient-color-backgound-button">
                                        <motion.div
                                            className=" absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent rounded-lg"
                                            initial={{ x: "-100%" }}
                                            animate={hoveredButton === gameButtons.PVEButton.id ? { x: "100%" } : { x: "-100%" }}
                                            transition={{ duration: 1.2, ease: "easeInOut" }}
                                        />
                                    </div>
                                </Button>
                            </motion.div>
                        </div>
                        <div className="button-game">
                            <motion.div
                                key={gameButtons.PVPButton.id}
                                className='relative'
                                variants={buttonVariants}
                                initial="initial"
                                whileHover="hover"
                                whileTap='tap'
                                onHoverStart={() => setHoveredButton(gameButtons.PVPButton.id)}
                                onHoverEnd={() => setHoveredButton(null)}
                            >
                                <Button
                                    className={
                                        `w-full h-16 font-medium  relative overflow-hidden
                                            bg-white/8 backdrop-blur-lg border text-lg hover:cursor-pointer
                                            ${hoveredButton === gameButtons.PVPButton.id ?
                                            `border-white/25 shadow-[0_0_25px_${gameButtons.PVPButton.glowColor}]`
                                            :
                                            "border-white/15 shadow-[0_0_15px_rgba(255,255,255,0.05)]"
                                        }
                                            transition-all duration-400 ease-out
                                            text-white/90 hover:text-white
                                            hover:bg-white/12
                                            
                                        `
                                    }
                                    onClick={() => {
                                        onSelectMode("PVP")
                                        setShowModalPVP()
                                    }}
                                >
                                    {/* Màu phủ lên trên button */}
                                    <motion.div
                                        className={`gradient-overlay inset-0 absolute bg-gradient-to-r ${gameButtons.PVPButton.spaceColor} opacity-60`}
                                        animate={
                                            hoveredButton === gameButtons.PVPButton.id ?
                                                { opacity: [0.2, 0.8, 0.2] }
                                                :
                                                { opacity: 0.6 }
                                        }
                                        transition={{
                                            duration: 1,
                                            repeat: hoveredButton === gameButtons.PVPButton.id ? Number.POSITIVE_INFINITY : 0,
                                            ease: "easeOut"
                                        }}
                                    >

                                    </motion.div>
                                    <div className="starfiled-effect absolute inset-0 overflow-hidden">
                                        <Startfield />
                                    </div>
                                    <div className="button-content relative z-10 flex items-center justify-center gap-[5px]">
                                        <motion.div
                                            animate={hoveredButton === gameButtons.PVPButton.id ? { rotate: 360 } : { rotate: 0 }}
                                            transition={{ duration: 0.6, ease: "easeOut" }}
                                        >
                                            <gameButtons.PVPButton.icon className='w-5 h-5 drop-shadow-sm' />
                                        </motion.div>
                                        <span className='drop-shadow-sm' >{gameButtons.PVPButton.text}</span>
                                    </div>
                                    <div className="gradient-color-backgound-button">
                                        <motion.div
                                            className=" absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent rounded-lg"
                                            initial={{ x: "-100%" }}
                                            animate={hoveredButton === gameButtons.PVPButton.id ? { x: "100%" } : { x: "-100%" }}
                                            transition={{ duration: 1.2, ease: "easeInOut" }}
                                        />
                                    </div>
                                </Button>
                            </motion.div>
                        </div>
                        <div className="button-game">
                            <motion.div
                                key={gameButtons.SavedGameButton.id}
                                className='relative'
                                variants={buttonVariants}
                                initial="initial"
                                whileHover="hover"
                                whileTap='tap'
                                onHoverStart={() => setHoveredButton(gameButtons.SavedGameButton.id)}
                                onHoverEnd={() => setHoveredButton(null)}
                            >
                                <Button
                                    className={
                                        `w-full h-16 font-medium  relative overflow-hidden
                                            bg-white/8 backdrop-blur-lg border text-lg hover:cursor-pointer
                                            ${hoveredButton === gameButtons.PVPButton.id ?
                                            `border-white/25 shadow-[0_0_25px_${gameButtons.SavedGameButton.glowColor}]`
                                            :
                                            "border-white/15 shadow-[0_0_15px_rgba(255,255,255,0.05)]"
                                        }
                                            transition-all duration-400 ease-out
                                            text-white/90 hover:text-white
                                            hover:bg-white/12
                                            
                                        `
                                    }
                                    onClick={() => { setShowSavedGame() }}
                                >
                                    {/* Màu phủ lên trên button */}
                                    <motion.div
                                        className={`gradient-overlay inset-0 absolute bg-gradient-to-r ${gameButtons.SavedGameButton.spaceColor} opacity-60`}
                                        animate={
                                            hoveredButton === gameButtons.SavedGameButton.id ?
                                                { opacity: [0.2, 0.8, 0.2] }
                                                :
                                                { opacity: 0.6 }
                                        }
                                        transition={{
                                            duration: 1,
                                            repeat: hoveredButton === gameButtons.SavedGameButton.id ? Number.POSITIVE_INFINITY : 0,
                                            ease: "easeOut"
                                        }}
                                    >

                                    </motion.div>
                                    <div className="starfiled-effect absolute inset-0 overflow-hidden">
                                        <Startfield />
                                    </div>
                                    <div className="button-content relative z-10 flex items-center justify-center gap-[5px]">
                                        <motion.div
                                            animate={hoveredButton === gameButtons.SavedGameButton.id ? { rotate: 360 } : { rotate: 0 }}
                                            transition={{ duration: 0.6, ease: "easeOut" }}
                                        >
                                            <gameButtons.SavedGameButton.icon className='w-5 h-5 drop-shadow-sm' />
                                        </motion.div>
                                        <span className='drop-shadow-sm' >{gameButtons.SavedGameButton.text}</span>
                                    </div>
                                    <div className="gradient-color-backgound-button">
                                        <motion.div
                                            className=" absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent rounded-lg"
                                            initial={{ x: "-100%" }}
                                            animate={hoveredButton === gameButtons.SavedGameButton.id ? { x: "100%" } : { x: "-100%" }}
                                            transition={{ duration: 1.2, ease: "easeInOut" }}
                                        />
                                    </div>
                                </Button>
                            </motion.div>
                        </div>


                    </motion.div>
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="text-white/80 text-sm text-center"
                    >
                        Chọn chế độ chơi để bắt đầu
                    </motion.p>
                </div>

            </div>
            <PVEGameSetting
                isOpen={isShowModalPveSetting}
                onClose={setCloseModalPVESetting}
                onStartGame={onStartGame}
                mode={mode}
                settings={settings}
                updatePVESettings={updatePVESettings}
            />
            <PVPGameSetting
                isOpen={isShowModalPVPSetting}
                onClose={setCloseModalPVPSetting}
                onStartGame={onStartGame}
                mode={mode}
                settings={settings}
                updatePVPSettings={updatePVPSettings}
            />
            <SavedGames
                isOpen={isShowModalSavedGame}
                onClose={setCloseModalSavedGame}
                onLoadGame={onLoadGame}
            />
        </>
    )
}

export default HomePage