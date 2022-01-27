import styled from "styled-components";
import { Card } from "components/atoms/layout";

export const CardLink = styled(Card)`
  text-decoration: none;
  display: block;
  margin-top: 30px;
  padding-top: 25px;
  padding-bottom: 25px;
  position: relative;
  padding-right: 80px;
  transition: all 0.2s;
  cursor: pointer;

  &:hover,
  &:active,
  &:focus {
    box-shadow: inset 0px 0px 0px 2px #02a3da;
  }
`;

export const Pill = styled.em`
  display: inline-block;
  padding: 2px 12px;
  background: rgba(238, 237, 235, 1);
  border-radius: 12px;
  color: rgb(88, 96, 105);
`;

export const IconWrapper = styled.div`
  position: absolute;
  width: 32px;
  height: 32px;
  top: 50%;
  right: 50px;
  transform: translate3d(0, -50%, 0);
`;

export const Notification = styled.div`
  position: absolute;
  width: 32px;
  height: 32px;
  top: -16px;
  right: 50px;
  background: #02a3da;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
