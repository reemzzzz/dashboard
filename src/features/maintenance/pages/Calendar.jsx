import { useContext, useEffect, useState, useRef } from "react"; // ⬅️ IMPORT useRef
import FullCalendar from "@fullcalendar/react"
import { formatDate } from "@fullcalendar/core"
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from "@fullcalendar/interaction" 
import {
    Box,
    Dialog,
    DialogTitle,
    DialogActions,
    DialogContent,
    TextField,
    Button,
    useTheme,
} from "@mui/material";
import CalendarVisits from "../../../components/Visits";
import { tokens } from "../../../theme";



const Calendar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const calendarRef = useRef(null); 

    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false); 
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    
    const [currentEvents, setCurrentEvents] = useState(() => {
        const saved = localStorage.getItem("calendarEvents");
        return saved ? JSON.parse(saved) : [];
    });
    
    const [selectedEvent, setSelectedEvent] = useState(null); 
    const [selectedDate, setSelectedDate] = useState(null); 
    const [visitTitle, setVisitTitle] = useState(''); 
    // const { user } = useContext(UserContext) 
    
    const nameArray = "Reem"
    // const engName = user? nameArray[0]: "";

    useEffect(() => {
        localStorage.setItem("calendarEvents", JSON.stringify(currentEvents));
    }, [currentEvents]);


    useEffect(() => { //update columns sizes according to the sidebar state (collapsed or not)
        const calendarEl = calendarRef.current?.getApi().el.parentElement;
        
        if (!calendarEl) return;
        
        const resizeObserver = new ResizeObserver(() => {
            calendarRef.current?.getApi().updateSize();
        });
        resizeObserver.observe(calendarEl);
        return () => {
            resizeObserver.unobserve(calendarEl);
        };
    }, []); 

    
    const handleDateClick = (selected) => {
        setSelectedDate(selected);
        setIsAddDialogOpen(true); 
        selected.view.calendar.unselect(); 
    };

    // 3. Form Submission Handler: Creates the new event
    const handleVisitSubmit = (e) => {
        e.preventDefault(); 
        
        if (visitTitle && selectedDate) {
            const newEvent = {
                id: `${selectedDate.dateStr}-${visitTitle}-${Date.now()}`, 
                title: visitTitle,
                start: selectedDate.startStr,
                end: selectedDate.endStr,
                allDay: selectedDate.allDay
            };

            setCurrentEvents(prevEvents => [...prevEvents, newEvent]);
        }
        
        // Cleanup and close
        setVisitTitle('');
        setSelectedDate(null);
        setIsAddDialogOpen(false);
    };

    // 4. Event Click Handler: Opens the Delete Dialog
    const handleEventClick = (selected) => {
        setSelectedEvent(selected.event);
        setIsDeleteDialogOpen(true); 
    };
    

    return (
        <Box className="mx-7 mb-1 " >
            {/* <Header title={"CALENDAR"} subtitle={`Eng. ${engName}'s Service Visits Calendar`}/> */}
            <Box className ="flex ">
                <CalendarVisits currentEvents={currentEvents} />
                <Box className=" ml-7 grow-2 cursor-pointer">
                    <FullCalendar 
                        ref={calendarRef} 
                        height = "75vh"
                        plugins = {[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
                        headerToolbar={{
                            left: "prev,next today",
                            center: "title",
                            right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth"
                        }}
                        initialView="dayGridMonth"
                        editable={true}
                        selectable={true}
                        selectMirror={true}
                        dayMaxEvents={true}
                        select={handleDateClick} 
                        eventClick={handleEventClick} 
                        events={currentEvents}
                    />
                </Box>
            </Box>

            {selectedEvent && (
                <Dialog 
                    open={isDeleteDialogOpen} 
                    onClose={() => setIsDeleteDialogOpen(false)} 
                    aria-labelledby="delete-dialog-title"
                    PaperProps={{ sx: { backgroundColor: colors.primary[400], borderRadius: '8px' }}}
                >
                    <DialogTitle id="delete-dialog-title" sx={{ color: colors.grey[100], fontWeight: 'bold' }}>
                        {`Are you sure you want to delete the event '${selectedEvent.title}'?`}
                    </DialogTitle>
                    <DialogContent></DialogContent>
                    <DialogActions>
                        <Button 
                            onClick={() => setIsDeleteDialogOpen(false)}
                            sx={{ color: colors.blueAccent[300], '&:hover': { backgroundColor: colors.blueAccent[900] }}}
                        >
                            Cancel
                        </Button>
                        <Button 
                            onClick={() => {
                                setCurrentEvents(prevEvents => prevEvents.filter(event => event.id !== selectedEvent.id));
                                setIsDeleteDialogOpen(false);
                                setSelectedEvent(null);
                            }}
                            variant="contained" 
                            sx={{ 
                                backgroundColor: colors.redAccent[600], color: colors.grey[100], 
                                '&:hover': { backgroundColor: colors.redAccent[700] }
                            }}
                        >
                            Yes, Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            )}

            {/* 2. ADD Visit Dialog (Controlled by selectedDate and isAddDialogOpen) */}
            {selectedDate && (
                <Dialog 
                    open={isAddDialogOpen} 
                    onClose={() => setIsAddDialogOpen(false)} 
                    aria-labelledby="implement-dialog-title"
                    PaperProps={{ sx: { backgroundColor: colors.primary[400], borderRadius: '8px' }}}
                >
                    <DialogTitle id="implement-dialog-title" sx={{ color: colors.grey[100], fontWeight: 'bold' }}>
                        {`Add Visit on ${formatDate(selectedDate.startStr, { month: 'long', day: 'numeric', year: 'numeric' })}`}
                    </DialogTitle>

                    <DialogContent>
                        <form onSubmit={handleVisitSubmit} id="visit-form"> 
                            <TextField
                                autoFocus
                                required
                                margin="dense"
                                id="visit-title"
                                name="title"
                                label="Visit Location/Client Name" 
                                type="text"
                                fullWidth
                                variant="standard"
                                value={visitTitle} 
                                onChange={(e) => setVisitTitle(e.target.value)} 
                                sx={{ input: { color: colors.grey[100] }, label: { color: colors.grey[300] } }} 
                            />
                        </form>
                    </DialogContent>

                    <DialogActions>
                        <Button 
                            onClick={() => {setIsAddDialogOpen(false); setVisitTitle(''); setSelectedDate(null);}} 
                            sx={{ color: colors.blueAccent[300], '&:hover': { backgroundColor: colors.blueAccent[900] }}}
                        >
                            Cancel
                        </Button>
                        <Button 
                            type="submit" 
                            form="visit-form"
                            variant="contained" 
                            sx={{
                                backgroundColor: colors.blueAccent[600], color: colors.grey[100], 
                                '&:hover': { backgroundColor: colors.blueAccent[700] }
                            }}
                        >
                            Add Visit
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
            
        </Box>
    );
};
 
export default Calendar;