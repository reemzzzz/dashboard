import { Link, Outlet } from '@tanstack/react-router'; 
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

export default function AppShellLayout() {
  return (
    <div>
      {/* <div className="p-2 flex gap-2 bg-teal-600">
        <Link to="/department/$departmentId" className='[&.active]:font-bold'> Department </Link>
        <Link to="/login" className='[&.active]:font-bold'> Login </Link>
        
      </div> */}
      <div>
        
          <Outlet />
        
      </div>
      <TanStackRouterDevtools position='bottom-right'/>
    </div>
  );
}