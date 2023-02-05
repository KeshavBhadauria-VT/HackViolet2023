import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import styles from '../styles/profile.module.css'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { db } from '../config/firebase';
import { doc, getDoc, collection, getDocs, setDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { Button, Form } from 'react-bootstrap'

ChartJS.register(ArcElement, Tooltip, Legend);




export const data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
        {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
        },
    ],
};

const RenderCard = (props) => {
    const [friendRef, setFriendRef] = useState({});


    useEffect(() => {
        async function fetchFriend() {
            const friendDocRef = doc(db, "users", props.id);
            const docSnap = await getDoc(friendDocRef);
            setFriendRef(docSnap.data());
            console.log(props.id);
        }
        fetchFriend();
    }, [])
    //props.id => get the foreign key
    return (
        <div className='col-3' align='center'>
            <img className='rounded-circle shadow-4-strong' src={friendRef["Image"]} alt="Avatar" />
            <h3>{friendRef.Name}</h3>
        </div>
    )

}

export const Profile = (props) => {
    const plugins = [{
        beforeDraw: function(chart) {
         var width = chart.width,
             height = chart.height,
             ctx = chart.ctx;
             ctx.restore();
             var fontSize = (height / 160).toFixed(2);
             ctx.font = fontSize + "em sans-serif";
             ctx.textBaseline = "top";
             var text = "52lb ",
             textX = Math.round((width - ctx.measureText(text).width) / 2),
             textY = height / 2;
             ctx.fillText(text, textX, textY);
             ctx.save();
        } 
      }]
   

    const { user, logout } = useAuth()

    const handleFriendAdd = async (e: any) => {
        e.preventDefault()
        console.log("here");
    
        try {
            const userDocRef = doc(db, "users", user.email);
            const friendDocRef = doc(db, "users", props.id);

            updateDoc(userDocRef, {
                Friends: arrayUnion(friendDocRef)
            });

    
    
          //
        } catch (err) {
          console.log(err)
        }
    
        console.log(data)
      }


    const [userRef, setUserRef] = useState({ Plugs: [], Friends: [] });

    useEffect(() => {

        async function fetchUser() {
            let value = user.email;
            if (props.id !== undefined) {
                value = props.id;
            }
            // console.log(value);
            const userDocRef = doc(db, "users", value);
            const docSnap = await getDoc(userDocRef);
            setUserRef(docSnap.data());

            // docSnap["Friends"][0] return the first element of the reference
            // await setFriendRef(userRef["Friends"][0]);
            // console.log(friendRef);

        }

        async function fetchFriends() {
            await fetchUser();


            // const querySnapshot = await getDocs(collection(db, "users"));

            // querySnapshot.forEach((current) => {
            //     // doc.data() is never undefined for query doc snapshots
            //     const ref = doc(db, 'users', current.id);
            //     setDoc(ref, {carbon: Math.random() * 100}, {merge:true});
            // });

            // const todoRef = await getDoc(userRef["Friends"][0]);
            // console.log(userRef["Friends"][0].id);




        }
        fetchFriends();
    }, []);

    return (
        <>
            {user && (
                <>
                    <div className='container mt-5 bg-light text-dark'>

                        <div className='row'>

                            <div className='col-2'>
                                <img className='rounded-circle shadow-4-strong' src={userRef['Image']} alt="Avatar" />

                            </div>

                            <div className='col-6'>
                                <div className="header__overline">Profile</div>
                                <h1 className="header__name">{userRef['Name']}</h1>

                                <p className="header__meta">
                                    <span>
                                        Switches: {userRef["Plugs"].length}

                                    </span>

                                </p>

                            </div>
                            {props.id !== undefined && props.id !== user.email &&
                             userRef["Friends"].indexOf(`/users/${props.id}`) <= -1 &&<div className='col-4 float-right d-flex justify-content-center align-items-center'>
                                <Form onSubmit={handleFriendAdd}>
                                <button type="submit" className="btn btn-primary btn-lg" >Add Friend</button>

                                </Form>

                            </div>}
                            

                        </div>
                    </div>

                    <div className="container pt-5 pd-0" style={{ height: 700 }}>
                        <div className='row justify-content-center'>
                            <div className='col-6 '>
                                <Doughnut data={data} plugins={plugins} />
                            </div>
                        </div>

                    </div>

                    <div className='container text-dark'>
                        <h2>Friends</h2>

                    </div>
                    <div className='container mt-2 bg-light text-dark'>

                        {
                            userRef["Friends"][0] && (


                                <div className='row justify-content-center'>
                                    {
                                        userRef["Friends"].map((friend, index) => {
                                            console.log("in here")

                                            return (
                                                <RenderCard key={index} id={friend.id}></RenderCard>
                                            )
                                        })
                                    }

                                </div>
                            )
                        }
                        {
                            !userRef["Friends"][0] && (
                                <h3>Make sure to add some friends if you get the chance!</h3>
                            )
                        }
                    </div>

                </>
            )}
        </>

    )
}

export default Profile;