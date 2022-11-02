
import './App.css';
import NavbarMain from './NavbarMain/NavbarMain';
import { Route,HashRouter } from 'react-router-dom'

import Login from './components/Login/Login'
import Alert from './components/reusable/Alert';
import Register from './components/Login/Register';
import test from './components/Login/test';

import Pharma from './components/Pharama/Pharma'
import SearchPharma from './components/Search/SearchPharma'

import MedicalGroup from './components/MedicalGroup/MedicalGroup';
import SearchMedicalGroup from './components/Search/SearchMedicalGroup';

import Physicians from './components/Physicians/Physicians';
import SearchPhysicians from './components/Search/SearchPhysicians';

import Manager from './components/Manager/Manager';
import SearchManager from './components/Search/SearchManager';

import Rep from './components/Rep/Rep';
import SearchRep from './components/Search/SearchRep';

import Receipt from './components/Receipt/Receipt';
import SearchReceipt from './components/Search/SearchReceipt';
import ReceiptReport from './components/Reports/ReceiptReport';
import RepReport from './components/Reports/RepReport';

function App() {
  return (
    <div id="MasterContainer">
      <HashRouter>
         <NavbarMain />
         <section className='container'>
            <Alert />
          </section>
          <Route
            exact
            path='/'
            component={Login}
          />
          <Route
            exact
            path='/Login'
            component={Login}
          />
           <Route
            exact
            path='/Register'
            component={Register}
          />
             <Route
            exact
            path='/Pharma'
            component={Pharma}
          />
           <Route
            exact
            path='/SearchPharma'
            component={SearchPharma}
          />  
       <Route
            exact
            path='/MedicalGroup'
            component={MedicalGroup}
          />
           <Route
            exact
            path='/SearchMedicalGroup'
            component={SearchMedicalGroup}
            />

          <Route
            exact
            path='/Physicians'
            component={Physicians}
          />
           <Route
            exact
            path='/SearchPhysicians'
            component={SearchPhysicians}
          />

         <Route
            exact
            path='/Manager'
            component={Manager}
          />
           <Route
            exact
            path='/SearchManager'
            component={SearchManager}
          />

        <Route
            exact
            path='/Rep'
            component={Rep}
          />
           <Route
            exact
            path='/SearchRep'
            component={SearchRep}
          />
          <Route
            exact
            path='/RepReport'
            component={RepReport}
          />

         <Route
            exact
            path='/Receipt'
            component={Receipt}
          />
           <Route
            exact
            path='/SearchReceipt'
            component={SearchReceipt}
          />
             <Route
            exact
            path='/ReceiptReport'
            component={ReceiptReport}
          />


          <Route
            exact
            path='/test'
            component={test}
          />
          

      </HashRouter>
      
    </div>
  );
}

export default App;
