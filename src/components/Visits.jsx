import { List, ListItem, ListItemText, Typography, useTheme } from "@mui/material"
import { Box } from "@mui/system"
import { tokens } from "../theme";
import { formatDate } from "@fullcalendar/core"





const CalendarVisits = ({currentEvents}) => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    return (
       
         <Box 
            className="flex flex-col p-5 rounded-xl overflow-y-auto max-h-dvh min-w-3xs"
            backgroundColor = {colors.primary[400]}
         >
             <Typography
                className="!text-2xl !font-light"
             >
                 Visits
             </Typography>
             <List>
                 {currentEvents.map((event)=>(
                     <ListItem 
                     key={event.id} 
                     className="rounded-md my-3"
                     sx={{backgroundColor: colors.greenAccent[600],
                     }}>
                         <ListItemText
                            primary={
                             <Typography 
                             className="!font-semibold !text-lg"
                             >
                                 {event.title}
                             </Typography>}
                             secondary={
                                 <Typography className="!text-sm">
                                    
                                 {formatDate(event.start, {
                                     year: "numeric",
                                     month: "short",
                                     day: "numeric",
                                 })}
                                 </Typography>
                             }
                         />
                             
                         
                     </ListItem>
                 ))}
             </List>
         </Box>
         )
    
}
export default CalendarVisits;