import Head from 'next/head';
import Navbar from './NavBar';
import { Provider } from 'react-redux';
import globalStore from '../store';

const Layout = (props) => (
    <Provider store={globalStore}>
        <Head>
            <title>Training Project</title>
            <link rel="stylesheet" href="https://bootswatch.com/4/cerulean/bootstrap.min.css" />
        </Head>
        <Navbar />
        <div className="container">
            {props.children}
        </div>
    </Provider>
);

export default Layout;