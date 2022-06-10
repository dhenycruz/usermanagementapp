import{ useEffect, useState } from 'react';
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
  const [activePage, setActivePage] = useState(0);
  const pages = [1,2,3,4];

  useEffect(() => {
    if(activePage <= 0) {
      setActivePage(1);
    }
    if(activePage >= pages.length) {
      setActivePage(pages.length);
    }
  }, [activePage, pages.length]);
  return (
    <>
    <Button type="button" active={ false } onClick={ () => setActivePage(1) }>{ '<<' }</Button>
    <Button type="button" active={ false } onClick={ () => setActivePage(activePage - 1) }>{ '<' } </Button>

    {
      pages.map((page, index) => (
        (activePage === page) ?
        <Button
          key={ index }
          type="button"
          active={ true }
          onClick={ () => setActivePage(page) }
        >
          { page }
        </Button>
        : <Button
            key={ index }
            type="button"
            active={ false }
            onClick={ () => setActivePage(page) }
          >
            { page }
          </Button>
      ))
    }

    {/* <Button type="button">1</Button>
    <Button type="button">2</Button>
    <Button type="button">3</Button> */}

    <Button type="button" active={ false } onClick={ () => setActivePage(activePage + 1) }>{ '>' } </Button>
    <Button type="button" active={ false }onClick={ () => setActivePage(pages.length) }>{ '>>' } </Button>
    </>
  );
};

export default Pagination;
