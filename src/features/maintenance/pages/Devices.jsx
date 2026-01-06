import { borderBottomColor, borderRadius, color, fontFamily, fontSize, fontWeight } from "@mui/system";
import { Box, Button, ButtonGroup, Tab, Tabs, useTheme} from "@mui/material";
import { use, useEffect, useState } from "react";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { SnackbarProvider, useSnackbar } from 'notistack';
import CardItem from "../../../components/CardItem";
import { tokens } from "../../../theme";


const Devices = () => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)

    //set cards in local storage
   

    const { enqueueSnackbar } = useSnackbar();

// const savedCards = [     
//         { id: 1,status: "estlam", company: "El Nesr",date:"September 14, 2025" ,model: "MA50R", sn: "7484937", checked: false ,pinned:false,fileUrl: null,fileName: null,file2Url: null,file2Name: null,file3Url: null,file3Name: null,receivedBy:"",receivedByID:   null,img: "../../assets//hachLogo.png"},
//         { id: 2,status: "estlam", company: "Pharco",date:"October 20, 2025", model: "XA210", sn: "1234567", checked: false ,pinned:false,fileUrl: null,fileName: null,file2Url: null,file2Name: null,file3Url: null,file3Name: null,receivedBy:"",receivedByID:  null,img: "../../assets//memmertLogo.png"},
//         { id: 3,status: "estlam", company: "Eva",date:"October 20, 2025", model: "XA210", sn: "1234567", checked: false ,pinned:false,fileUrl: null,fileName: null,file2Url: null,file2Name: null,file3Url: null,file3Name: null,receivedBy:"",receivedByID: null,img: "../../assets/memmertLogo.png"},
//         { id: 4,status: "estlam", company: "Water Asiout",date:"October 20, 2025", model: "XA210", sn: "1234567", checked: false ,pinned:false,fileUrl: null,fileName: null,file2Url: null,file2Name: null,file3Url: null,file3Name: null,receivedBy:"",receivedByID:    null,img: "../../assets//hachLogo.png"},
//         { id: 5,status: "estlam", company: "Water Menya",date:"October 20, 2025", model: "XA210", sn: "1234567", checked: false ,pinned:false,fileUrl: null,fileName: null,file2Url: null,file2Name: null,file3Url: null,file3Name: null,receivedBy:"",receivedByID: null,img: "../../assets//memmertLogo.png"},
//         { id: 6,status: "estlam", company: "Water Mnufya",date:"October 20, 2025", model: "XA210", sn: "1234567", checked: false ,pinned:false,fileUrl: null,fileName: null,file2Url: null,file2Name: null,file3Url: null,file3Name: null,receivedBy:"",receivedByID:    null,img: "../../assets/radwag.jpg"},
//         { id: 7,status: "estlam", company: "Eva",date:"October 20, 2025", model: "XA210", sn: "1234567", checked: false ,pinned:false,fileUrl: null,fileName: null,file2Url: null,file2Name: null,file3Url: null,file3Name: null,receivedBy:"",receivedByID: null,img: "../../assets//memmertLogo.png"},
//         { id: 8,status: "estlam", company: "Pharco",date:"October 20, 2025", model: "XA210", sn: "1234567", checked: false,pinned:false,fileUrl: null,fileName: null,file2Url: null,file2Name: null ,file3Url: null,file3Name: null,receivedBy:"",receivedByID:   null,img: "../../assets/hachLogo.png" },
//          ];

//     const getInitialCards = () => {
//         const savedCards = JSON.parse(localStorage.getItem("cards"));
//         return savedCards || [     
//         { id: 1,status: "estlam", company: "El Nesr",date:"September 14, 2025" ,model: "MA50R", sn: "7484937", checked: false ,pinned:false,fileUrl: null,fileName: null,file2Url: null,file2Name: null,file3Url: null,file3Name: null,receivedBy:"",receivedByID:   null,img: "../../assets//hachLogo.png"},
//         { id: 2,status: "estlam", company: "Pharco",date:"October 20, 2025", model: "XA210", sn: "1234567", checked: false ,pinned:false,fileUrl: null,fileName: null,file2Url: null,file2Name: null,file3Url: null,file3Name: null,receivedBy:"",receivedByID:  null,img: "../../assets//memmertLogo.png"},
//         { id: 3,status: "estlam", company: "Eva",date:"October 20, 2025", model: "XA210", sn: "1234567", checked: false ,pinned:false,fileUrl: null,fileName: null,file2Url: null,file2Name: null,file3Url: null,file3Name: null,receivedBy:"",receivedByID: null,img: "../../assets/memmertLogo.png"},
//         { id: 4,status: "estlam", company: "Water Asiout",date:"October 20, 2025", model: "XA210", sn: "1234567", checked: false ,pinned:false,fileUrl: null,fileName: null,file2Url: null,file2Name: null,file3Url: null,file3Name: null,receivedBy:"",receivedByID:    null,img: "../../assets//hachLogo.png"},
//         { id: 5,status: "estlam", company: "Water Menya",date:"October 20, 2025", model: "XA210", sn: "1234567", checked: false ,pinned:false,fileUrl: null,fileName: null,file2Url: null,file2Name: null,file3Url: null,file3Name: null,receivedBy:"",receivedByID: null,img: "../../assets//memmertLogo.png"},
//         { id: 6,status: "estlam", company: "Water Mnufya",date:"October 20, 2025", model: "XA210", sn: "1234567", checked: false ,pinned:false,fileUrl: null,fileName: null,file2Url: null,file2Name: null,file3Url: null,file3Name: null,receivedBy:"",receivedByID:    null,img: "../../assets/radwag.jpg"},
//         { id: 7,status: "estlam", company: "Eva",date:"October 20, 2025", model: "XA210", sn: "1234567", checked: false ,pinned:false,fileUrl: null,fileName: null,file2Url: null,file2Name: null,file3Url: null,file3Name: null,receivedBy:"",receivedByID: null,img: "../../assets//memmertLogo.png"},
//         { id: 8,status: "estlam", company: "Pharco",date:"October 20, 2025", model: "XA210", sn: "1234567", checked: false,pinned:false,fileUrl: null,fileName: null,file2Url: null,file2Name: null ,file3Url: null,file3Name: null,receivedBy:"",receivedByID:   null,img: "../../assets/hachLogo.png" },
//          ];
//     }

    const savedTab = localStorage.getItem("currentTab");

    const [tabValue,setTabValue] = useState(savedTab);
    const [cards,setCards] = useState([
        { id: 1,status: "estlam", company: "El Nesr",date:"September 14, 2025" ,model: "MA50R", sn: "7484937", checked: false ,pinned:false,fileUrl: null,fileName: null,file2Url: null,file2Name: null,file3Url: null,file3Name: null,receivedBy:"",receivedByID:   null,img: "../../assets//hachLogo.png"},
        { id: 2,status: "estlam", company: "Pharco",date:"October 20, 2025", model: "XA210", sn: "1234567", checked: false ,pinned:false,fileUrl: null,fileName: null,file2Url: null,file2Name: null,file3Url: null,file3Name: null,receivedBy:"",receivedByID:  null,img: "../../assets//memmertLogo.png"},
        { id: 3,status: "estlam", company: "Eva",date:"October 20, 2025", model: "XA210", sn: "1234567", checked: false ,pinned:false,fileUrl: null,fileName: null,file2Url: null,file2Name: null,file3Url: null,file3Name: null,receivedBy:"",receivedByID: null,img: "../../assets/memmertLogo.png"},
        { id: 4,status: "estlam", company: "Water Asiout",date:"October 20, 2025", model: "XA210", sn: "1234567", checked: false ,pinned:false,fileUrl: null,fileName: null,file2Url: null,file2Name: null,file3Url: null,file3Name: null,receivedBy:"",receivedByID:    null,img: "../../assets//hachLogo.png"},
        { id: 5,status: "estlam", company: "Water Menya",date:"October 20, 2025", model: "XA210", sn: "1234567", checked: false ,pinned:false,fileUrl: null,fileName: null,file2Url: null,file2Name: null,file3Url: null,file3Name: null,receivedBy:"",receivedByID: null,img: "../../assets//memmertLogo.png"},
        { id: 6,status: "estlam", company: "Water Mnufya",date:"October 20, 2025", model: "XA210", sn: "1234567", checked: false ,pinned:false,fileUrl: null,fileName: null,file2Url: null,file2Name: null,file3Url: null,file3Name: null,receivedBy:"",receivedByID:    null,img: "../../assets/radwag.jpg"},
        { id: 7,status: "estlam", company: "Eva",date:"October 20, 2025", model: "XA210", sn: "1234567", checked: false ,pinned:false,fileUrl: null,fileName: null,file2Url: null,file2Name: null,file3Url: null,file3Name: null,receivedBy:"",receivedByID: null,img: "../../assets//memmertLogo.png"},
        { id: 8,status: "estlam", company: "Pharco",date:"October 20, 2025", model: "XA210", sn: "1234567", checked: false,pinned:false,fileUrl: null,fileName: null,file2Url: null,file2Name: null ,file3Url: null,file3Name: null,receivedBy:"",receivedByID:   null,img: "../../assets/hachLogo.png" },
         ]);
    const [estlamCards,setEstlamCards] = useState(cards);
    const [fa7sCards,setFa7sCards] = useState([])
    const [amrShoghlCards,setAmrShoghlCards] = useState([])
    const [maintainedCards,setMaintainedCards] = useState([])
    const [amrTawreedCards,setAmrTawreedCards] = useState([])
    const [doneCards,setDoneCards] = useState([])

    useEffect(()=>{
        localStorage.setItem("cards",JSON.stringify(cards))
    },[cards])

    useEffect(() => {
        localStorage.setItem("currentTab",tabValue)
    },[tabValue]);

    const handleTabChange = (event,newValue) =>{
        setTabValue(newValue);
    }

    const handlePinClick = (id) =>{
    setCards((cards)=> (cards
        .map((c)=>c.id === id ? {...c,pinned:!c.pinned}:c)
        .sort((a,b)=>(b.pinned?1:0)-(a.pinned?1:0))))
//         if (tabName === "estlam"){
//             setEstlamCards((cards)=>
//                 cards
//                     .map((c) => (c.id === id? {...c,pinned: !c.pinned}:c))
//                     .sort((a,b)=>(b.pinned?1:0)-(a.pinned?1:0))
//             )
//         }
//         else if(tabName === "fa7s"){
//             setFa7sCards((cards)=>
//                 cards
//                     .map((c)=>(c.id === id ? {...c, pinned: !c.pinned }: c))
//                     .sort((a,b)=>(b.pinned?1:0)-(a.pinned?1:0))
//             );
//         }
//         else if(tabName === "amrShoghl"){
//             setAmrShoghlCards((cards)=>
//                 cards
//                     .map((c)=>(c.id === id ? {...c, pinned: !c.pinned }: c))
//                     .sort((a,b)=>(b.pinned?1:0)-(a.pinned?1:0))
//             );
//         }
//         else if(tabName === "maintained") {
//             setMaintainedCards((cards)=>
//                 cards
//                     .map((c)=>(c.id === id ? {...c, pinned: !c.pinned }: c))
//                     .sort((a,b)=>(b.pinned?1:0)-(a.pinned?1:0))
//             );
//         }     
    }
    
 const handleFileUploaded = (id, fileUrl, fileName, tabName) => { 
        const updateCards = (tabName) => {
            setCards(cards.map(c => 
            c.id === id ? tabName === "maintained"?
            { ...c,status:tabName ,file2Url:fileUrl,file2Name:fileName} 
            : tabName === "estlam"? { ...c,status: tabName, fileUrl, fileName } : { ...c,status: tabName ,file3Url:fileUrl, file3Name: fileName}
            : c 
            ));
        };
        updateCards(tabName)

//         if (tabName === "estlam") updateCards("estlam");
//         else if (tabName === "fa7s") updateCards("fa7s");
//         else if (tabName === "amrShoghl") updateCards("amrShoghl");
//         else if (tabName === "maintained") updateCards("maintained");
//         else if (tabName === "amrTawreed") updateCards("amrTawreed");
//         else if (tabName === "done") updateCards("done");
    };
    const handleFileDelete = (id,tabName) => {
        if(tabName === "estlam"){
            setEstlamCards(estlamCards.map(c => 
                c.id === id ? { ...c, fileUrl: null, fileName: null } : c 
            ));
            enqueueSnackbar(`Document deleted successfully!`, { 
                variant: 'warning' ,
                autoHideDuration: 2000,
                anchorOrigin: {vertical: "bottom", horizontal: "right"},
                style: {
                    backgroundColor: colors.redAccent[500],
                }
            });
        }
        else if(tabName === "maintained"){
            setMaintainedCards(maintainedCards.map(c => 
                c.id === id ? { ...c, file2Url: null, file2Name: null } : c 
            ));
            enqueueSnackbar(`Document deleted successfully!`, { 
                variant: 'warning' ,
                autoHideDuration: 2000,
                anchorOrigin: {vertical: "bottom", horizontal: "right"},
                style: {
                    backgroundColor: colors.redAccent[500],
                }
            });
        }
    };

    // const handleMaintainedToDone = () => {
    //     return(
    //         <FileUploader />
    //     )
    // }

    const handleCheckBoxClick = (id,from,to) => {
        let src,setSrc,dest,setDest ;
        switch (from){
            case "estlam":
                src = estlamCards;
                setSrc = setEstlamCards;
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
            case "maintained":
                dest = maintainedCards;
                setDest = setMaintainedCards;
                break;
            case "amrTawreed":
                dest = amrTawreedCards;
                setDest = setAmrTawreedCards;

                break;
            case "done":
                dest = doneCards;
                setDest = setDoneCards;
                break;
            default:
                return ; 
        }

        const card = src.find((c) => c.id === id);
        if(!card) return;

        let receivedBy = card.receivedBy;
        let receivedByID = card.receivedByID;
        if (from === "maintained" && to === "amrTawreed") {
            receivedBy = prompt("Please enter the person name before completing:");
            if (!receivedBy) return alert("Name is required to complete.");

              receivedByID = prompt("Please enter your ID number:");
  if        (!receivedByID) return alert("ID is required to complete.");
        }
        
        setSrc(src.filter((c) => c.id !== id));
        setDest([...dest, { ...card,checked:false ,receivedBy: from === "maintained"?receivedBy:card.receivedBy,receivedByID: from === "maintained"?receivedByID:card.receivedByID}]) 
        setDest( cards=> cards.sort((a,b)=>(b.pinned?1:0)-(a.pinned?1:0)))
        
        

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

    const moveCard = (id,to) => {
        setCards.map(
            prev=>prev.map(c=>c.id === id?{...c,status:to,checked:false}:c)
        )

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
                        <Tab label="استلام" value="1" sx={{ ...tabStyle }}/>
                        <Tab label="فحص" value="2" sx={{ ...tabStyle }}/>
                        <Tab label="أمر شغل" value="3" sx={{ ...tabStyle }}/>
                        <Tab label="تمت الصيانة" value="4" sx={{ ...tabStyle }}/>
                        <Tab label=" أمر التوريد" value="5" sx={{ ...tabStyle }}/>
                        <Tab label="تم التسليم" value="6" sx={{ ...tabStyle }}/>
                    </TabList>
                </Box>
                <TabPanel value="1">
                    <Box sx={{ display: "flex" ,justifyContent:"center",
                alignItems:"center", gap: 3, flexWrap: "wrap", mt: 2,px: 6 }}>
                        {cards.map((card)=>(
                            <CardItem 
                                key={card.id}
                                card={card}
                                tabName = "estlam"
                                onChecked={()=>handleCheckBoxClick(card.id,"estlam","fa7s")}
                                onPin={handlePinClick}
                                // FIX: Updated signature for onFileUploaded to pass file name
                                onFileUploaded={handleFileUploaded} 
                                onFileDelete={handleFileDelete}
                            
                            />
                        ))}
                    </Box>
                </TabPanel>
                <TabPanel value="2">
                    <Box sx={{ display: "flex",justifyContent:"center",
                alignItems:"center",  gap: 2, flexWrap: "wrap", mt: 2 }}>
                        {fa7sCards.map((card)=>(
                           <CardItem 
                                key={card.id}
                                card = {card}
                                tabName="fa7s"
                                onChecked={()=>handleCheckBoxClick(card.id,"fa7s","amrShoghl")}
                                onReplay = {() => moveCardBackward(card,"fa7s","estlam")}
                                onPin={handlePinClick}
                                onFileUploaded={handleFileUploaded}
                           /> 
                        ))}
                    </Box>
                </TabPanel>
                <TabPanel value="3">
                    <Box sx={{ display: "flex",justifyContent:"center",
                alignItems:"center",  gap: 2, flexWrap: "wrap", mt: 2 }}>
                        {amrShoghlCards.map((card)=>(
                           <CardItem 
                                key={card.id}
                                card = {card}
                                tabName="amrShoghl"
                                onChecked={()=>handleCheckBoxClick(card.id,"amrShoghl","maintained")}
                                onReplay = {() => moveCardBackward(card,"amrShoghl","fa7s")}
                                onPin={handlePinClick}
                                onFileUploaded={handleFileUploaded}

                           /> 
                        ))}
                    </Box>
                </TabPanel>
                <TabPanel value="4">
                    <Box sx={{ display: "flex",justifyContent:"center",
                alignItems:"center",  gap: 2, flexWrap: "wrap", mt: 2 }}>
                        {maintainedCards.map((card)=>(
                           <CardItem 
                                key={card.id}
                                card = {card}
                                tabName = "maintained"
                                onChecked={()=>handleCheckBoxClick(card.id,"maintained","amrTawreed")}
                                onReplay = {() => moveCardBackward(card,"maintained","amrShoghl")}
                                onPin={handlePinClick}
                                onFileUploaded={handleFileUploaded}
                           /> 
                        ))}
                    </Box>
                </TabPanel>
                <TabPanel value="5">
                    <Box sx={{ display: "flex",justifyContent:"center",
                       alignItems:"center",  gap: 2, flexWrap: "wrap", mt: 2 }}>
                        {amrTawreedCards.map((card)=>(
                           <CardItem 
                                key={card.id}
                                card = {card}
                                tabName = "amrTawreed"
                                onChecked={()=>handleCheckBoxClick(card.id,"amrTawreed","done")}
                                onReplay = {() => moveCardBackward(card,"amrTawreed","maintained")}
                                onPin={handlePinClick}
                                onFileUploaded={handleFileUploaded}
                           /> 
                        ))}
                    </Box>
                </TabPanel>
                <TabPanel value="6">
                    <Box sx={{ display: "flex",justifyContent:"center",
                        alignItems:"center",  gap: 2, flexWrap: "wrap", mt: 2 }}>
                        {doneCards.map((card)=>(
                           <CardItem 
                                
                                key={card.id}
                                card = {card}
                                tabName = "done"
                                // onReplay = {() => moveCardBackward(card,"done","maintained")}
                                onPin={handlePinClick}
                                onFileUploaded={handleFileUploaded}
                           /> 
                        ))}
                    </Box>
                </TabPanel>
            </TabContext>
            </Box>
        </Box>
    )
}

export default Devices