import { borderBottomColor, borderRadius, color, fontFamily, fontSize, fontWeight } from "@mui/system";
import { Box, Button, ButtonGroup, Tab, Tabs, useTheme} from "@mui/material";
import { use, useEffect, useState } from "react";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { SnackbarProvider, useSnackbar } from 'notistack';
import CardItem from "../../../components/CardItem";
import { tokens } from "../../../theme";
import { mockDevices } from "../../../data/mockData";


const Devices = () => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)

    //set cards in local storage
   

    const { enqueueSnackbar } = useSnackbar();
// cards = localStorage
    const [cards,setCards] = useState(()=>{
        try{
            const savedCards = localStorage.getItem("cards");
            if(!savedCards){
                localStorage.setItem("cards",JSON.stringify(mockDevices))
                return mockDevices;
            }
            return JSON.parse(savedCards);
            

        } catch(err) {
            console.error("Invalid users data in localStorage, resetting:", err);
            return [];
        }
    });

    //to make localStorage and useState in sync 
    //if there are changes in cards? we want them to be in localStorage
    useEffect(()=>{
        localStorage.setItem("cards",JSON.stringify(cards))
    },[cards])
    

    



    const savedTab = localStorage.getItem("currentTab");

    const [tabValue,setTabValue] = useState(savedTab);
    const [estlamCards,setEstlamCards] = useState(cards);
    const [fa7sCards,setFa7sCards] = useState([])
    const [amrShoghlCards,setAmrShoghlCards] = useState([])
    const [maintainedCards,setMaintainedCards] = useState([])
    const [amrTawreedCards,setAmrTawreedCards] = useState([])
    const [doneCards,setDoneCards] = useState([])
 
    // useEffect(()=>{
    //     localStorage.setItem("cards",JSON.stringify(cards))
    // },[cards])

    useEffect(() => {
        localStorage.setItem("currentTab",tabValue)
    },[tabValue]);

    const handleTabChange = (event,newValue) =>{
        setTabValue(newValue);
    }

    const handlePinClick = (id) =>{
    setCards(cards
        .map((c)=>c.id === id ? {...c,pinned:!c.pinned}:c)
        .sort((a,b)=>(b.pinned?1:0)-(a.pinned?1:0))) 
    }
    
     const handleFileUploaded = (id, fileUrl, fileName) => { 
            setCards(cards.map(c => 
                    c.id === id ? c.status === "maintained"?
                    { ...c,file2Url:fileUrl,file2Name:fileName} 
                    : c.status === "estlam"? { ...c, fileUrl, fileName } 
                    : { ...c ,file3Url:fileUrl, file3Name: fileName}
                    : c 
                ));
      };
    const handleFileDelete = (id) => {

        setCards(cards.map((c)=>c.id === id? 
            c.status === "maintained"?
            {...c,file2Url:null,file2Name: null}
            : c.status === "estlam"?{...c ,fileUrl:null,fileName:null}
            : {...c,file3Url:null,file3Name:null}
            : c
        ))
        enqueueSnackbar(`Document deleted successfully!`, { 
            variant: 'warning' ,
            autoHideDuration: 2000,
            anchorOrigin: {vertical: "bottom", horizontal: "right"},
            style: {
                backgroundColor: colors.redAccent[500],
            }
        });
       
    };

    // const handleMaintainedToDone = () => {
    //     return(
    //         <FileUploader />
    //     )
    // }

    const handleCheckBoxClick = (id) => {

            setCards(
                cards.map((c)=>c.id === id?{...c,status:c.next,checked:false}:c)
            )
            


//         let src,setSrc,dest,setDest ;
//         switch (from){
//             case "estlam":
//                 src = estlamCards;
//                 setSrc = setEstlamCards;
//                 break;
//             case "fa7s":
//                 src = fa7sCards;
//                 setSrc = setFa7sCards;
//                 break;
//             case "amrShoghl":
//                 src = amrShoghlCards;
//                 setSrc = setAmrShoghlCards;
//                 break;
//             case "maintained":
//                 src = maintainedCards;
//                 setSrc = setMaintainedCards;

//                 break;
//             case "amrTawreed":
//                 src = amrTawreedCards;
//                 setSrc = setAmrTawreedCards;

//                 break;
//             
//             default:
//                 return;
//         }

//         switch(to) {
//             case "fa7s":
//                 dest = fa7sCards;
//                 setDest = setFa7sCards;
//                 break;
//             case "amrShoghl":
//                 dest = amrShoghlCards;
//                 setDest = setAmrShoghlCards;
//                 break;
//             case "maintained":
//                 dest = maintainedCards;
//                 setDest = setMaintainedCards;
//                 break;
//             case "amrTawreed":
//                 dest = amrTawreedCards;
//                 setDest = setAmrTawreedCards;

//                 break;
//             case "done":
//                 dest = doneCards;
//                 setDest = setDoneCards;
//                 break;
//             default:
//                 return ; 
//         }

//         const card = src.find((c) => c.id === id);
//         if(!card) return;

//         let receivedBy = card.receivedBy;
//         let receivedByID = card.receivedByID;
//         if (from === "maintained" && to === "amrTawreed") {
//             receivedBy = prompt("Please enter the person name before completing:");
//             if (!receivedBy) return alert("Name is required to complete.");

//               receivedByID = prompt("Please enter your ID number:");
//   if        (!receivedByID) return alert("ID is required to complete.");
//         }
//         
//         setSrc(src.filter((c) => c.id !== id));
//         setDest([...dest, { ...card,checked:false ,receivedBy: from === "maintained"?receivedBy:card.receivedBy,receivedByID: from === "maintained"?receivedByID:card.receivedByID}]) 
//         setDest( cards=> cards.sort((a,b)=>(b.pinned?1:0)-(a.pinned?1:0)))
//         
        

        enqueueSnackbar(`Item transferred to ${arabicDisplay(to)} successfully!`, { variant: 'success' ,
            autoHideDuration: 2000,
            anchorOrigin: {vertical: "bottom", horizontal: "right"},
            style: {
                backgroundColor:
                theme.palette.mode === 'dark'
                    ? colors.greenAccent[700]
                    : colors.greenAccent[400]
            }
        });



    }
    const moveCardBackward = (card,from,to) => {
        let src,setSrc,dest,setDest;
         
        switch (from){
            case "done":
                src = doneCards;
                setSrc = setDoneCards;
                break;
            case "fa7s":
                src = fa7sCards;
                setSrc = setFa7sCards;
                break;
            case "amrShoghl":
                src = amrShoghlCards;
                setSrc = setAmrShoghlCards;
                break;
            case "maintained":
                src = maintainedCards;
                setSrc = setMaintainedCards;
                break;
            case "amrTawreed":
                src = amrTawreedCards;
                setSrc = setAmrTawreedCards;
                break;
            default:
                return;
        }

        switch(to) {
            case "fa7s":
                dest = fa7sCards;
                setDest = setFa7sCards;
                break;
            case "amrShoghl":
                dest = amrShoghlCards;
                setDest = setAmrShoghlCards;
                break;
            case "estlam":
                dest = estlamCards;
                setDest = setEstlamCards;
                break;
            case "maintained":
                dest = maintainedCards;
                setDest = setMaintainedCards;
                break;
            case "amrTawreed":
                dest = amrTawreedCards;
                setDest = setAmrTawreedCards;
                break;
            default:
                return ; 
        }
        setSrc(src.filter((c) => c.id !== card.id))
        setDest([...dest, { ...card, checked: false }])
        setDest(cards=> cards.sort((a,b)=>(b.pinned?1:0)-(a.pinned?1:0)))
      
        

        enqueueSnackbar(`Item returned to ${arabicDisplay(to)} successfully!`, { variant: 'info' ,
            autoHideDuration: 2000,
            style: {backgroundColor: theme.palette.mode === "dark"? colors.blueAccent[600]:colors.blueAccent[600]},
            anchorOrigin: {vertical: "bottom", horizontal: "right"},
        });
    }
    const arabicDisplay = (tabName) => {
         if(tabName === "estlam"){
            return "استلام"
        }
        else if(tabName === "fa7s"){
            return "فحص"
        }else if(tabName === "amrShoghl"){
            return "أمر شغل"
        }
        else if(tabName === "maintained"){
            return "تمت الصيانة";
        }
        else if(tabName === "amrTawreed"){
            return "أمر توريد"
        }
        else if(tabName === "done"){
            return "تم التسليم"
        }
    }

    const moveCard = (id,nextTab,extra={}) => {
        
        
        setCards(cards.map(c=>c.id === id?{...c,status:nextTab,...extra}:c))
        

        enqueueSnackbar(`Item transferred to ${arabicDisplay(nextTab)} successfully!`, { variant: 'success' ,
            autoHideDuration: 2000,
            anchorOrigin: {vertical: "bottom", horizontal: "right"},
            style: {
                backgroundColor:
                theme.palette.mode === 'dark'
                    ? colors.greenAccent[700]
                    : colors.greenAccent[400]
            }
        });
    }

    const tabs = [
        { label: "استلام", name: "estlam", val: "1", next: "fa7s", prev: null },
        { label: "فحص", name: "fa7s", val: "2", next: "amrShoghl", prev: "estlam" },
        { label: "أمر شغل", name: "amrShoghl", val: "3", next: "maintained", prev: "fa7s" },
        { label: "تمت الصيانة", name: "maintained", val: "4", next: "amrTawreed", prev: "amrShoghl" },
        { label: "أمر توريد", name: "amrTawreed", val: "5", next: "done", prev: "maintained" },
        { label: "تم التسليم", name: "done", val: "6", next: null, prev: "amrTawreed" }
    ];



    const tabStyle = {
        borderRadius: 1,
        fontSize: '20px',
        fontWeight: '600',
        fontFamily: "'Tajawal',sans-serif",
        direction: 'rtl',
        color: colors.grey[100],
        "&:hover": {
            backgroundColor: theme.palette.mode === "dark"
            ? colors.primary[400]
            : colors.grey[900],
        },"&.Mui-selected":{
            backgroundColor: theme.palette.mode === "dark"
                ? colors.blueAccent[400]
                : colors.blueAccent[800],
            // borderBottomColor: colors.redAccent[500]
            // color: colors.grey[900],
        },
        "&.css-9n9goe-MuiTabs-indicator":
        {backgroundColor:colors.primary[100]}
    }



    return (
        <Box className="mx-7">
            {/* <Header title={"DEVICES"} subtitle={"Current Devices present in the system"}/> */}
            
            <Box className="flex flex-col justify-center items-center" >
                <TabContext value={tabValue}>
                <Box sx={{ borderBottom: 2 , borderColor: 'divider'}}>
                    <TabList 
                        TabIndicatorProps={{
                            sx: {
                                backgroundColor: colors.primary[100],
                            }
                        }}
                        onChange={handleTabChange}

                    >
                        {tabs.map((tab)=>
                            <Tab label={tab.label} value={tab.val} sx={{ ...tabStyle }}/>
                        )}
                    </TabList>
                </Box>
                {tabs.map((tab)=>
                <TabPanel value={tab.val}>
                    <Box className="flex justify-center items-center gap-3 flex-wrap mt-2 px-5">
                        {cards.filter(c=>c.status === tab.name).map((card)=>(
                            <CardItem 
                                key={card.id}
                                card={card}
                                tabName = {tab.name}
                                onChecked={() => {
                                    if (card.status === "done") return;

                                    if (card.status === "maintained") {
                                        const receivedBy = prompt("Please enter the person name before completing:");
                                        if (!receivedBy) {
                                        alert("Name is required to complete.");
                                        return;
                                        }

                                        const receivedByID = prompt("Please enter your ID number:");
                                        if (!receivedByID) {
                                        alert("ID is required to complete.");
                                        return;
                                        }

                                        moveCard(card.id, tab.next, {
                                        receivedBy,
                                        receivedByID
                                        });
                                        return;
                                    }

                                    moveCard(card.id, tab.next);
                                    }}


                                onReplay={()=>moveCard(card.id,tab.prev)}
                                onPin={handlePinClick}
                                // FIX: Updated signature for onFileUploaded to pass file name
                                onFileUploaded={handleFileUploaded} 
                                onFileDelete={handleFileDelete}
                            
                            />
                        ))}
                    </Box>
                </TabPanel>)}

            </TabContext>
            </Box>
        </Box>
    )
}

export default Devices