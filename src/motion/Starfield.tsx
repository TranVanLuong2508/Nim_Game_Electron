import { motion } from "motion/react"

const Startfield = () => {
    return (
        <>
            {[...Array(4)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-white/40 rounded-full"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                    }}
                    animate={{
                        opacity: [0, 0.8, 0],
                        scale: [0, 1, 0],
                    }}
                    transition={{
                        duration: Math.random() * 3 + 2,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: Math.random() * 3,
                    }}
                />
            ))}
        </>
    )
}

export default Startfield