import { Box, Typography, TextField, Card, Grid, useTheme, InputAdornment } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { useState, useMemo } from "react";
// import { useNavigate } from "react-router-dom";
// useNavigate
import { mockSparePartsData } from "../../../data/mockData";
import Header from "../../../components/Header";
import { tokens } from "../../../theme";
import { useNavigate } from "@tanstack/react-router";



const getCompanyData = (data) => {
    const companyCounts = {};
    data.forEach(manual => {
        companyCounts[manual.company] = (companyCounts[manual.company] || 0) + 1;
    });
    return Object.keys(companyCounts).map(company => ({
        name: company,
        count: companyCounts[company],
    }));
};

const SpareParts = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useState("");
    
    const companyData = useMemo(() => getCompanyData(mockSparePartsData), []);

    const filteredCompanies = useMemo(() => {
        if (!searchTerm) {
            return companyData;
        }
        const lowerCaseSearch = searchTerm.toLowerCase();
        return companyData.filter(company => 
            company.name.toLowerCase().includes(lowerCaseSearch)
        );
    }, [companyData, searchTerm]);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleCardClick = (companyName) => {
        navigate(`/SpareParts/${companyName.replace(/\s+/g, '-')}`); 
    };

    return (
        <Box  className="mx-7 flex flex-col">
            {/* <Header title={"SPARE PARTS"} subtitle={"Browse or search spare parts"}/> */}

            <Box  className="mb-4 ">
                <TextField
                    p={0}
                    variant="filled"
                    placeholder="Search spare part name..."
                    value={searchTerm}
                    onChange={handleSearchChange}
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

            {/* --- Company Cards Grid --- */}
            <Box 
                flexGrow={1} 
                pb={2}
            >
                <Grid container spacing={3} className="m-2">
                    {filteredCompanies.length > 0 ? (
                        filteredCompanies.map((company) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={company.name}>
                                <Card  className="min-w-3xs p-4 text-center cursor-pointer !rounded-2xl"
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
                                    onClick={() => handleCardClick(company.name)}
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
                                        {company.count} Spare parts
                                    </Typography>
                                </Card>
                            </Grid>
                        ))
                    ) : (
                        <Box p={3}>
                            <Typography variant="h5" color={colors.redAccent[400]}>
                                No companies found matching "{searchTerm}".
                            </Typography>
                        </Box>
                    )}
                </Grid>
            </Box>
        </Box>
    );
};

export default SpareParts;
