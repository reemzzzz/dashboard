
let count = 1;
let users = [];
export const mockUsers = [
  {
    email: "admin@company.com",
    password: "Admin@123",
    role: "Manager",
    departmentId: "service",
    name: "Administrator",
    phone: "010051097",
    id: "123",
    file:[],
  },
  {
    email: "eng@company.com",
    password: "Eng@123",
    role: "Engineer",
    departmentId: "production",
    name: "Engineer User",
    phone: "01097027618",
    id: "456",
    file:[],
  },
];


try {
  const stored = localStorage.getItem("users");
  if(!stored){
    localStorage.setItem("users",JSON.stringify(mockUsers))
  }
  users = stored ? JSON.parse(stored) : [];
} catch (err) {
  console.error("Invalid users data in localStorage, resetting:", err);
  users = [];
  localStorage.setItem("users", JSON.stringify(users));
}


export const mockDevices = [
        { id: 1,status: "estlam",  company: "El Nesr",date:"September 14, 2025" ,model: "MA50R", sn: "7484937", checked: false ,pinned:false,fileUrl: null,fileName: null,file2Url: null,file2Name: null,file3Url: null,file3Name: null,receivedBy:"",receivedByID:   null,img: "../../assets//hachLogo.png"},
        { id: 2,status: "estlam",  company: "Pharco",date:"October 20, 2025", model: "XA210", sn: "1234567", checked: false ,pinned:false,fileUrl: null,fileName: null,file2Url: null,file2Name: null,file3Url: null,file3Name: null,receivedBy:"",receivedByID:  null,img: "../../assets//memmertLogo.png"},
        { id: 3,status: "estlam",  company: "Eva",date:"October 20, 2025", model: "XA210", sn: "1234567", checked: false ,pinned:false,fileUrl: null,fileName: null,file2Url: null,file2Name: null,file3Url: null,file3Name: null,receivedBy:"",receivedByID: null,img: "../../assets/memmertLogo.png"},
        { id: 4,status: "estlam",  company: "Water Asiout",date:"October 20, 2025", model: "XA210", sn: "1234567", checked: false ,pinned:false,fileUrl: null,fileName: null,file2Url: null,file2Name: null,file3Url: null,file3Name: null,receivedBy:"",receivedByID:    null,img: "../../assets//hachLogo.png"},
        { id: 5,status: "estlam",  company: "Water Menya",date:"October 20, 2025", model: "XA210", sn: "1234567", checked: false ,pinned:false,fileUrl: null,fileName: null,file2Url: null,file2Name: null,file3Url: null,file3Name: null,receivedBy:"",receivedByID: null,img: "../../assets//memmertLogo.png"},
        { id: 6,status: "estlam",  company: "Water Mnufya",date:"October 20, 2025", model: "XA210", sn: "1234567", checked: false ,pinned:false,fileUrl: null,fileName: null,file2Url: null,file2Name: null,file3Url: null,file3Name: null,receivedBy:"",receivedByID:    null,img: "../../assets/radwag.jpg"},
        { id: 7,status: "estlam",  company: "Eva",date:"October 20, 2025", model: "XA210", sn: "1234567", checked: false ,pinned:false,fileUrl: null,fileName: null,file2Url: null,file2Name: null,file3Url: null,file3Name: null,receivedBy:"",receivedByID: null,img: "../../assets//memmertLogo.png"},
        { id: 8,status: "estlam",  company: "Pharco",date:"October 20, 2025", model: "XA210", sn: "1234567", checked: false,pinned:false,fileUrl: null,fileName: null,file2Url: null,file2Name: null ,file3Url: null,file3Name: null,receivedBy:"",receivedByID:   null,img: "../../assets/hachLogo.png" },
]


export const mockDataTeam = 
    users.map((u)=>({
  
    id: count++ ,
    name: u.name,
    email: u.email,
    photo: u.photo
  
}))

export const mockReportsData = [
    { id: 1, employee: "Eng. Ahmed Abdelrahman", team: "Engineering", month: "2025-05", tasksCompleted: 95, successRate: 0.92, efficiencyScore: 8.5, performanceStatus: "High Performer" },
    { id: 2, employee: "Eng. Mohamed Safwat", team: "Engineering", month: "2025-05", tasksCompleted: 78, successRate: 0.75, efficiencyScore: 6.2, performanceStatus: "On Target" },
    { id: 3, employee: "Eng. Reem Elsokary", team: "Engineering", month: "2025-05", tasksCompleted: 65, successRate: 0.60, efficiencyScore: 5.1, performanceStatus: "Needs Focus" },
];

export const mockManualsData = [
    { id: 1, company: "RADWAG", title: "MAGNETOM Skyra Service Guide", manualType: "Service Manual" },
    { id: 2, company: "RADWAG", title: "SOMATOM Definition AS User Manual", manualType: "User Manual" },
    { id: 3, company: "HACH", title: "Revolution CT Operator Manual", manualType: "User Manual" },
    { id: 4, company: "HACH", title: "Logiq E10 Service Manual", manualType: "Service Manual" },
    { id: 5, company: "MEMMERT", title: "Aquilion ONE User Guide", manualType: "User Manual" },
    { id: 6, company: "FALC", title: "Ingenia Elition X Service Manual", manualType: "Service Manual" },
    { id: 7, company: "RADWAG", title: "ACUSON S2000 Manual", manualType: "User Manual" },
];



export const mockSparePartsData = [
    { id: 1, company: "RADWAG", title: "MAGNETOM Skyra Service Guide", manualType: "Service Manual" },
    { id: 2, company: "RADWAG", title: "SOMATOM Definition AS User Manual", manualType: "User Manual" },
    { id: 3, company: "HACH", title: "Revolution CT Operator Manual", manualType: "User Manual" },
    { id: 4, company: "HACH", title: "Logiq E10 Service Manual", manualType: "Service Manual" },
    { id: 5, company: "MEMMERT", title: "Aquilion ONE User Guide", manualType: "User Manual" },
    { id: 6, company: "FALC", title: "Ingenia Elition X Service Manual", manualType: "Service Manual" },
    { id: 7, company: "RADWAG", title: "ACUSON S2000 Manual", manualType: "User Manual" },
];






export const mockDataContacts = [
  {
    id: 1,
    name: "Patrik",
    email: "service@radwag.com",
    phone: "+48 532 758 355",
    company: "RADWAG",
    other: "-",
    registrarId: 123512,
  },
  {
    id: 2,
    name: "Pawel",
    email: "service@radwag.com",
    phone: "+48 606 940 330",
    company: "RADWAG",
    other: "-",
    registrarId: 123512,
  },
  {
    id: 3,
    name: "Armin Danninger",
    email: "adanninger@memmert.com",
    phone: "+49 9171 9792-977",
    company: "MEMMERT",
    other: "+49 160 340 7627",
    registrarId: 4132513,
  },
  {
    id: 4,
    name: "Sanjay Ause",
    email: "sause@memmert.com",
    phone: "+91 942 021 6097",
    company: "MEMMERT",
    other:"+91 751 780 4348",
    registrarId: 123512,
  },
  {
    id: 5,
    name: "Lijo",
    email: "Lijo.Bhaskar@hach.com",
    phone: "+971 50 456 0286",
    company: "HACH",
    other: "-",
    registrarId: 123512,
  },
  {
    id: 6,
    name: "Yasin Algeria",
    email: "evermelisandre@gmail.com",
    phone: "_213 771 09 7031",
    company: "HACH",
    other: "+213 557 14 03 06",
    registrarId: 123512,
  },
  {
    id: 7,
    name: "-",
    email: "dontreply@optika-italy.com",
    phone: "-",
    company: "OPTIKA",
    other: "-",
    registrarId: 123512,
  },
];



export const mockBarData = [
  {
    Week: "Week1",
    "استلام": 137,
    "RecievedColor": "hsl(229, 70%, 50%)",
    فحص: 96,
    ExaminedColor: "hsl(296, 70%, 50%)",
    "امر شغل": 72,
    OrderColor: "hsl(97, 70%, 50%)",
    "تمت الصيانة": 140,
    SentColor: "hsl(340, 70%, 50%)",
  },
  {
    Week: "Week2",
    "استلام": 109,
    "RecievedColor": "hsl(72, 70%, 50%)",
    فحص: 23,
    ExaminedColor: "hsl(96, 70%, 50%)",
    "امر شغل": 34,
    OrderColor: "hsl(106, 70%, 50%)",
    "تمت الصيانة": 152,
    SentColor: "hsl(256, 70%, 50%)",
  },
  {
    Week: "Week3",
    "استلام": 133,
    "RecievedColor": "hsl(257, 70%, 50%)",
    فحص: 52,
    ExaminedColor: "hsl(326, 70%, 50%)",
    "امر شغل": 43,
    OrderColor: "hsl(110, 70%, 50%)",
    "تمت الصيانة": 83,
    SentColor: "hsl(9, 70%, 50%)",
  },
  {
    Week: "Week4",
    "استلام": 81,
    "RecievedColor": "hsl(190, 70%, 50%)",
    فحص: 80,
    ExaminedColor: "hsl(325, 70%, 50%)",
    "امر شغل": 112,
    OrderColor: "hsl(54, 70%, 50%)",
    "تمت الصيانة": 35,
    SentColor: "hsl(285, 70%, 50%)",
  }
];

export const mockPieData = [
  {
    id: "Hach",
    label: "Hach",
    value: 239,
    color: "hsl(104, 70%, 50%)",
  },
  {
    id: "Radwag",
    label: "Radwag",
    value: 170,
    color: "hsl(162, 70%, 50%)",
  },
  {
    id: "Falc",
    label: "Falc",
    value: 322,
    color: "hsl(291, 70%, 50%)",
  },
  {
    id: "Mlaukee",
    label: "Mlaukee",
    value: 503,
    color: "hsl(229, 70%, 50%)",
  },
  {
    id: "Normax",
    label: "Normax",
    value: 584,
    color: "hsl(344, 70%, 50%)",
  },
];


