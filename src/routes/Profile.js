import React, { useEffect, useState } from "react";
import { authService, dbService } from "fbase";
import { useNavigate } from "react-router-dom";

const Profile = ({ userObj, refreshUser }) => {
    const history = useNavigate();

    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);

    const onLogOutClick = () => {
        authService.signOut();
        history("/");
    };

    const onChange = (event) => {
        const {
            target: { value },
        } = event;
        setNewDisplayName(value);
    };
    const onSubmit = async (event) => {
        event.preventDefault();
        if (userObj.displayName !== newDisplayName) {
            await userObj.updateProfile({
                displayName: newDisplayName,
            });
            refreshUser();
        }
    };

    // const getMyNweets = async () => {
    //     //firestore에서 index를 만들어줘야한다
    //     const nweets = await dbService
    //         .collection("nweets")
    //         .where("creatorId", "==", `${userObj.uid}`)
    //         .orderBy("createdAt")
    //         .get();
    //     console.log(nweets.docs.map((doc) => doc.data()));
    // };

    // useEffect(() => {
    //     getMyNweets();
    // }, []);

    return (
        <div className="container">
            <form onSubmit={onSubmit} className="profileForm">
                <input
                    onChange={onChange}
                    type="text"
                    autoFocus
                    placeholder="Display name"
                    value={newDisplayName}
                    className="formInput"
                />
            </form>
            <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
                Log Out
            </span>
        </div>
    );
};
export default Profile;
