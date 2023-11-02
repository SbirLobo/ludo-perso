import PropTypes from "prop-types";
import { useLudo } from "../../context/LudoContext";
import { useNavigate } from "react-router-dom";

export default function UserCard({ id, userName, email, admin }) {
  const navigate = useNavigate();
  const { setSelectedUser } = useLudo();

  function handleClickUser(id) {
    setSelectedUser(id);
    navigate("/admin/adminUser");
  }

  return (
    <>
      <button
        className="flex flex-col justify-start items-start border-blue bg-yellow rounded border-4 p-1"
        onClick={() => handleClickUser(id)}
      >
        <p>{userName}</p>
        <p>{email}</p>
        {admin ? <p>admin</p> : <p>user</p>}
      </button>
    </>
  );
}

UserCard.propTypes = {
  id: PropTypes.number,
  userName: PropTypes.string,
  email: PropTypes.string,
  admin: PropTypes.number,
};
