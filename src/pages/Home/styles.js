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
  height: 400px;
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const SubCard = styled.div`
  border-radius: 10px;
  box-shadow: 2px 2px 10px -4px rgba(0, 0, 0, 0.25);
  background: #f1f1f1;
  min-height: 300px;
  padding: 15px;
  position: absolute;
  width: 100%;
  margin-top: 100px;
  padding-top: 70px;
`;

export const Name = styled.h2`
  font-size: 22px;
  font-weight: 500;
  color: #fff;
  text-transform: capitalize;
`;

export const Img = styled.img`
  width: 200px;
  margin: 0 auto;
  z-index: 2;
`;
export const Col = styled.div``;
export const Id = styled.div`
  font-size: 16px;
  color: #fff;
`;

export const Info = styled.div`
  border-radius: 15px;
  background: rgba(255, 255, 255, 0.5);
  font-size: 16px;
  color: #fff;
  padding: 5px 10px;
  display: inline-flex;
  margin-right: 10px;
  margin-top: 5px;
`;

export const SubTitle = styled.div`
  font-size: 18px;
  font-weight: 500;
  margin-top: 10px;
  color: #fff;
`;
