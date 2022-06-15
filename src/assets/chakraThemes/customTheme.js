import { extendTheme } from '@chakra-ui/react'

const customTheme = extendTheme({
    shadows: { outline: 'none' },
    colors: {
        blue: "#0258FF", //light blue
        darkblue: "#001234", //darkblue,
        orange: "#FF7C02", //orange
        lightgray: "#F0F0F0",

    },
    components: {
        Heading: {
            variants: {
                'h1' :{
                    fontFamily: 'Poppins',
                    fontWeight: '700',
                    fontSize: '60px',
                },
                'h2' :{
                    fontFamily: 'Poppins',
                    fontWeight: '600',
                    fontSize: '35px',
                }
            }
        },
        Text: {
            variants: {
                'parrafo': {
                    fontFamily: 'Poppins',
                fontStyle: 'normal',
                fontWeight: '400',
                fontSize: '25px',
                }
            }
        },
        Button: {
            variants: {
                'primary': {
                    bg: '#0258FF',
                    color: 'white',
                    fontFamily: 'Poppins',
                    fontWeight: '400',
                    _hover: {
                        // bg: "#aabcdb",
                        // color: "#001234",
                        bg: "#749FF2",
                    }
                },
                'primary-s': {
                    bg: '#0258FF',
                    color: 'white',
                    boxShadow: '4px 4px 4px rgba(2, 88, 255, 0.3)',
                    fontFamily: 'Poppins',
                    fontWeight: '400',
                    _hover: {
                        // bg: "#aabcdb",
                        // color: "#001234",
                        bg: "#749FF2",
                    }
                },
                'primary-out-s': {
                    bg: 'transparent',
                    color: '#0258FF',
                    border: '2px solid #0258FF',
                    boxShadow: '4px 4px 4px rgba(2, 88, 255, 0.3)',
                    fontFamily: 'Poppins',
                    //fontStyle: 'normal',
                    fontWeight: '400',
                    //fontSize: '15px',
                    _hover: {
                        bg: "#0258FF",
                        color: "white",
                        border: '2px solid transparent'
                    }
                },
                'primary-out': {
                    bg: 'transparent',
                    color: '#0258FF',
                    border: '2px solid #0258FF',
                    fontFamily: 'Poppins',
                    fontWeight: '400',
                    _hover: {
                        bg: "#0258FF",
                        color: "white",
                        border: '2px solid transparent'
                    }
                },
                'danger': {
                    bg: 'red',
                    color: 'white',
                    border: 'none',
                    fontFamily: 'Poppins',
                    fontWeight: '400',
                    _hover: {
                        bg: "#FFF5F5",
                        color: "red",
                        border: 'none'
                    }
                },
                'danger-ghost': {
                    bg: 'transparent',
                    color: 'red',
                    border: 'none',
                    fontFamily: 'Poppins',
                    fontWeight: '800',
                    _hover: {
                        bg: "#FFF5F5",
                        border: 'none'
                    }
                },
                'outline': {
                    bg: 'transparent',
                    color: '#001234',
                    border: '1px',
                    borderColor: '#001234',
                    fontFamily: 'Poppins',
                    fontWeight: '500',
                    _hover: {
                        bg: "#F0F0F0",
                        borderColor: '#F0F0F0'
                    }
                },
            }
        },
    }
})

export default customTheme;