import React, { useEffect, useRef, useState } from 'react'

//定义用户信息接口
interface User {  
  name: string;  
  email: string;  
}  

//定义用户ID接口
interface UserDataProps {  
  userId: string;  
}

const UserData: React.FC<UserDataProps> = ({ userId }) => {  
  //限制类型
  const [user, setUser] = useState<User|null>(null);
  const [seconds, setSeconds] = useState(0); 
  // const props=useRef()

  let fetchUserData:Function
  fetchUserData=()=>{
    fetch(`https://secret.url/user/${userId}`)
      .then(response => response.json())
      .then(data => setUser(data))
      .catch(error => console.error('Error fetching user data:', error));
  }

  useEffect(()=>{
    //使用number声明定时器
    let intervalId:number
    intervalId = setInterval(() => {
      setSeconds(seconds=>seconds+1);
    }, 1000);

    //监听UserID
    fetchUserData()

    //return相当于willUnmount
    return ()=>{
      clearInterval(intervalId)
    }
  },[userId])
  

  return (
    <div>
          <h1>User Data Component</h1>
          {user ? (
          <div>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
          </div>
        ) : (
          <p>Loading user data...</p>
        )}
        <p>Timer: {seconds} seconds</p>
    </div>
  )
}

export default UserData


// class UserData extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       user: null,
//       seconds: 0,
//     };
//   }

//   componentDidMount() {
//     this.fetchUserData();
//     this.intervalId = setInterval(() => {
//       this.setState(prevState => ({ seconds: prevState.seconds + 1 }));
//     }, 1000);
//   }

//   componentDidUpdate(prevProps, prevState) {
//     if (this.props.userId !== prevProps.userId) {
//       this.fetchUserData();
//     }
//   }

//   componentWillUnmount() {
//     clearInterval(this.intervalId);
//   }

//   fetchUserData = () => {
//     fetch(`https://secret.url/user/${this.props.userId}`)
//       .then(response => response.json())
//       .then(data => this.setState({ user: data }))
//       .catch(error => console.error('Error fetching user data:', error));
//   }

//   render() {
//     const { user, seconds } = this.state;
//     return (
//       <div>
//         <h1>User Data Component</h1>
//         {user ? (
//           <div>
//             <p>Name: {user.name}</p>
//             <p>Email: {user.email}</p>
//           </div>
//         ) : (
//           <p>Loading user data...</p>
//         )}
//         <p>Timer: {seconds} seconds</p>
//       </div>
//     );
//   }
// }

// export default UserData;
