
import { useEffect } from 'react'
import { useHistory } from 'react-router'

const Home = () => {
    const history = useHistory()
    
    useEffect(() => {
        if(!localStorage.getItem('privacyAppToken')){
            return history.push('/sign-in')
        }
    });
    
    return (
        <div> DashBoard </div>
    )
}

export default Home