import {
  Box,
  Button,
  Fab,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import AddIcon from '@mui/icons-material/Add';
import DoneIcon from '@mui/icons-material/Done';
import { SnackbarProvider, useSnackbar } from 'notistack';
import Header from "../../../components/Header";
import { tokens } from "../../../theme";


const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [Reload, setReload] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const inputRef = useRef(null);
  const [onFileUploaded,setOnFileUploaded] = useState(false);
  const [selectedFiles,setSelectedFiles] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  

  useEffect(() => {
    setTimeout(()=>setReload(true),200)
    
  }, []);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => event.preventDefault();
  const handleMouseUpPassword = (event) => event.preventDefault();

  const handleFormSubmit = (values) => {
    console.log("✅ Submitted values:", values);
    const users = JSON.parse(localStorage.getItem("users"))||[]
    for (let index = 0; index < users.length; index++) {
      if(values.email === users[index].email || values.name === users[index].name || values.phone === users[index].phone){
        enqueueSnackbar("There is a registered user with the same data!",{
                variant:"warning",
                anchorOrigin: {vertical: "bottom", horizontal: "right"},
                style: {
                    backgroundColor: colors.redAccent[500],
                }
             })
        return;
      }
    }
    const prefix = "MNT"
    const id = `${prefix}-${users.length + 1}`
    const newUser = {...values,id,departmentId:"maintenance",createdAt: new Date()}
    users.push(newUser)
    localStorage.setItem("users",JSON.stringify(users))
    enqueueSnackbar("Engineer Added Successfully!",{
            variant: 'success',
            anchorOrigin: {vertical: "bottom", horizontal: "right"},
            style: {
                backgroundColor:
                theme.palette.mode === 'dark'
                    ? colors.greenAccent[700]
                    : colors.greenAccent[400]
            }
        })
    
  };

  const handleFileBtnClick = () => {
    inputRef.current.click();
  }


  // Initial form values
  const initialValues = {
    // id:0,
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "",
    file:[],
    photo: "../../assets/user2.png",
  };

  const phoneRegExp =
    /^(\+201|01|00201)[0-2,5]{1}[0-9]{8}$/; // valid Egypt numbers
  const passwordRules =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[#?!@$%^&*-]).{8,}$/;

  const userSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    role: yup.string().required("Role is required"),
    phone: yup
      .string()
      .matches(phoneRegExp, "Phone number is not valid")
      .required("Phone number is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .matches(
        passwordRules,
        "Password must be at least 8 chars, include uppercase, lowercase, number, and symbol"
      )
      .required("Password is required"),
    file: yup
      .array()
      .of(yup.mixed()) // allows File objects or anything
     
  });

  // TextField shared styles
  const textFieldStyles = {
    gridColumn: "span 2",
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
  };

  const FabStyles = {
  backgroundColor: onFileUploaded? (theme.palette.mode === "dark"?colors.greenAccent[700]:colors.greenAccent[500]):"",
  "&:hover": {
    backgroundColor: onFileUploaded? (theme.palette.mode === "dark"?colors.greenAccent[600]:colors.greenAccent[600]):"",
  },
  color: onFileUploaded? colors.blueAccent[100] : ""
};


  return (
    <Box mx="20px">

      <Box className="flex justify-center my-7" maxHeight="calc(100vh - 100px)" >
        <Box
        className="!w-2/3 md:!w-1/2 p-10 "
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          sx={{
            boxShadow: `0 4px 30px ${colors.primary[800]}99`,
            borderRadius: "15px",
            backgroundColor:
              theme.palette.mode === "dark"
                ? colors.primary[500]
                : colors.primary[400],
          }}
        >
          {/* Logo Animation */}
          <Box
            mb={1}
            mt={2}
            component="img"
            src="../../assets/logo-icon.png"
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
            variant="h4"
            fontWeight="700"
            mb={2}
            color={colors.blueAccent[200]}
          >
            Engineer Registration
          </Typography>

          <Formik
            initialValues={initialValues}
            validationSchema={userSchema}
            onSubmit={handleFormSubmit}
          >
            {({
              values,
              errors,
              touched,
              handleBlur, 
              handleChange,
              handleSubmit,
              setFieldValue
            }) => (
              <form onSubmit={handleSubmit} className="w-full p-4 ">
                <Box
                className = "flex flex-col gap-3"
                >
                 <Box className="flex flex-col gap-3 md:flex-row md:gap-4">
                   <TextField
                    fullWidth
                    label="Full Name"
                    name="name"
                    variant="outlined"
                    value={values.name}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.name && !!errors.name}
                    helperText={touched.name && errors.name}
                    sx={{ ...textFieldStyles }}
                    />

                  <TextField
                    fullWidth
                    label="Role"
                    name="role"
                    variant="outlined"
                    value={values.role}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.role && !!errors.role}
                    helperText={touched.role && errors.role}
                    sx={{ ...textFieldStyles }}
                    />
                 </Box>

                  <Box className="flex flex-col gap-3 md:flex-row md:gap-4">
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    variant="outlined"
                    value={values.email}
                    onBlur={handleBlur}
                    onChange={handleChange}
                    error={!!touched.email && !!errors.email}
                    helperText={touched.email && errors.email}
                    sx={{ ...textFieldStyles }}
                    />

                  {/* Password Field */}
                  <FormControl
                    fullWidth
                    sx={{ ...textFieldStyles }}
                    variant="outlined"
                    error={!!touched.password && !!errors.password}
                    >
                    <InputLabel htmlFor="outlined-adornment-password">
                      Password
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            onMouseUp={handleMouseUpPassword}
                            edge="end"
                            >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label="Password"
                      />
                    {touched.password && errors.password && (
                      <Typography
                      variant="caption"
                      color="error"
                      sx={{ ml: "5px" }}
                      >
                        {errors.password}
                      </Typography>
                    )}
                  </FormControl>

                  </Box>

                  <Box className="flex flex-col gap-3 md:flex-row md:gap-4">
                      <TextField
                        fullWidth
                        label="Phone Number"
                        name="phone"
                        variant="outlined"
                        value={values.phone}
                        onBlur={handleBlur}
                        onChange={handleChange}
                        error={!!touched.phone && !!errors.phone}
                        helperText={touched.phone && errors.phone}
                        sx={{ ...textFieldStyles }}
                        />
                      <Box 
                      className="flex w-full justify-center items-center gap-2 mt-1" >
                        
                        
                        <Fab  
                          //  fullWidth
                            onClick={handleFileBtnClick} 
                            variant="extended"   
                            sx={{...FabStyles}}
                            aria-label="add"
                            value={values.file}>
                              {onFileUploaded?<DoneIcon sx={{mr: 1}}/> : <AddIcon sx={{mr: 1}}/>}
                            
                          Training Certificates
                          <input 
                            type="file" 
                            multiple 
                            accept=".pdf" 
                            ref={inputRef} 
                            hidden 
                            name="file"
                            onChange={(e)=>{
                              const files = Array.from(e.target.files);
                              const fileData = files.map((file)=>({
                                name: file.name,
                                type: file.type
                              }))
                              setSelectedFiles(fileData);
                              setOnFileUploaded(true);
                              setFieldValue("file", fileData); // ✅ use the 'files' variable directly, not 'selectedFiles'
                              files.forEach((file, index) => console.log(index + " " + file.name));
                              e.target.value = "";
                            }}/>
                        </Fab>
                      
                      </Box>

                  </Box>
                  
                </Box>
                        

                <Box className="flex justify-center !mt-7">
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
                        // boxShadow: "0px 4px 20px rgba(75, 55, 228, 0.82)",
                        transform: "translateY(-5px)",
                      },
                    }}
                  >
                    Create Account
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

export default Form;
