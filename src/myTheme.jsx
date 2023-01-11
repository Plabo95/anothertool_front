import { extendTheme } from "@chakra-ui/react"

// 2. Call `extendTheme` and pass your custom values
export const myTheme = extendTheme({
    
    components: {
        Button:{
            variants: {
                'white':{
                    bg: 'white',
                    color: 'blue',
                    rounded: 'md',
                    px:'1.5em',
                    _hover:{
                        bg:'blue',
                        color: 'white',
                    }
                },
                'blue':{
                    bg: 'blue',
                    color: 'white',
                    rounded: 'md',
                    px:'1.5em',
                    border: 'solid 2px #5292DE',
                    _hover:{
                        bg:'white',
                        color: 'blue',
                    }
                },
                'darkblue':{
                    bg: 'darkblue',
                    color: 'white',
                    rounded: 'md',
                    px:'1.5em',
                    border: 'solid 2px #1C1654',
                    _hover:{
                        bg:'white',
                        color: 'darkblue',
                    }
                },
            }
        }
    },

    colors: {
        brand:{
            100:'#5292DE',
            500:'#1C1654',
            900:'#5292DE',
        },
        blue: '#5292DE',
        darkblue: '#1C1654' ,
        lightblue: '#E5E7FC',
        grey: '#F2EEEE'
    },

    fonts: {
        heading:  '"Roboto", sans-serif',
        body:  '"Roboto", sans-serif',
    },

    styles: {
        global: {
            body: {
                color: '#3C3C46',
                fontSize: '16px',
                fontWeight: '500',
            },
            h1: {
                color: 'blue',
                fontSize: '52px',
                fontWeight: '500',
            },
            h2: {
                color: 'white',
                fontSize: '32px',
                fontWeight: '500',
            },
            h3: {
                color: 'white',
                fontSize: '18px',
                fontWeight: '600',
            }
        }
    }
    

})