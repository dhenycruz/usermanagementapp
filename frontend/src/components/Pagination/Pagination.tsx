import { useEffect, useState, useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { fetchAllUsers } from '../../services/api-backend';
import styled from 'styled-components';

const Button = styled.button<{ active: Boolean }>`
  border: 1px solid #510183;
  border-radius: 5px;
  color: #510183;
  font-size: 14px;
  font-weight: 700;
  margin: 0 2px;
  width: 35px;
  height: 35px;

  &:hover {
    background-color:#510183;
    color: white;
  };

  ${({ active }) => active && `background-color:#7a19b668`}
`;

const Pagination = () => {
  const { rowsTotal, setGetUsers, loading, setLoading } = useContext(UserContext);
  const [activePage, setActivePage] = useState(1);
  const [totalPages, setPages] = useState<number[]>([1]);

  const clickPage = async (pageNumber: number) => {
    if (pageNumber < 1) {
      pageNumber = 1;
    }
    if (pageNumber >= totalPages.length) {
      pageNumber = totalPages.length;
    }
    setActivePage(pageNumber);
    setLoading(true)
    const skip =  (6 * pageNumber) -6;
    const { getAllUsers } = await fetchAllUsers(6, skip);
    setGetUsers(getAllUsers);
    setLoading(false);
  };

  const RenderButtons = () => {
    if (!loading) {
      return (
        <>
        <Button type="button" active={ false } onClick={ () => clickPage(1) }>{ '<<' }</Button>
        <Button type="button" active={ false } onClick={ () => clickPage(activePage - 1) }>{ '<' } </Button>

        {
          totalPages.map((page: number, index: number) => (
            <Button
              key={ index }
              type="button"
              active={ activePage === page ? true : false }
              onClick={ () => clickPage(page) }
            >
              { page }
            </Button>
          ))
        }
        <Button type="button" active={ false } onClick={ () => clickPage(activePage + 1) }>{ '>' } </Button>
        <Button type="button" active={ false }onClick={ () => clickPage(totalPages.length) }>{ '>>' } </Button>
      </>
      )
    }

    return <></>
  };

  useEffect(() => {
    const pages = Math.ceil((rowsTotal / 6));
    if (pages < 1) {
      setPages([1]);
    } else {
      const pagesArray= []
      for (let pagesN = 1; pagesN <= pages; pagesN++) {
        pagesArray.push(pagesN);
      }
      setPages(pagesArray);
    }
  }, []);

  return <RenderButtons />
};

export default Pagination;
