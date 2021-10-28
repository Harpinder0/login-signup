import { getAuth, signOut } from '@firebase/auth';
import React, { useEffect, useState, useCallback } from 'react';
import {collection, doc, getDocs, setDoc, query, deleteDoc, where} from '@firebase/firestore'
import { getDB } from '../utils/firebase';


const Dashboard = ({history}) => {

    const [name,setName] = useState();
    const [number,setNumber] = useState();
    const [tasks,setTasks] = useState([]);



    const [fname,setFname] = useState()
    const [lname,setLname] = useState()
    const [email,setEmail] = useState()
    const [password,setPassword] = useState()
    const [date,setDate] = useState()
    const [gender,setGender] = useState()
    

    const onSubmitData = () => {
        console.log(fname,lname,email,password,date,gender)
    }

    const auth = getAuth();
    const user = auth.currentUser

    const onLogOut = () => {
        signOut(auth)
        .then(() => {
            localStorage.removeItem('token')
            history.push('/')
        }).catch((e) => alert(e.message))
          
    }

    const onAddTask = useCallback(() => {
        const db = getDB()
        const newTaskRef = doc(collection(db, "tasks"))
        setDoc(newTaskRef,{
            // name: name,
            fname: fname,
            lname: lname,
            email: email,
            password: password,
            date: date,
            gender: gender,
            // number : number,
            user: user.uid,
        }).then(() => fetchTasks())
        // console.log(fname,lname,email,password,date,gender)
        },[fname, lname,email,password,date,gender, user])
       


    const onDeleteTask = async (id) => {
        const db = getDB();

        try{
            const result = await deleteDoc(doc(db, "tasks", id))
            fetchTasks()
        } catch (e) {
            console.log(e)
        }
    }

    

    
    const fetchTasks = useCallback(async() => {
        if(user && user.uid){
            const db = getDB();
            const q = query(collection(db, "tasks"), where("user","==", user.uid));

            try{
                const results  = await getDocs(q);
                const resultTask = [];
                results.forEach(doc => {
                    resultTask.push({
                        ...doc.data(),
                        uid: doc.id,
                    })
                })
                setName('')
                setNumber('')
                setTasks(resultTask)
            } catch (e) {
                console.log(e)
            }
        }
    },[user])

    useEffect(() => {
        const token = localStorage.getItem('token')
        if(!token) {
            history.push('/')
        }
    },[])

    useEffect(() => {
        fetchTasks();
    }, [user])

    return (
    
        <div>
            <h2>User Name : {user && user.displayName}</h2>

            <div className="flex flex-col mb-4">
                <label className="mb-2 font-bold text-lg text-gray-900" htmlFor="first_name">First Name</label>
                <input className="border py-2 px-3 text-grey-800" type="text" name="fname" id="first_name" value={fname}
                onChange={e => setFname(e.target.value)}/>
            </div>

            <div className="relative flex items-center border border-gray-500 focus:ring focus:border-blue-500 rounded">
            <input
              name="name"
              className="w-full rounded px-3 pt-2 outline-none pb-2 focus:outline-none active:outline-none input active:border-blue-500"
              type="text"
              placeholder="Enter Name"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>


          <div className="relative flex items-center border border-gray-500 focus:ring focus:border-blue-500 rounded">
            <input
              name="number"
              className="w-full rounded px-3 pt-2 outline-none pb-2 focus:outline-none active:outline-none input active:border-blue-500"
              type="number"
              placeholder="Enter Number"
              value={number}
              onChange={e => setNumber(e.target.value)}
            />
          </div>




       <div className="flex justify-center items-center w-full bg-blue-400">
  <div className="w-1/2 bg-white rounded shadow-2xl p-8 m-4">
    <h1 className="block w-full text-center text-gray-800 text-2xl font-bold mb-6">Component Form</h1>
    <form  onSubmit={onSubmitData}>
      <div className="flex flex-col mb-4">
        <label className="mb-2 font-bold text-lg text-gray-900" htmlFor="first_name">First Name</label>
        <input className="border py-2 px-3 text-grey-800" type="text" name="fname" id="first_name" value={fname}
        onChange={e => setFname(e.target.value)}/>
      </div>
      <div className="flex flex-col mb-4">
        <label className="mb-2 font-bold text-lg text-gray-900" htmlFor="last_name">Last Name</label>
        <input className="border py-2 px-3 text-grey-800" type="text" name="lname" id="last_name" value={lname}
        onChange={e => setLname(e.target.value)}/>
      </div>
      <div className="flex flex-col mb-4">
        <label className="mb-2 font-bold text-lg text-gray-900" htmlFor="email">Email</label>
        <input className="border py-2 px-3 text-grey-800" type="email" name="email" id="email" value={email}
        onChange={e => setEmail(e.target.value)}/>
      </div>
      <div className="flex flex-col mb-4">
        <label className="mb-2 font-bold text-lg text-gray-900" htmlFor="password">Password</label>
        <input className="border py-2 px-3 text-grey-800" type="password" name="password" id="password" value={password}
        onChange={e => setPassword(e.target.value)}/>
      </div>
      <div className="flex flex-col mb-4">
        <label className="mb-2 font-bold text-lg text-gray-900" htmlFor="Date">Date</label>
        <input className="border py-2 px-3 text-grey-800" type="date" name="date" id="date" value={date}
        onChange={e => setDate(e.target.value)}/>
      </div>
      <div className="flex flex-col mb-4">
        <label className="mb-2 font-bold text-lg text-gray-900" htmlFor="Select">Select</label>
        <select className="border py-2 px-3 text-grey-800" value={gender}
        onChange={e => setGender(e.target.value)}>
          <option>male</option>
          <option>female</option>
          <option>other</option>
        </select>
      </div>
      <button className="block bg-green-400 hover:bg-green-600 text-white uppercase text-lg mx-auto p-4 rounded" type="submit">Save</button>
    </form>
  </div>
</div>










          <button className="w-full text-center bg-blue-700 hover:bg-blue-900 rounded-full text-white mt-5 py-3 font-medium"
          onClick={onAddTask}
          >
           Add Task
          </button>
          {
              tasks.map(task => (
                  <div key={task.uid}>
                    <h2>{task.name}</h2>
                    <h2>{task.number}</h2>
                    <button onClick={() => onDeleteTask(task.uid)}>del</button>
                  </div>
              )
                ) 
          }
            <button className="w-full text-center bg-blue-700 hover:bg-blue-900 rounded-full text-white mt-5 py-3 font-medium"
            onClick={onLogOut}
            >
            Log Out
            </button>
        </div>
    )
}

export default Dashboard
