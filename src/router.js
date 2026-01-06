import { createRootRoute, createRoute, createRouter, redirect } from "@tanstack/react-router";
import AppShellLayout from "./scenes/AppShellLayout";
import Login from "./scenes/Login";
import DepartmentLayout from "./scenes/DepartmentLayout";
import departments from "./features";

// const getUser = () => {
//   const raw = localStorage.getItem("user");
//   return raw?JSON.parse(raw):null;
// }

// const user = getUser();
export function createAppRouter(auth) {

  const rootRoute = createRootRoute({
    component: AppShellLayout
  });
  
  const indexRoute = createRoute({
    getParentRoute: ()=> rootRoute,
    path: "/",
    //auth in before load not in loader
    beforeLoad: ()=> {
      if(!auth.isAuthenticated){
        throw redirect({to: '/login'});
      }
      throw redirect({
        to:"/department/$departmentId",
        params: {departmentId:auth.user.departmentId},
      })
    }
    
  })
  
  
  const loginRoute = createRoute({
    getParentRoute: ()=> rootRoute,
    path:'login',
    component: Login,
    beforeLoad: ()=>{
      if(auth.isAuthenticated){
        throw redirect({
          to:"/department/$departmentId",
          params:{departmentId: auth.user.departmentId},
        })
      }
    }
  })
  
  
    const departmentRoute = createRoute({
    getParentRoute: ()=> rootRoute,
    path: "department/$departmentId",
    component: DepartmentLayout,
    beforeLoad: ({params})=> {
      const {departmentId} = params;
      if(!auth.isAuthenticated)
        throw redirect({to: "/login"})
      if(auth.user.role === "Manager") //full access
        return;
      if(auth.user.departmentId !== departmentId ){
        throw redirect({ 
          to: "/department/$departmentId" ,
          params: {departmentId: auth.user.departmentId}
        });
  
      }
    },
    loader: async ({params})=>({
      department: params.departmentId,
      ...departments[params.departmentId] 
    })
  
  })
  
  const departmentChildren = departments.flatMap((department) =>
      department.sidebar.map((item) =>
      createRoute({
        getParentRoute: ()=> departmentRoute,
        path: item.path,
        component:item.component,
      }))
  ) 
  
  const routeTree = rootRoute.addChildren([
    indexRoute,
    loginRoute,
    departmentRoute.addChildren(departmentChildren)
    ])
  
   const router = createRouter({
    routeTree,
    context: { auth },
  });
  return router;
}


