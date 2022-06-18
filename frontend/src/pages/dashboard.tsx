import { useState, useEffect } from 'react';
import Footer from '../components/Footer/Footer';
import Box from '../components/MainBox/MainBox';
import NavBar from '../components/Nav/Nav';
import Table from '../components/Table/Table';

const Dashboard = (): JSX.Element => {
  const [loadingPage, setLoadingPage] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoadingPage(true);
    }, 2000)
  }, []);

  return (
    <>
      <NavBar loadingPage={ loadingPage } />
      <main>
        <Box loadingPage={ loadingPage }>
          <Table />
        </Box>
      </main>
      <Footer />
    </>
  );
}
export default Dashboard;