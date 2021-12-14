import './App.css';
import Header from './Components/Header';
import Searchbar from './Components/Searchbar';
import Table from "./Components/Table";
import { Edit } from './Components/EditPage';
import LoadData from './services/Loaduserdata.js';
import  {Paginationcontrols} from './Components/PaginationControls';
import { useDispatch } from 'react-redux';


function App() {
  const dispatch = useDispatch();
  const redu = LoadData();
  redu(dispatch);

  return (
      <div className="App">
        <Edit/>
        <Header/>
        <Searchbar/>
        <Table/>
        <Paginationcontrols/>
      </div>
  );
}

export default App;
