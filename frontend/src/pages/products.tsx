
import { useContext } from 'react';
import Cards from '../components/cards';
import SearchAppBar from '../components/searchAppBar';
import { LoggedInUserContext } from '../provider/loggedInUserDataProvider';


const Products = () => {
  const { loggedInUserData } = useContext(LoggedInUserContext)
  return (
    <>
      <SearchAppBar loggedInUserData={loggedInUserData}/>
      <Cards />
    </>
  );
}

export default Products;
