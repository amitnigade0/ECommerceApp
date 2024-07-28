
import { useContext } from 'react';
import Cards from '../components/cards';
import SearchAppBar from '../components/searchAppBar';
import { LoginContext } from '../provider/userLoginProvider';


const Products = () => {
  const { isUserLoggedIn } = useContext(LoginContext)
  return (
    <>
      <SearchAppBar isUserLoggedIn={isUserLoggedIn}/>
      <Cards />
    </>
  );
}

export default Products;
