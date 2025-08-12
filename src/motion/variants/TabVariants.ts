import type { Variants } from "framer-motion";
const tabVariants: Variants = {
    inactive: {
        backgroundColor: "rgba(255, 255, 255, 0.05)",
        color: "rgba(255, 255, 255, 0.6)",
        transition: {
            duration: 0.2,
            ease: "easeInOut",
        },
        boxShadow: "0px 0px 0px rgba(0,0,0,0)"
    },
    active: {
        backgroundColor: "rgba(255, 255, 255, 0.15)",
        color: "rgba(255, 255, 255, 0.9)",
        transition: {
            duration: 0.2,
            ease: "easeInOut",
        },
        boxShadow: "0 4px 12px rgba(255, 255, 255, 0.1)",
    },
}

export default tabVariants