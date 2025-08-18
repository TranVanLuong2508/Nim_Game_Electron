import type { Variants } from "framer-motion";

const buttonVariants: Variants = {
    initial: {
        scale: 1,
        rotateX: 0,
        rotateY: 0,
    },
    hover: {
        scale: 1.03,
        rotateX: 2,
        rotateY: 2,
        transition: {
            type: "spring", //animation theo kiểu lò xo
            stiffness: 300, //độ cứng của lo xo
            damping: 20, //giảm sốc
        },
    },
    tap: {
        scale: 0.97,
        transition: {
            type: "spring",
            stiffness: 400,
            damping: 25,
        },
    },
}
export default buttonVariants