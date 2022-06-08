import type { NextPage } from 'next';
import Box from '../components/MainBox/MainBox';
import NavBar from '../components/Nav/Nav';
import Table from '../components/Table/Table';

const Dashboard = (): NextPage => (
  <>
    <NavBar />
    <main>
      <Box>
        <Table />
      </Box>
    </main>
  </>
);

export default Dashboard;