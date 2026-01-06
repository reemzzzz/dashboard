import { Box, IconButton, Modal, Tooltip, tooltipClasses, useTheme } from "@mui/material";
import { useRef, useState, useEffect } from "react";
import { tokens } from "../theme";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { Viewer , Worker  } from "@react-pdf-viewer/core"; // Worker added for the viewer
import '@react-pdf-viewer/core/lib/styles/index.css';
import * as pdfjsLib from 'pdfjs-dist';
import CloseIcon from '@mui/icons-material/Close';
import { getFilePlugin } from '@react-pdf-viewer/get-file';
import DownloadIcon from '@mui/icons-material/Download';
import { flex } from "@mui/system";
import DeleteIcon from '@mui/icons-material/Delete'; 
import { styled } from '@mui/material/styles';





pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

// FIX: Added fileUrl and fileName to props
function FileUploader({onFileUploaded, fileUrl, fileName,onDelete, toolTipText}){ 

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const inputRef = useRef(null);
    
    // Local state to manage the file display (initialized from props)
    const localFileUrl = fileUrl || null;
    const localFileName = fileName || "No selected file";

    const [open,setOpen] = useState(false);
    



    const getFilePluginInstance = getFilePlugin({
        fileNameGenerator:(() => {
            return `${localFileName}`
        })
    });
    const { Download } = getFilePluginInstance;


    const handleClick = () => {
        inputRef.current.click();
    }

   

    const handleFileChange = (e) => {
        const currentFile = e.target.files[0];
        if(currentFile) {
            // IMPORTANT: CreateObjectURL creates a temporary URL.
            // This URL must be persisted in the parent state to survive tab changes.
            const url = URL.createObjectURL(currentFile); 
            
          
            // Inform parent with the new URL and the file name
            if (onFileUploaded) {
                onFileUploaded(url, currentFile.name); 
            }
        }
        e.target.value = '';
    };

    // const handleRemoveFile = () => {
    //     setLocalFileName(null)
    //     setLocalFileUrl(null)
    //     // showFileBtn()



    // }
    const LightTooltip = styled(({ className, ...props }) => (
        <Tooltip {...props} arrow classes={{ popper: className }} />
        ))(({ theme }) => ({
        [`& .${tooltipClasses.tooltip}`]: {
            backgroundColor: theme.palette.common.white,
            color: 'rgba(0, 0, 0, 0.87)',
            boxShadow: theme.shadows[1],
            fontSize: 15,
        },
        [`& .${tooltipClasses.arrow}`]: {
            color: theme.palette.common.white,
        },
        }));


    const handleFileOpen = () => setOpen(true);
    const handleFileClose = () => setOpen(false);


    return (
            <Box>
                {/* Show upload button if no file is present AND onFileUploaded is provided (estlam tab) */}
                {!localFileUrl  ? ( 
                      <LightTooltip 
                    title={`ارفع ${toolTipText}`}>
                        <IconButton
                        onClick={handleClick}
                        sx={{
                            color: colors.grey[400],
                            "&:hover": { color: colors.greenAccent[400]},
                        }}
                        >
                        <FileUploadIcon sx={{ fontSize: 25 }} />
                        </IconButton>
                        <input type="file"
                                accept=".pdf" 
                                ref={inputRef}  
                                hidden
                                onChange={handleFileChange} />  
                                
                </LightTooltip>
                ):( 
                /* Show file icon (viewer/download) if a file is present */
                    localFileUrl && (
                     <>
                <Box sx={{ display: flex ,alignItems: 'center', gap: 0.5  }}>
                        <LightTooltip 

                            title={toolTipText}
                        >
                            <IconButton
                                onClick={handleFileOpen}
                                sx={{
                                    color: colors.grey[400],
                                    "&:hover": { color: colors.greenAccent[400]},
                                }}
                                >
                                <InsertDriveFileIcon sx={{ fontSize: 25 }} />
                            </IconButton>
                        </LightTooltip>
                        {onDelete && (
                            <LightTooltip title={"Remove"}>
                                <IconButton 
                                    onClick={onDelete}
                                    sx={{
                                    color: colors.grey[400],
                                    "&:hover": { color: colors.redAccent[400]},
                                    
                                }}
                                >
                                    <DeleteIcon sx={{ fontSize: 22 }}/>
                                </IconButton>
                        </LightTooltip>
                        )}
                    </Box>
                    
                    <Modal
                        open = {open}
                    >
                        <Box 
                            sx={{position: "absolute",
                                top: "50%",
                                left: "50%",
                                transform: "translate(-50%, -50%)",
                                width: "60vw",
                                height: "80vh",
                                bgcolor: "background.paper",
                                boxShadow: 24,
                                borderRadius: 2,
                                outline: "none",
                                display: "flex",
                                flexDirection: "column",
                            }}>
                                <Box
                                    sx={{
                                    display: "flex",
                                    justifyContent: "flex-end",
                                    p: 1,
                                    borderBottom: "1px solid rgba(0,0,0,0.1)",
                                    }}
                                    >
                                    <Download>
                                        {
                                        (RenderDownloadProps)=>{
                                            return(
                                            <IconButton onClick={RenderDownloadProps.onClick}>
                                                <DownloadIcon />
                                            </IconButton>
                                            )
                                        } 
                                        }
                                    </Download>
                                    <IconButton onClick={handleFileClose}>
                                        <CloseIcon />
                                    </IconButton>
                                
                                    
                                </Box>
                                <Box sx={{
                                    flex: 1,
                                    overflow: "hidden",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    backgroundColor: "#f5f5f5",
                                    }}>
                                    {/* FIX: Wrap Viewer in Worker and use localFileUrl */}
                                    <Worker workerUrl={pdfjsLib.GlobalWorkerOptions.workerSrc}>
                                        <Viewer fileUrl={localFileUrl} defaultScale={1} plugins={[getFilePluginInstance]} 
                                                renderPage={props => {
                                                const { canvasLayer, annotationLayer } = props;
                                                return (
                                                    <div
                                                    style={{
                                                        display: "flex",
                                                        justifyContent: "center",
                                                        alignItems: "center",
                                                        height: "100%",
                                                    }}
                                                    >
                                                    {canvasLayer.children}
                                                    {annotationLayer.children}
                                                    </div>
                                                );
                                                }} />
                                    </Worker>
                                </Box>
                        </Box>
                    </Modal>
            </>
                    
                )
                )}
                
            </Box>
    )
}

export default FileUploader;
