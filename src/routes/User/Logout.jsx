import { useEffect } from "react";
import { useUsersContext } from "../../hooks/UsersContext";
import { useNavigate } from "react-router-dom";

function Logout() {
  const user = useUsersContext();
  const navigate = useNavigate();

  useEffect(() => {
    user.logout().then(() => {
		navigate('/login');
	});
  }, []);
  return <div className="h-full" />;
}

export default Logout;
