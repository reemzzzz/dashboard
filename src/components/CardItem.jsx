import { Box, Card, CardContent, CardHeader, CardMedia, Checkbox, IconButton, Tooltip, Typography, useTheme } from "@mui/material"
import PushPinIcon from '@mui/icons-material/PushPin';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import ReplayIcon from '@mui/icons-material/Replay';
import { tokens } from "../theme";
import FileUploader from "./FileUploader";
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
        <Card 
            sx={{ 
                width: 250,
                backgroundColor: theme.palette.mode === "dark"
                ? colors.primary[500]
                : colors.primary[400] ,
                boxShadow: theme.shadows[4],
                "&:hover": {
                    boxShadow:  `${colors.blueAccent[800]} 0px 5px 15px` ,
                },
                borderRadius: "12px",
            }} 
            className="cursor-pointer"
        >
             <CardHeader 
                title = {
                    <Typography sx={{ fontWeight: 700, fontSize: '1.3rem', color: colors.blueAccent[200] }}>
                       {card.company}
                    </Typography>
                }          
                action = {
                        <IconButton onClick={()=>onPin(card.id,tabName)}>
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
                        
                    
                }
            />
            <CardMedia
                component="img"
                image={card.img}
                alt="Device"
                sx={{
                    height: 180,
                    width: "100%",
                    objectFit: "cover",          
                    borderTopLeftRadius: "12px",
                    borderTopRightRadius: "12px",
                    transition: "transform 0.3s ease-in-out",
                    "&:hover": {
                    transform: "scale(1.03)", 
                    },
                }}
            />
            {/* --- ENHANCED CARD CONTENT START --- */}
            <CardContent sx={{ display: "flex", justifyContent: "space-between", paddingBottom: 1.5 }}>
                <Box sx={{ textAlign: "left" }}>
                    <Typography variant="h6" sx={{ color: colors.blueAccent[200], fontWeight: 700, marginBottom: "4px" }} >
                        Model: {card.model} {/* Bolded 'Model:' */}
                    </Typography>
                    <Typography variant="body1" sx={{color: colors.grey[400] ,fontWeight: 600, marginBottom: "4px" }}>
                        SN: {card.sn} {/* Bolded 'SN:' and slightly increased font weight */}
                    </Typography>
                    <Typography variant="body2" sx={{ color: colors.grey[500], fontSize: "0.85rem" }}> {/* Slightly reduced font size for date */}
                        Date: {card.date} {/* Added 'Date:' label and bolded */}
                    </Typography>
                </Box>
                        
                <FileUploader
                    fileUrl={card.fileUrl}
                    fileName={card.fileName}
                    toolTipText={"المقايسة"}
                    // Pass upload handler only if on Estlam and no file uploaded
                    onFileUploaded={
                        isEstlamTab && !isFileUploaded
                            ? (url, name) => onFileUploaded(card.id, url, name, tabName)
                            : undefined
                    }
                    // Pass delete handler only if on Estlam AND file is present
                    onDelete={isEstlamTab && isFileUploaded ? () => onFileDelete(card.id,"estlam") : undefined}
                />

             <Box>
                 {/* This FileUploader remains unchanged */}
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
                
                {/* Minor styling improvement for done tab text */}
                    {(tabName === "done" || tabName === "amrTawreed") && card.receivedBy && (
                        <Box sx={{ mt: 1 }}> {/* Added margin top for separation */}
                            <Typography variant="body2" sx={{ color: colors.grey[500] }}>
                                Received by: {card.receivedBy}
                            </Typography>
                            <Typography variant="body2" sx={{ color: colors.grey[500] }}>
                                ID: {card.receivedByID}
                            </Typography>
                        </Box>
                        )}
             </Box>


            </CardContent>
            {/* --- ENHANCED CARD CONTENT END --- */}
               <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", px: 2, pb: 1 }}>
                    {!card.checked && (
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
                    )}

                    {tabName !== "estlam" && tabName !== "done" && tabName !=="amrTawreed" &&
                    <Tooltip title="Move Back">
                        <IconButton
                        onClick={onReplay}
                        sx={{
                            color: colors.grey[400],
                            "&:hover": { color: colors.blueAccent[400], transform: "rotate(-180deg)", transition: "0.3s" },
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