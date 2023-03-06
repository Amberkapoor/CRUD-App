import React, { Fragment, useState } from 'react';
import UserTable from './tables/UserTable';
import AddUserForm from './forms/AddUserForm';
import EditUserForm from './forms/EditUserForm';

const App = () => {
  const usersData = [
    { id: 1, name: "Daniel", username: "coolguy" },
    { id: 2, name: "Mark", username: "nerdbuoy" },
    { id: 3, name: "Laura", username: "webgirl" },
  ]
  const initialFormState ={ id: null, name: '', username:''}
  const [users, setUsers] = useState(usersData)
  const [editing, setEditing] = useState(false);
  const [currentUser, setCurrentUser] = useState(initialFormState);

  const editRow = (user) => {
    setEditing(true)
    setCurrentUser({ id: user.id, name: user.name, username: user.username });
  }

  const addUser = (user) => {
    user.id = users.length + 1
    setUsers([...users, user])
  }
  const deleteUser = (id) => {
    setUsers(users.filter((user) => user.id !==id))
  }
  const updateUser = (id, updatedUser) => {
    setEditing(false)
    setUsers(users.map((user) => (user.id === id ? updatedUser : user)))
}
 return (
    <div className="container">
      <h1>CRUD app with Hooks</h1>
      <div className="flex-row">
       <div className="flex-large">
         {editing ? (
           <Fragment>
             <h2>Edit user</h2>
             <EditUserForm editing={editing} setEditing={setEditing} currentUser={currentUser} updateUser={updateUser} />
           </Fragment>
         ) : (
             <Fragment>
               <h2>Add user</h2>
         <AddUserForm addUser={addUser} />
             </Fragment>
         )}
         
        </div>
        <div className="flex-large">
          <h2>View users</h2>
         <UserTable users={users} editRow={editRow} deleteUser={deleteUser}  />
        </div>
      </div> 
    </div>
  );
}

export default App;
