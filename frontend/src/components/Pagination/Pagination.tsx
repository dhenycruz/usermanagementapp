import { useEffect, useState, useContext } from 'react';
import { UserContext } from '../../context/UserContext';
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
  const { users, rowsTotal, setLoading, setSkip } = useContext(UserContext);
  const [activePage, setActivePage] = useState(1);
  const [totalPages, setPages] = useState<number[]>([1]);

  useEffect(() => {
    if(activePage <= 0) {
      setActivePage(1);
    }
    if(activePage >= totalPages.length) {
      setActivePage(totalPages.length);
    }
  }, [activePage, totalPages.length, users]);

  const clickPage = (pageNumber: number) => {
    const skip =  (6 * pageNumber) -6;
    setActivePage(pageNumber);
    setLoading(true);
    setSkip(skip);
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
  }, [users]);

  return (
    <>
    <Button type="button" active={ false } onClick={ () => clickPage(1) }>{ '<<' }</Button>
    <Button type="button" active={ false } onClick={ () => setActivePage(activePage - 1) }>{ '<' } </Button>

    {
      totalPages.map((page: number, index: number) => (
        (activePage === page) ?
        <Button
          key={ index }
          type="button"
          active={ true }
          onClick={ () => clickPage(page) }
        >
          { page }
        </Button>
        : <Button
            key={ index }
            type="button"
            active={ false }
            onClick={ () => clickPage(page) }
          >
            { page }
          </Button>
      ))
    }

    {/* <Button type="button">1</Button>
    <Button type="button">2</Button>
    <Button type="button">3</Button> */}

    <Button type="button" active={ false } onClick={ () => setActivePage(activePage + 1) }>{ '>' } </Button>
    <Button type="button" active={ false }onClick={ () => setActivePage(totalPages.length) }>{ '>>' } </Button>
    </>
  );
};

export default Pagination;
