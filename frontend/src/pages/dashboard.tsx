import Box from '../components/MainBox/MainBox';
import NavBar from '../components/Nav/Nav';
import Table from '../components/Table/Table';

const Dashboard = (): JSX.Element =>(
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