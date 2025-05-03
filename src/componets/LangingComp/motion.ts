// Animation variants
export const logoVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { type: 'spring', stiffness: 100, damping: 20 }
    }
};

export const listVariants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.15, delayChildren: 0.3 }
    }
};

export const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { type: 'spring', stiffness: 80, damping: 12 }
    }
};


export const mobileMenuVariants = {
    hidden: {  x: '100%' },
    visible: {
        opacity: 1,
        x: 0,
        transition: { type: 'tween', ease: 'easeOut', duration: 0.4 }
    },
};


export const menuIconVariants = {
    open: {
        rotate: 90,
        transition: { type: 'spring', stiffness: 300 }
    },
    closed: {
        rotate: 0,
        transition: { type: 'spring', stiffness: 300 }
    }
};

export const buttonVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: (i: number) => ({
        opacity: 1,
        x: 0,
        transition: {
            delay: 1 + i * 0.1,
            type: 'spring',
            stiffness: 50,
            damping: 10,
        }
    }),
};

export const containerVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.3,
        },
    },
};

export const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: "easeOut",
            delay: 1.1,
        },
    },
};

export const imageVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 1,
            ease: "easeOut",
            delay: 1.3,
        },

    },
};


