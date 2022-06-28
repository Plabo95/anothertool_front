import React, { useEffect, useState, useMemo, useContext } from 'react'
import moment from 'moment';
import PropTypes from 'prop-types'
import { Calendar, Views, DateLocalizer } from 'react-big-calendar'
import Toolbar from "react-big-calendar/lib/Toolbar";
import Nextsidebar from '../components/Nextsidebar'
import {Drawer, DrawerOverlay,DrawerContent, useDisclosure, Box, DrawerBody} from '@chakra-ui/react'
import { Flex, Button} from '@chakra-ui/react'
import EventForm from '../forms/EventForm'

//Api
import useApi from '../hooks/useApi';
import eventsApi from '../api/eventsApi';
import servicesApi from '../api/servicesApi';
import clientsApi from '../api/clientsApi';
import AuthContext from '../auth/AuthContext';

export default function CalendarComp({localizer}) {

  const {user, authTokens} = useContext(AuthContext)

  //fetch events when page Loads
  const[creating, setCreating] = useState(false)
  const {isOpen, onOpen, onClose } = useDisclosure()
  const titleInput = React.useRef()
  
  const [bcView, setBCView] = useState('week');
  const [yourDate, setYourDate] = useState();
 
  const getEventsApi = useApi(eventsApi.getAllEvents);
  const getServicesApi = useApi(servicesApi.getAllServices);
  const getClientsApi = useApi(clientsApi.getAllClients);
  const getNextEventsApi = useApi(eventsApi.getNextEvents);
 
  const [event, setEvent] = useState()  //event selected
  const [myEvents, setEvents] = useState([])
  const [nextEvents, setNextEvents] = useState([])
  const[services, setServices] = useState([])
  const[clients, setClients] = useState([])

  const updateEvents = async () => {
    const {data, error} = await getEventsApi.request(user,authTokens);
    error? console.log('Error fetching events...', error) 
        : setEvents(data)
  }

  const updateNextEvents = async () => {
    const {data, error} = await getNextEventsApi.request(user,authTokens);
    error? console.log('Error fetching...', error) 
        : setNextEvents(data)
  }

  const updateClients = async () => {
      const {data, error} = await getClientsApi.request(user,authTokens);
      error? console.log('Error fetching clients...', error) 
          : setClients(data)
  }
  const updateServices = async () => {
      const {data, error} = await getServicesApi.request(user,authTokens);
      error? console.log('Error fetching services...', error) 
          : setServices(data)
  }

  const events = myEvents.map((event)=>{
    return {
      id: event.id,
      service: event.service,
      client: event.client,
      start: new Date(event.start),
      end: new Date(event.end),
      allDay: false,
      name : event.service_name + ' para ' + event.client_name,
      color: event.service_color,
    }
  })

  function handleNavigate(date) {
    setYourDate(moment(date).toDate())
  }

  //Manage del selection timeframe
  const handleSelectSlot = ({ start, end })=>{
    if(bcView==='month'){
      handleNavigate(start)
      setBCView('day')
    }
    else{
      if(creating){
        myEvents.pop()
      } 
      onOpen()
      setCreating(true)
      const newevent = {
        'start': (start),
        'end': (end),
      }
      setEvents((myEvents) => [...myEvents, newevent])    
      setEvent(newevent)    
    }
  }
    

  const handleSelectEvent = async (e) => {
    //console.log(e)
    //Si estaba creando un evento, lo borro de la lista cacheada
    if(creating) myEvents.pop()
    onOpen()
    setCreating(false)
    setEvent(myEvents.filter(item => item.id===e.id)[0])     //Elijo posicion 0 porque sino me guarda un array
  }

  const { defaultDate, views } = useMemo(() => ({
    defaultDate: new Date(),
    views: [Views.MONTH, Views.DAY, Views.WEEK, Views.AGENDA],
  }),[])

  function handleClose(){
    if(creating){
      myEvents.pop()
    }
    setCreating(false)
    setEvent()
    onClose()  
  }

  //Calendar event name display props
  function handleEventName(e){
    return(e.name)
  }
  //Formatting the date
  let formats = {
    timeGutterFormat: 'HH:mm',
    eventTimeRangeFormat: ({
        start,
        end
      }, culture, local) =>
      local.format(start, 'HH:mm', culture) + '-' +
      local.format(end, 'HH:mm', culture),
    dayFormat: 'dddd',
    weekdayFormat: 'dddd'
  }
  function eventPropGetter(event, start, end, isSelected) {
    const backgroundColor = event.color
    const style = {
        backgroundColor: backgroundColor,
        borderRadius: '8px',
        opacity: 0.7,
        color: 'black',
        border: '2px',
        display: 'block'
    }
    return {
        style: style
    }
  }

  useEffect(() => {
    updateEvents() 
    updateServices()
    updateClients()
    updateNextEvents() 
  },[])


  return (
    <>
    <Flex w="100%" p="5" m='5' gap={6}>
      <Flex flexDirection='column'>
        <Box>
          <Button variant='primary-s' onClick={()=>{handleSelectSlot({start:'',end:''})}}>+ Añadir cita</Button>
        </Box>
        <Nextsidebar nextEvents={nextEvents} events={myEvents} setEvents={setEvents} updateEvents={updateEvents} 
          updateNextEvents={updateNextEvents}/>  
      </Flex>  
      <Calendar
      dayLayoutAlgorithm={'no-overlap'} //algoritmo no overlappin
      defaultDate={defaultDate}
      defaultView = {Views.WEEK}
      events={events}
      view={bcView}
      onView={setBCView}
      localizer={localizer}
      showMultiDayTimes
      views={views}
      formats = {formats}
      titleAccessor = {handleEventName}
      onSelectEvent={handleSelectEvent}
      onSelectSlot={handleSelectSlot}
      eventPropGetter={eventPropGetter}
      date={yourDate}
      onNavigate={handleNavigate}
      selectable
      min= {new Date(1972, 0, 1, 8, 0, 0)}
      max= {new Date(2022, 10, 0, 22, 0, 0)}
      step={15}
      timeslots={4}
      style={{ height: 800,width: '100%' }}
      messages={{
        next: ">>",
        previous: "<<",
        today: "Hoy",
        month: "Mes",
        week: "Semana",
        day: "Día"
      }}
      components={{
        toolbar: CustomToolbar,
      }}
      />
      </Flex>
      <Drawer placement='right' onClose={handleClose} initialFocusRef={titleInput} isOpen={isOpen} size='md'>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerBody>
            <Box>
            <EventForm onClose={onClose} handleClose={handleClose} is_creating={creating} event={event} events={myEvents} 
            servicelist={services} clientlist={clients} 
            setEvents={setEvents} updateEvents={updateEvents} updateNextEvents={updateNextEvents}/>
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>    
      </>
    )
}

CalendarComp.propTypes = {
  localizer: PropTypes.instanceOf(DateLocalizer),
}

const CustomToolbar = (toolbar) => {

  const capitalizarPrimeraLetra = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const goToBack = () => {
    //toolbar.date.setMonth(toolbar.date.getMonth() - 1);
    toolbar.onNavigate('PREV');
  };

  const goToNext = () => {
    //toolbar.date.setMonth(toolbar.date.getMonth() + 1);
    toolbar.onNavigate('NEXT');
  };

  const goToCurrent = () => {
    const now = new Date();
    toolbar.date.setMonth(now.getMonth());
    toolbar.date.setYear(now.getFullYear());
    toolbar.onNavigate('TODAY');
  };

  const label = () => {
    const date = moment(toolbar.date);
    return (
      <span><b>{date.format('MMMM')}</b><span> {date.format('YYYY')}</span></span>
    );
  };

  const goToDayView = () => {
    toolbar.onView("day");
    // toolbar.setViewState("day");
    active('.btn-dia');
  };
  const goToWeekView = () => {
    toolbar.onView("week");
    // toolbar.setViewState("week");
    active('.btn-semana');
  };
  const goToMonthView = () => {
    toolbar.onView("month");
    // toolbar.setViewState("month");
    active('.btn-mes');
  };
  const goToAgendaView = () => {
    toolbar.onView("agenda");
    // toolbar.setViewState("agenda");
    active('.btn-agenda');
  };

  const active = (clase) => {
    document.querySelector(".btn-select-view .active").classList.remove("active");
    document.querySelector(clase).classList.add("active");
  }

  return (
      <Box pb='35px'>
        <div className='rbc-toolbar'>
          <span className="rbc-btn-group toolbar-left">
            <Flex>
              <span className="cursor" onClick={goToBack}>&lt;</span>
              <Flex align='center' className="rbc-toolbar-label"><p>{capitalizarPrimeraLetra(toolbar.label)}</p></Flex>
              <span className="cursor" onClick={goToNext}>&gt;</span>
            </Flex>
          </span>
          <button type="button" className="btn-hoy" onClick={goToCurrent}>Hoy</button>
          <span className="rbc-btn-group btn-select-view">
            <button type="button" className="btn-mes" onClick={goToMonthView}>Mes</button>
            <button type="button" className="btn-semana active" onClick={goToWeekView}>Semana</button>
            <button type="button" className="btn-dia" onClick={goToDayView}>Día</button>
            <button type="button" className="btn-agenda" onClick={goToAgendaView}>Agenda</button>
          </span>
        </div>
      </Box>
  );
};