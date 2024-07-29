import styled from "styled-components";

export const Container = styled.div`
  margin: auto;
  padding: 10px;
`;

export const Nav = styled.nav`
  ul {
    list-style-type: none;
    padding: 0;
    display: flex;
    justify-content: space-around;
    background-color: #333;
  }
  li {
    display: inline;
  }
  a {
    color: white;
    text-decoration: none;
    padding: 14px 20px;
    display: block;
  }
  a:hover {
    background-color: #575757;
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
  font-size: 18px;
  text-align: left;
`;

export const TableHead = styled.thead`
  tr {
    background-color: #f2f2f2;
  }
  th,
  td {
    padding: 12px;
    border: 1px solid #ddd;
  }
`;

export const TableBody = styled.tbody`
  tr:nth-child(even) {
    background-color: #f9f9f9;
  }
  tr:hover {
    background-color: #f1f1f1;
  }
  th,
  td {
    padding: 12px;
    border: 1px solid #ddd;
  }
`;

export const Button = styled.button`
  background-color: #4caf50; /* Green */
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 8px;

  &:hover {
    background-color: #45a049;
  }
`;
