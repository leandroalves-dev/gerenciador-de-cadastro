import './Header.css';

const Header = () => {
  return (
    <header className='content-header'>
        <div className="header-title">
            <h2>Gerenciamento de usuários do sistema</h2>
        </div>
        <div className="header-breadcrumb">
            <ul>
                <li className="ico-home">
                    <a href="#">Home</a>
                </li>
                {/* <li>Usuários</li> */}
            </ul>
        </div>
    </header>
  )
}

export default Header