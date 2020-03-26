import styled from 'styled-components';
import { lighten } from 'polished';

export const Container = styled.div`
  h1 {
    padding: 15px 0;
  }
`;
export const List = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(266px, 1fr));
  grid-gap: 25px;
`;
export const Card = styled.div`
  width: 100%;
  height: 100px;
  border-radius: 5px;
  box-shadow: 2px 2px 10px -4px rgba(0, 0, 0, 0.25);
  padding: 10px;
  display: flex;
  justify-content: space-between;
  background: #f1f1f1;
`;

export const Name = styled.h2`
  font-size: 22px;
  font-weight: 500;
  color: #fff;
  text-transform: capitalize;
`;

export const Img = styled.img`
  width: 64px;
`;
export const Col = styled.div``;
