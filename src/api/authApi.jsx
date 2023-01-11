import axios from "axios";

const authApi = axios.create({
    baseURL: 'http://dev.loteriasconfortuna.aratech.org:3000/api/auth'
})

export const login = async(credentials) => {
    const response =  await authApi.post('/login', credentials);
    return response.data
}


const handleSubmit = async(values) => {
    setLoadingCreate(true)
        const userToRegister ={
                'email': values.email,
                'username': values.username,
                'password': values.password,
                'password2': values.password2,
        }
    const response = await fetch(base_url+'register',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userToRegister)
        })
    console.log('Respuesta: ',response)
    if (response.ok){
        toast({
        title: 'Registro exitoso',
        status: 'success',
        duration: 6000,
        isClosable: true,
        })
        setLoadingCreate(false) 
        setRegistered(true)
        //navigate('/login')
        }
    else{
        toast({
            title: 'Error al guardar ',
            description: "Código de error "+ response.statusText +' intentalo mas tarde' ,
            status: 'error',
            duration: 6000,
            isClosable: true,
            })
        setLoadingCreate(false)
        setRegistered(false)
    }
}