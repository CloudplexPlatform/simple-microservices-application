import Link from 'next/link';

const Navbar = () => (
    <nav className="navbar navbar-expand navbar-dark bg-dark mb-4" style={{ background: 'linear-gradient(to top right, #003366 0%, #00cc99 100%)' }}>
        <div className="container">
            <a className="navbar-brand" href="#">Training Project</a>
            {/* <div className="collapse navbar-collapse">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item">
                        <Link href="/students" ><a className="nav-link">Students</a></Link>
                    </li>
                    <li className="nav-item">
                        <Link href="/courses" ><a className="nav-link">Courses</a></Link>
                    </li>
                </ul>
            </div> */}
        </div>
    </nav>
);

export default Navbar;