import styled from 'styled-components';
import { lighten } from 'polished';

export const Container = styled.div`
  padding: 15px 15px;
  h1 {
    padding: 0;
  }
  h5 {
    padding: 10px 0;
  }
`;
export const List = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-gap: 15px;
  padding-bottom: 30px;
`;
export const Card = styled.div`
  width: 100%;
  height: 380px;
  display: flex;
  flex-direction: column;
  position: relative;

  &:hover {
    transform: scale(1.05);
    transition-duration: 200ms;
    > img {
      margin-top: -20px;
      transform: scale(1.15);
      transition-duration: 300ms;
    }
  }
`;

export const SubCard = styled.div`
  border-radius: 10px;
  box-shadow: 2px 2px 10px -4px rgba(0, 0, 0, 0.25);
  background: #f1f1f1;
  /* min-height: 300px; */
  padding: 15px;
  position: absolute;
  width: 100%;
  margin-top: 100px;
  padding-top: 15px;
`;

export const BoxTypes = styled.div`
  position: absolute;
  top: 5px;
  right: 0;
  max-width: 100px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

export const Name = styled.h2`
  font-size: 20px;
  font-weight: 500;
  color: #fff;
  text-transform: capitalize;
  margin-top: 15px;
`;

export const Img = styled.img`
  width: 160px;
  margin: 0 auto;
  z-index: 2;
`;
export const Head = styled.div`
  display: flex;
  flex-direction: column;
`;
export const Row = styled.div`
  display: flex;
  /* flex-wrap: wrap; */
  width: 100%;
  @media screen and (max-width: 996px) {
    flex-direction: column;
  }
`;
export const Col = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  flex: 1;
  padding-right: 10px;

  &:last-child {
    padding-right: 0;
  }

  @media screen and (max-width: 996px) {
    width: 100%;
    flex: none;
  }
`;
export const Id = styled.div`
  font-size: 16px;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 600;
  z-index: 2;
  letter-spacing: 0.25px;
`;

export const Info = styled.div`
  border-radius: 15px;
  background: rgba(255, 255, 255, 0.5);
  font-size: 14px;
  color: #fff;
  padding: 2px 6px 3px 6px;
  display: inline-flex;
  margin-right: 10px;
  margin-top: 5px;
`;
export const BasicInfo = styled.div`
  border-radius: 15px;
  font-size: 14px;
  color: #fff;
  display: inline-flex;
  margin-right: 10px;
  margin-top: 10px;
  b {
    font-weight: 600;
    margin-right: 5px;
  }
`;

export const SubTitle = styled.div`
  font-size: 16px;
  font-weight: 600;
  margin-top: 10px;
  margin-bottom: 5px;
  color: #fff;
`;

export const Evolutions = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Evolution = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  strong {
    align-self: center;
    font-size: 11px;
    color: rgba(255, 255, 255, 0.6);
  }
  b {
    color: #fff;
    align-self: center;
    font-weight: 500;
    font-size: 13px;
  }
  img {
    width: 76px;
  }
  &::after {
    content: '⮞';
    color: #eee;
    position: absolute;
    right: -2.5px;
    top: 50%;
    z-index: 2;
  }

  span {
    font-weight: bold;
    font-size: 14px;
    color: #eee;
    position: absolute;
    left: -12.5px;
    top: calc(50% - 15px);
  }

  padding-right: 10px;

  &:last-child {
    padding-right: 0;
  }

  &:last-child::after {
    content: '';
  }
`;

export const Colors = styled.div`
  display: flex;
  @media screen and (max-width: 996px) {
    flex-wrap: wrap;
  }
`;
export const Color = styled.button`
  display: flex;
  align-items: center;
  border-radius: 5px;
  padding: 5px 10px;
  color: #fff;
  font-size: 12px;
  box-shadow: 2px 2px 10px -4px rgba(0, 0, 0, 0.25);
  margin-right: 5px;
  margin-bottom: 5px;
  cursor: pointer;
  border: none;
  ${props =>
    props.active &&
    'font-weight:bold;box-shadow: inset 0 0 5px -1px rgba(0,0,0,0.5),inset 1px -2px 5px -1px rgba(255,255,255,0.5), 2px 2px 10px -4px rgba(0, 0, 0, 0.25);'}

  @media screen and (max-width: 996px) {
    padding: 5px 5px;
  }
`;

export const Types = styled.div`
  display: flex;
  flex-wrap: wrap;

  @media screen and (max-width: 996px) {
  }
`;
export const Type = styled.button`
  display: flex;
  align-items: center;
  justify-content:center;
  border-radius: 5px;
  padding: 3px 5px;
  color: #fff;
  font-size: 12px;
  box-shadow: 2px 2px 10px -4px rgba(0, 0, 0, 0.25);
  margin-right: 5px;
  cursor: pointer;
  border: none;
  margin-bottom: 5px;
  flex-direction: column;
  align-items: center;
  flex: 1 1 auto;
  background:#bbb;
  span {
    color: rgba(255, 255, 255, 0.8);
  }

  /* ${props => (props.active ? 'background:#999;' : 'background:#bbb;')} */
  ${props =>
    props.active &&
    'box-shadow: inset 0 0 5px -1px rgba(0,0,0,0.5), 2px 2px 10px -4px rgba(0, 0, 0, 0.25);'}

  @media screen and (max-width: 996px) {
    padding: 5px 5px;
  }
`;

export const Habitats = styled.div`
  display: flex;

  @media screen and (max-width: 996px) {
    flex-wrap: wrap;
  }
`;
export const Habitat = styled.button`
  display: flex;
  align-items: center;
  justify-content:center;
  border-radius: 5px;
  padding: 3px 5px;
  color: #fff;
  font-size: 12px;
  box-shadow: 2px 2px 10px -4px rgba(0, 0, 0, 0.25);
  margin-right: 5px;
  cursor: pointer;
  border: none;
  margin-bottom: 5px;
  flex-direction: column;
  align-items: center;
  flex: 1 1 auto;
  background:#bbb;
  span {
    color: rgba(255, 255, 255, 0.8);
  }

  /* ${props => (props.active ? 'background:#999;' : 'background:#bbb;')} */
  ${props =>
    props.active &&
    'box-shadow: inset 0 0 5px -1px rgba(0,0,0,0.5), 2px 2px 10px -4px rgba(0, 0, 0, 0.25);'}

  @media screen and (max-width: 996px) {
    padding: 5px 5px;
  }
`;
