import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography, useTheme } from "@mui/material";
import { Formik } from "formik";
import { tokens } from "../theme";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import {  useSnackbar,enqueueSnackbar } from 'notistack';
import { useAuth } from "../contexts/authContext";
import { useNavigate } from "@tanstack/react-router";
// import { mockUsers } from "../data/mockData";


const Login = () => {
    
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const { login } = useAuth();
    const navigate = useNavigate();

    // localStorage.setItem('auth-user',JSON.stringify(mockUser));
    // localStorage.setItem('auth-token',mockToken);

    
    

  const [Reload, setReload] = useState(false);
// const {setIsLoggedIn} = useAuth();
    useEffect(() => {
      setTimeout(()=>setReload(true),200)
    }, []);
    const { enqueueSnackbar } = useSnackbar();


    // const {setUser} = useContext(UserContext)
    const mockUsers = JSON.parse(localStorage.getItem("users"));

    const handleLoginSubmit = (values) => {
        console.log("entered handleLoginSubmit.")
        let foundUser = mockUsers.find((u)=>u.id === values.id && u.password === values.password && u.departmentId === values.department)
        console.log("From Login -> User:",foundUser) 
        if(foundUser){
            login(foundUser);
            enqueueSnackbar("User logged in successfully!",{
                variant: 'success',
                anchorOrigin: {vertical: "bottom", horizontal: "right"},
                style: {
                    backgroundColor:
                    theme.palette.mode === 'dark'
                        ? colors.greenAccent[700]
                        : colors.greenAccent[400]
                }
            })
            navigate({
                to:"/department/$departmentId",
                params: {departmentId:foundUser.departmentId}
            });
            return;

        } else  {
            foundUser = mockUsers.find((u)=>u.id === values.id || u.password === values.password || u.departmentId === values.department)
            if(foundUser){
               console.log("User with wrong credetials:",foundUser.id!==values.id?foundUser.id: "Id is not wrong")
                enqueueSnackbar(`Wrong Credentials or incomplete fields! `,{
                    variant: 'warning',
                    anchorOrigin: {vertical: "bottom", horizontal: "right"},
                    style: {
                        backgroundColor:
                          colors.redAccent[500]
                    }
                })
            }
            else {
                console.log("User Not Registered")
                enqueueSnackbar("User Not Registered!!",{
                    variant: 'warning',
                    anchorOrigin: {vertical: "bottom", horizontal: "right"},
                    style: {
                        backgroundColor:
                         colors.redAccent[500]
                    }
                })
            }

        }  
  };

    const initialValues = {
    id: "",
    password: "",
    department: "",

  };


  const textFieldStyles = {
        my: 1.5, 
        minWidth: '100%',
        "& .MuiOutlinedInput-root": {
            "& fieldset": { borderColor: colors.grey[400] },
            "&.Mui-focused fieldset": {
                borderColor: colors.blueAccent[500],
                boxShadow: `0 0 6px ${colors.blueAccent[500]}80`,
            },
        },
        "& .MuiInputLabel-root": { color: colors.grey[300] },
        "& .MuiInputLabel-root.Mui-focused": { color: colors.blueAccent[400] },
        "& input": { color: colors.grey[100] },
        "& .MuiSelect-select": { color: colors.grey[100] },
    };

  return (
    <Box   >
            <Box 
                className="flex justify-center items-center h-calc(100vh - 20px) overflow-hidden"
                height={"calc(100vh - 20px)"} 
                >
                <Box 
                    className="w-100 p-10 flex flex-col justify-center items-center rounded-2xl"
                    sx={{
                        boxShadow: `0 4px 30px ${colors.primary[800]}99`,
                        backgroundColor:
                            theme.palette.mode === "dark"
                                ? colors.primary[500]
                                : colors.primary[400],
                    }}
                >
                    <Box 
                        // className="mb-2 w-15 h-15"
                        mb={1}
                        component="img"
                        src="../assets/logo-icon.png"
                        alt="El Safwa Logo"
                        sx={{
                            width: "60px",
                            height: "60px",
                            transition: "transform 1s , filter 0.5s ease",
                            transform: Reload
                                ? "scale(1.2) rotate(360deg)"
                                : "scale(0) rotate(0deg)",
                            filter: Reload
                                ? `drop-shadow(0 0 25px ${colors.blueAccent[500]}) 
                                    drop-shadow(0 0 40px ${colors.blueAccent[400]})`
                                : `drop-shadow(0 0 10px ${colors.blueAccent[400]})`,
                        }}
                    />
                     <Typography
                        className="!text-2xl !font-semibold"
                        mb={2}
                        color={colors.blueAccent[500]}
                    > Members Login
                    </Typography>

                    <Formik
                        initialValues={initialValues}
                        onSubmit={handleLoginSubmit}
                    >
                        {({
                            values,
                            handleSubmit,
                            handleChange
                        }) => (
                            <form onSubmit={handleSubmit} style={{ width: "100%" }}>
                                <Box 
                                className="w-full flex flex-col justify-center items-center">

                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        // type="number"
                                        value={values.id}
                                        onChange={handleChange}
                                        label="Member ID"
                                        name="id"
                                        sx={{ ...textFieldStyles }}
                                    />

                                    <TextField
                                        fullWidth
                                        variant="outlined"
                                        type="password"
                                        value={values.password}
                                        onChange={handleChange}
                                        label="Password"
                                        name="password"
                                        sx={{ ...textFieldStyles }}
                                    />

                                    <FormControl fullWidth sx={{ ...textFieldStyles }}>
                                        <InputLabel sx={{"&.Mui-focused": {color: colors.blueAccent[400]}}} id="department-select-label">Department</InputLabel>
                                        <Select
                                            MenuProps={{
                                                PaperProps: {
                                                    sx: {
                                                        backgroundColor: theme.palette.mode === 'dark' ? colors.primary[400] : colors.primary[600],
                                                        '& .MuiMenuItem-root': {
                                                            '&:hover': {
                                                                backgroundColor: colors.blueAccent[600],
                                                                color: colors.grey[100]
                                                            },
                                                        },
                                                    },
                                                }
                                            }}
                                            labelId="department-select-label"
                                            id="department-select"
                                            value={values.department}
                                            label="Department"
                                            name="department"
                                            onChange={handleChange}
                                        >
                                            <MenuItem value={"sales"}>Sales</MenuItem>
                                            <MenuItem value={"maintenance"}>Maintenance</MenuItem>
                                            {/* <MenuItem value={"service"}>Service</MenuItem> */}
                                            <MenuItem value={"accounting"}>Accounting</MenuItem>
                                        </Select>
                                    </FormControl>

                                </Box>

                                <Box display="flex" justifyContent="center" mt={3}>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        size="large"
                                        sx={{
                                            px: 4,
                                            py: 1.5,
                                            borderRadius: "10px",
                                            fontWeight: "600",
                                            backgroundColor: colors.blueAccent[600],
                                            transition: "all 0.3s ease",
                                            "&:hover": {
                                                backgroundColor: colors.blueAccent[700],
                                                boxShadow: "0px 4px 20px rgba(75, 55, 228, 0.82)",
                                                transform: "translateY(-2px)",
                                            },
                                        }}
                                    >
                                        Login
                                    </Button>
                                </Box>
                            </form>
                        )}
                    </Formik>
                </Box>
            </Box>
        </Box>
    
   
  );
};
export default Login;
