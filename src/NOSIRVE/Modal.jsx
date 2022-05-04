<Button colorScheme='orange' type="button" onClick={onCreateclientPopup}>Crear</Button>
<TableContainer mt='5' borderRadius='lg'>
<Table variant='striped' colorScheme='gray' size='md'>
    <Thead bg='#E9E9E9'>
        <Tr>
        <Th>Id</Th>
        <Th>Name</Th>
        <Th>Car</Th>
        <Th>Phone</Th>
        <Th></Th>
        </Tr>
    </Thead>
    <Tbody>
        {clients.map(client=>
            <Tr key={client.id}>
                <Td>{client.id}</Td>
                <Td>{client.name}</Td>
                <Td>{client.car}</Td>
                <Td>{client.telf}</Td>
                <Td>
                    <Button variant='ghost' type="button" onClick={() => onEditClientPopup(client)} >Edit</Button> 
                    <Button colorScheme='red' size='xs' type="button" onClick={() => deleteClient(client.id)}>X</Button>
                </Td>    
            </Tr>
        )}
    </Tbody>
</Table>
</TableContainer>


const events = myEvents.map((event)=>{
    return {
      id: event.id,
      service: event.service.name,
      start: new Date(event.date_in),
      end: new Date(event.date_out),
      allDay: false,
      resource: event.service   //Editar esto?
      }
      })


import Moment from 'moment';
import React, {useState} from 'react'

function Modal({open, onClose, onCancel, event, services, events}){
    const [myEvents, setEvents] = useState(events)
    //console.log(events)
    const [selectedOption, setSelectedOption] = useState()  //Variable de stado para almacenar el select
    const [openModal, setOpenModal] = useState(open)

    const createDate = async () => {
        const eventToCreate ={
                'date_in': event.date_in,
                'date_out': event.date_out,
                'service': selectedOption
            }
        console.log( 'tocreate: ', eventToCreate)
        fetch('http://127.0.0.1:8000/api/createdate',{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(eventToCreate)
          })
        .then(
            setEvents((prev) => [...prev, eventToCreate]) 
        )  
        .then(
            onClose()  
        )
    }

    if(!open) return null
    return(
        <div className="overlay" style={styles.wrapper}>
            <div className="modalContainer" style={styles.window}>
            <div className="modalRight">
                <p onClick={onCancel} className="closeBtn">X</p>
                <div className="content">
                    <ul className="list unstyled-list">
                        <li>
                            <select value="none" onChange={e => setSelectedOption(e.target.value)} >
                                <option value="none" selected disabled hidden>Service</option>
                                {services.map(service=>
                                    <option key={service.id} value={service.id}> {service.name} </option>
                                )}
                            </select>
                        </li>
                        {/* Paso el service.id como value porque es el Primary Key */}
                        <hr />
                        <li>
                            <h4>Date Range</h4>
                            <h6> Date in: {Moment(event.date_in).format("DD/MM/YYYY hh:mm")} </h6>
                            <h6> Date out: {Moment(event.date_out).format("DD/MM/YYYY hh:mm")}</h6>
                            <p>SERVICE {event.service}</p>
                        </li>
                    </ul>
                    <br />
                    <div className="row">
                        <div className="col-3">
                            <button className="btn btn-primary" onClick={createDate} >Create </button>
                        </div>
                        <div className="col-3">
                            <button className="btn btn-danger" onClick={onCancel} >Cancel</button>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>      
    )

}

export default Modal;

const styles = {
    wrapper: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    window: {
        position: 'relative',
        background: 'white',
        borderRadius: 5,
        padding: 15,
        boxShadow: '2px 2px 10px rgba(0,0,0,0.3)',
        zIndex: 10,
        minWidth: 320,
    }
}