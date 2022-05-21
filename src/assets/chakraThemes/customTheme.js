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
                'primary-md': {
                    bg: '#0258FF',
                    color: 'white',
                    size: 'md',
                    _hover: {
                        bg: "#aabcdb",
                        color: "#001234",
                    }
                },
            }
        }
    }
})

export default customTheme;