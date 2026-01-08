import { Box, Card, CardContent, CardHeader, CardMedia, Checkbox, IconButton, Tooltip, Typography, useTheme } from "@mui/material"
import PushPinIcon from '@mui/icons-material/PushPin';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import ReplayIcon from '@mui/icons-material/Replay';
import { tokens } from "../theme";
import FileUploader from "./FileUploader";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import SettingsIcon from "@mui/icons-material/Settings";
import BadgeIcon from "@mui/icons-material/Badge";
// Removed unused 'useState' as file state is managed by parent


const CardItem = ({card,onChecked,onReplay,tabName,onPin,onFileUploaded, onFileDelete }) => { 

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    
    const isEstlamTab = tabName === "estlam";
    const isMaintainedTab = tabName === "maintained";
    const isFileUploaded = card.fileUrl;
    const isFile2Uploaded = card.file2Url;
    const isFile3Uploaded = card.file3Url;

    

    return (
        <Card className="cursor-pointer w-70 "
            sx={{ 
                backgroundColor: colors.primary[400],
                boxShadow: theme.shadows[4],
                "&:hover": {
                    boxShadow:  `${colors.blueAccent[700]} 0px 6px 15px` ,
                },
                borderRadius: "12px",
            }} 
        >
                <Box className="flex justify-between px-1">
                    <Box
                        sx={{
                            height: "40%",
                            display: "flex",
                            alignItems: "flex-end",
                            p: 1.5
                        }}
                        >
                        <Typography variant="h5" sx={{ color: colors.blueAccent[200], fontWeight: 700, lineHeight: 1.2 }}>
                            {card.company}
                        </Typography>
                    </Box>
                     <IconButton 
                        onClick={()=>onPin(card.id,tabName)}
                        className="z-2 "
                    
                        >
                            {card.pinned? <PushPinIcon 
                            sx={{
                                fontSize: 25,
                                color: theme.palette.mode === "dark"
                                ? colors.greenAccent[600]
                                : colors.greenAccent[400]
                            }}/>  
                            :<PushPinOutlinedIcon
                                sx={{fontSize: 25}}
                            />}
                        </IconButton>
            
                     </Box>
             {/* <CardHeader 
                title = {
                    <Typography sx={{ fontWeight: 700, fontSize: '1.3rem', color: colors.blueAccent[200] }}>
                       {card.company}
                    </Typography>
                }          
                action = {
                        
                    
                }
            /> */}
            <Box className=" overflow-hidden">
                <CardMedia className="h-30 w-full"
                component="img"
                image={card.img}
                alt="Device"
                sx={{
                    objectFit: "cover",          
                    borderTopLeftRadius: "12px",
                    borderTopRightRadius: "12px",
                    transition: "transform 0.4s ease-in-out",
                    "&:hover": {
                    transform: "scale(1.04)", 
                    
                    },
                }}
            />

             

            </Box>
            <CardContent 
            className="flex flex-col pb-1"
            // sx={{ display: "flex", justifyContent: "space-between", paddingBottom: 1.5 }}
            >
                <Box className="mb-3">
                    <Box className="flex items-center gap-1 mb-1">
                        <SettingsIcon sx={{ fontSize: 16, color: colors.blueAccent[300] }}  />
                        <Typography variant="body1" sx={{ color: colors.blueAccent[200]}} >
                            {card.model} 
                        </Typography>
                    </Box>
                    <Box className="flex items-center gap-1 mb-1">
                        <BadgeIcon sx={{ fontSize: 16, color: colors.blueAccent[300] }}/>
                        <Typography variant="caption" sx={{color: colors.grey[300] ,letterSpacing: "0.5px" }}>
                            SN: {card.sn} 
                        </Typography>
                    </Box>
                    <Box className="flex items-center gap-1 mb-1">
                        <CalendarTodayIcon sx={{ fontSize: 16, color: colors.blueAccent[300] }} />
                        <Typography variant="caption" sx={{ color: colors.grey[300], letterSpacing: "0.5px"}}> {/* Slightly reduced font size for date */}
                             {card.date} 
                        </Typography>
                    </Box>
                </Box>

                        
                

             <Box >
                <Typography variant="caption" className="uppercase !font-bold !mb-3" sx={{color:colors.grey[300],}}>
                    Documents
                </Typography>
               <Box className="flex">
                 <FileUploader
                    fileUrl={card.fileUrl}
                    fileName={card.fileName}
                    toolTipText={"المقايسة"}
                  
                    onFileUploaded={
                        isEstlamTab && !isFileUploaded
                            ? (url, name) => onFileUploaded(card.id, url, name, tabName)
                            : undefined
                    }
                    
                    onDelete={isEstlamTab && isFileUploaded ? () => onFileDelete(card.id,"estlam") : undefined}
                />
                {(isMaintainedTab || tabName === "done" || tabName === "amrTawreed")&& (
                    <FileUploader 
                        toolTipText={"الفاتورة"}
                        onFileUploaded={(url, name) => onFileUploaded(card.id, url, name, "maintained")}
                        fileUrl={card.file2Url}
                        fileName={card.file2Name}
                        onDelete={isMaintainedTab && isFile2Uploaded ? () => onFileDelete(card.id,"maintained") : undefined}
                />)}

                 {( tabName === "done" || tabName === "amrTawreed")&& (
                    <FileUploader 
                        onFileUploaded={(url, name) => onFileUploaded(card.id, url, name, "amrTawreed")}
                        toolTipText={"أمر التوريد"}
                        fileUrl={card.file3Url}
                        fileName={card.file3Name}
                        onDelete={tabName === "amrTawreed" && isFile3Uploaded ? () => onFileDelete(card.id,"amrTawreed") : undefined}
                />)}
               </Box>
                
                    
             </Box >
             {(tabName === "done" || tabName === "amrTawreed") && card.receivedBy && (
                        <Box className="mt-2 p-4 rounded-xl border-1 border-dashed"
                        sx={{ 
                            backgroundColor: theme.palette.mode === "dark"?colors.primary[400]:colors.grey[900],
                            borderColor: colors.grey[600]
                         }}> 
                            <Typography variant="body2" sx={{ color:theme.palette.mode === "dark"? colors.grey[200]:colors.grey[500] }}>
                                Received by: {card.receivedBy}
                            </Typography>
                            <Typography variant="body2" sx={{ color:theme.palette.mode === "dark"? colors.grey[200]:colors.grey[500] }}>
                                ID: {card.receivedByID}
                            </Typography>
                        </Box>
                )}


            </CardContent>
               <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", px: 2, pb: 1 }}>
                    {!card.checked && (
                        <Box className="flex items-center">
                            <Checkbox
                            defaultChecked={tabName === "done"}
                            onChange={onChecked}
                            // Checkbox is DISABLED if no file is uploaded (isFileUploaded is false)
                            disabled={ !isFileUploaded ||( isMaintainedTab && !isFile2Uploaded) || (tabName === "amrTawreed" && !isFile3Uploaded)} 
                            sx={{
                                '&.Mui-checked': {
                                color: colors.greenAccent[400],
                                },
                                fontSize: 30
                            }}
                        />

                        <Box className="">
                            {tabName === "done"?"COMPLETED":"PENDING"}
                        </Box>
                        </Box>
                    )}
                    <br />

                    {tabName !== "estlam" && tabName !== "done"  &&
                    <Tooltip title="Move Back">
                        <IconButton
                        onClick={onReplay}
                        sx={{
                            color: colors.grey[400],
                            "&:hover": { color: colors.blueAccent[500], transform: "rotate(-180deg)", transition: "0.3s" },
                        }}
                        >
                        <ReplayIcon sx={{ fontSize: 20 }} />
                        </IconButton>
                    </Tooltip>}

                    
                    </Box>

        </Card>
    )

}

export default CardItem;