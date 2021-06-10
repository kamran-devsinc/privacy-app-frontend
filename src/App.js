import './App.css';
import { Toaster } from 'react-hot-toast';
import PrivacyRouter from './config/routes';
import { Provider, useSelector } from 'react-redux'
import store from './redux/config/store';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
    return (
        <Provider store={store}>
            <PrivacyRouter />
            <Toaster />
        </Provider>
    );
}

export default App;
