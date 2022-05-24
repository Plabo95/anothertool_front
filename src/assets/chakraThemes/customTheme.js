import { extendTheme } from '@chakra-ui/react'

const customTheme = extendTheme({
    colors: {
        blue: "#0258FF", //light blue
        darkblue: "#001234", //darkblue,
        orange: "#FF7C02", //orange
        lightgray: "#F0F0F0",

    },
    components: {
        Button: {
            variants: {
                'primary': {
                    bg: 'blue',
                    color: 'white',
                    _hover: {
                        bg: "#aabcdb",
                        color: "darkblue",
                    }
                },
                'primary-s': {
                    bg: 'blue',
                    color: 'white',
                    boxShadow: '4px 4px 4px rgba(2, 88, 255, 0.3)',
                    _hover: {
                        bg: "#aabcdb",
                        color: "darkblue",
                    }
                },
                'primary-out-s': {
                    bg: 'transparent',
                    color: 'blue',
                    border: '2px solid blue',
                    boxShadow: '4px 4px 4px rgba(2, 88, 255, 0.3)',
                    _hover: {
                        bg: "blue",
                        color: "white",
                        border: '2px solid transparent'
                    }
                },
                'primary-out': {
                    bg: 'transparent',
                    color: 'blue',
                    border: '2px solid blue',
                    _hover: {
                        bg: "blue",
                        color: "white",
                        border: '2px solid transparent'
                    }
                },
            }
        },
    }
})

export default customTheme;