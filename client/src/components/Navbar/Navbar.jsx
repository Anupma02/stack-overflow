import React , { useEffect } from 'react'
import { Link , useNavigate } from 'react-router-dom'
import { useSelector , useDispatch } from 'react-redux'
import { jwtDecode } from 'jwt-decode'

import logo  from '../../assets/logo.png'
import search from '../../assets/search-icon.png'
import Avatar from '../../components/Avatar/Avatar'
import './Navbar.css'
import { setCurrentUser } from '../../actions/currentUser'





const Navbar = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    var User = useSelector((state) => state.currentUserReducer)

 
    const handleLogout = () => {
        dispatch({type : 'LOGOUT'});
        navigate('/')
        dispatch(setCurrentUser(null))
    }
    
    useEffect(() => {
        const token = User?.token
        if(token){
            const decodedToken = jwtDecode(token)
            if(decodedToken.exp * 1000 < new Date().getTime()){
                handleLogout();
            }
        }
        dispatch(setCurrentUser(JSON.parse(localStorage.getItem('Profile'))))
    },[dispatch])

    return (
        <nav className='main-nav'>
            <div className='navbar'>
                <Link to='/' className='nav-item nav-logo'>
                    <img src={logo} alt='logo' width='120' /> {/* Added single quotes for consistency */}
                </Link>
                <Link to='/' className='nav-item nav-btn'>
                    About
                </Link>
                <Link to='/' className='nav-item nav-btn'>
                    Products
                </Link>
                <Link to='/' className='nav-item nav-btn'>
                    For Teams
                </Link>
                <Link to='/location' className='nav-item nav-btn'> {/* Changed "/location" to '/location' for consistency */}
                    Location
                </Link>
                <form>
                    <input type='text' placeholder='Search...' />
                    <img src={search} alt='Search' width='18' className='search-icon' /> {/* Added single quotes for consistency */}
                </form>
                {User == null ? (
                    <Link to='/Auth' className='nav-item nav-links'>
                        Log in
                    </Link>
                ) : (
                    <>
                        <Avatar backgroundColor='#009dff' px='10px' py='7px' borderRadius='50%' color='white'> {/* Added single quotes for consistency */}
                            <Link to={`/Users/${User?.result?._id}`} style={{ color: 'white', textDecoration: 'none' }}> {/* Corrected syntax for interpolation */}
                                {User.result.name.charAt(0).toUpperCase()}
                            </Link>
                        </Avatar>
                        <button className='nav-item nav-links' onClick={handleLogout}>Log out</button>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;