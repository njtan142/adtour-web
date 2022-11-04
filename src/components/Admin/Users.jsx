import styled from "styled-components";
import { UseAuth } from "../../contexts/AuthContext";
import { useEffect } from "react";
import { useState } from "react";


const Users = (props) => {
    const [userList, setUserList] = useState();
    const [renderedUsers, setRenderedUsers] = useState();
    const [selectedUser, setSelectedUser] = useState();
    const [userRender, setUserRender] = useState();

    const { getUsers } = UseAuth();

    function userSelected(user){
        setSelectedUser(user)
    }

    useEffect(()=>{
        if(!selectedUser) return;
        const userData = selectedUser.data();
        setUserRender(
            <UserProfileView>
                <BackButton onClick={()=>{setUserRender(null)}}>X</BackButton>
                <UserProfile>
                    <h1>Name: {userData.last_name}, {userData.first_name}</h1>
                    <h2>Age: {userData.age}</h2>
                    <h3>Contact: {userData.phone_number}</h3>
                    <h3>Home Adress:</h3>
                    <h3>Last Location:</h3>
                    <Actions>
                        <Action>Delete User</Action>
                        <Action>Visited Destinations</Action>
                        <Action>Check-ins</Action>
                        <Action>Ratings</Action>
                        <Action>Comments</Action>
                        <Action>Message User</Action>
                        <Action>Concerns</Action>
                        <Action>Location History</Action>
                    </Actions>
                </UserProfile>
            </UserProfileView>
        )

    },[selectedUser])
    
    function renderList(){
        const rows = []
        if(userList){
            userList.map((doc)=>{
                const user = doc.data();
                rows.push(
                    <div onClick={()=>{
                        userSelected(doc)
                    }}>{user.last_name}, {user.first_name} ({user.age} yrs old)</div>
                )
            })
        }
        setRenderedUsers(rows);
    }

    useEffect(() => {
        let usersArr = [];
        getUsers().then(users => {
            users.forEach((doc) => {
                usersArr.push(doc)
            })
        }).then(()=>{
        setUserList(usersArr)
        })
    }, []);

    useEffect(()=>{
        renderList();
    },[userList])

    return (
        <Container>
            <Title>List of Users</Title>

            <UserList>
                {renderedUsers}
            </UserList>
            {
                userRender && userRender
            }
        </Container>

    )
}

const Container = styled.div`
   
`;

const Title = styled.h1`
    text-align: center;
`;

const UserList = styled.div`
    border-radius: 11px;
    width: 80%;
    margin: 0 auto;
    margin-top: 5em;
    padding: 1em 0.5em;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    gap: 1em;

    div{
        padding: 7px 1em;
        border: 1px solid #2261a8;
        min-width: 180px;
        border-radius: 10px;
    }
`;

const User = styled.div`
    display: flex;
    justify-content: space-between;
`;

const UserProfileView = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #0000005c;
`;

const BackButton = styled.button`
    position: absolute;
    right: 30px;
    top: 30px;
    transform: scale(2);
    float: right;
`;

const UserProfile = styled.div`
    background-color: white;
    width: 600px;
    height: 80vh;
    /* overflow-y: scroll; */
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    /* align-items: center; */
    justify-content: space-evenly;
    padding: 2em;

`;

const Actions = styled.div`
    display: flex;
    flex-wrap: wrap;
    border-radius: 15px;
    background: #fcfcfc;
    box-shadow: inset 10px 10px 20px #cacaca,
                inset -10px -10px 20px #f6f6f6;
    width: 100%;
    height: 50%;
    padding: 1em;
    box-sizing: border-box;
    gap: 0.5em;
    align-content: flex-start;
    justify-content: space-between;
`;

const Action = styled.button`
    height: min-content;
    padding: 0.5em;
`;

export default Users