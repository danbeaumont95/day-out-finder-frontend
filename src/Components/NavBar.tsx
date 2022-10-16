import '../Styles/NavBar.css';

const NavBar = () => {
  return (
    <div className='navbar_container'>
      <h2 style={{marginTop: 0, marginBottom: 0, padding: '1em'}}>Home</h2>
      <div className="navbar_fill_remaining_space"></div>
      <h3 className='navbar_right'>Profile</h3>
      <h3 className='navbar_right'>Settings</h3>
    </div>
  )
}

export default NavBar;
