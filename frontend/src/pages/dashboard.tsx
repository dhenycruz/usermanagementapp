import { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import Box from '../components/MainBox/MainBox';
import NavBar from '../components/Nav/Nav';
import Table from '../components/Table/Table';
import Loading from '../components/Loading/Loagind';

const Dashboard = (): JSX.Element => {
  const { loading } = useContext(UserContext);
  return (
    <>
      <NavBar />
      <main>
        <Box>
          { loading ? 
              <Loading />
            : <Table />
          }
        </Box>
      </main>
    </>
  );
};

export default Dashboard;