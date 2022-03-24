import { Link } from 'react-router-dom';

function SidebarMenu() {
  return (
    <nav className="sidebar">
      <ul className="sidebar-menu">
        <li>
          <Link to="/">
            <i className="fas fa-home"></i> Головна
          </Link>
        </li>
        <li>
          <Link to="/categorys">
            <i className="fas fa-clipboard-list"></i> Категорії товарів
          </Link>
        </li>
        <li>
          <Link to="/delivery_info">
            <i className="fas fa-truck"></i> Способи доставки
          </Link>
        </li>
        <li>
          <Link to="/contacts">
            <i className="fas fa-file-signature"></i> Контакти
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default SidebarMenu;
