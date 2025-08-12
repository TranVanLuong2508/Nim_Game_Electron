import type { Variants } from "framer-motion";

const modalVariants: Variants = {
    hidden: {
        opacity: 0,
        scale: 0.8,
        y: 50,
    },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 300,
            damping: 25,
        },
    },
    exit: {
        opacity: 0,
        scale: 0.8,
        y: 50,
        transition: {
            duration: 0.2,
        },
    },
}
export default modalVariants