
import { useContext } from 'react';
import Cards from '../components/cards';
import SearchAppBar from '../components/searchAppBar';
import { LoginContext } from '../provider/userLoginProvider';


const Products = () => {
  const { loggedInUserData } = useContext(LoginContext)
  return (
    <>
      <SearchAppBar loggedInUserData={loggedInUserData}/>
      <Cards />
    </>
  );
}

export default Products;
