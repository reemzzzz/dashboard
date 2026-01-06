import { useTheme } from "@emotion/react";
// import { useNavigate } from "react-router-dom";
// useNavigate
import { useMemo, useState } from "react";
import { Box, Card, Grid, InputAdornment, TextField, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { mockManualsData } from "../../../data/mockData";
import { tokens } from "../../../theme";
import Header from "../../../components/Header";
import { useNavigate } from "@tanstack/react-router";

const getCompanyData = (data) => {
    const companyCounts = {};  //object
    data.forEach(manual => {
        companyCounts[manual.company] = (companyCounts[manual.company] || 0) + 1;
    });
    return Object.keys(companyCounts).map(company=> ({
        name: company,
        count: companyCounts[company],
    }))
}


const Manuals = () => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();

    const [searchItem,setSearchItem] = useState("");

    const companyData = useMemo(()=> getCompanyData(mockManualsData),[]);

    const filteredCompanies = useMemo(()=> {
        if(!searchItem) return companyData;
        const lowerCaseSearch = searchItem.toLowerCase();
        return companyData.filter(company => 
            company.name.toLowerCase().includes(lowerCaseSearch)
        )
    },[searchItem,companyData])

    const handleCardClick = (companyName) => {
        navigate(`/Manuals/${companyName.replace(/\s+/g,'-')}`);
    }


    return (
        <Box className="mx-7 flex flex-col">
            {/* <Header title={"MANUALS"} subtitle={"Browse or search user or service manuals "}/> */}
            <Box className="mb-4">
                <TextField 
                    variant="filled"
                    placeholder="Search manual name..."
                    value={searchItem}
                    onChange={(e)=>{setSearchItem(e.target.value)}}
                    sx={{
                        backgroundColor: colors.primary[400],
                        borderRadius: '8px',
                        '& .MuiInputBase-input': { color: colors.grey[100] , py:1 },
                        '& .MuiInputAdornment-root': { color: colors.grey[300], pb:2 }
                    }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }}
                />
            </Box>
            <Box flexGrow={1} 
                pb={2}
            >
                <Grid container spacing={3} className="m-2">
                    {filteredCompanies.length > 0 ? (
                        filteredCompanies.map((company)=> (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={company.name}>
                                <Card className="min-w-3xs p-4 text-center cursor-pointer !rounded-2xl"
                                    sx={{ 
                                        transition: 'all 0.3s ease-in-out', 
                                        backgroundColor: colors.primary[400],
                                        border: `1px solid ${colors.primary[400]}`,
                                        
                                        '&:hover': {
                                            boxShadow: `0 6px 15px ${colors.blueAccent[500]}60`,
                                            transform: 'translateY(-5px) scale(1.02)',
                                            borderColor: colors.blueAccent[500],
                                        },
                                    }}
                                    onClick={()=>handleCardClick(company.name)}
                                >
                                    <Typography 
                                        variant="h4" 
                                        fontWeight="bold" 
                                        color={colors.greenAccent[400]}
                                        mb={1}
                                    >
                                        {company.name}
                                    </Typography>
                                    <Typography 
                                        variant="h6" 
                                        color={colors.grey[300]}
                                    >
                                        {company.count} Manuals
                                    </Typography>
                                </Card>
                            </Grid>
                        ))
                    ):(
                        <Box  p={3}>
                            <Typography variant="h5" color={colors.redAccent[400]}>
                                No companies found matching "{searchItem}"
                            </Typography>
                        </Box>
                    )}
                </Grid>
            </Box>
        </Box>
    )
}

export default Manuals;