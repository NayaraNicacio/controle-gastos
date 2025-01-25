import styled from "styled-components";


export const DollarTag = styled.span`
  font-size: 16px; 
  font-weight: bold;
  color: #fff;
  background-color: blue; */
  border-radius: 6px;
  padding: 4px 8px; 
  text-align: center;
  min-width: 80px; 
`;

export const TableContainer = styled.div`
 display:flex;
`;

export const TableTitle = styled.p`
  text-align: lefth;
  font-size: 13px;
  font-weight: 400;
  color: #fff;
  margin-bottom: 10px;
`;

export const StockItem = styled.div`
  display: inline;
  padding: 8px; 
  margin:6px;
  border-radius: 6px; 
  background-color: rgba(255, 255, 255, 0.08);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08); 
  
  
`;

export const OrdinalTag = styled.span<{ color: string }>`
  display: inline-block;
  font-size: 12px; 
  font-weight: bold;
  color: #fff;
  background-color: ${(props) => props.color};
  border-radius: 6px;
  padding: 4px 8px; 
  text-align: center;
  min-width: 50px; 
`;

export const StockName = styled.span`
 margin:10px;
  font-size: 14px; 
  font-weight: 600; 
 
`;

export const StockVolume = styled.span`
  font-size: 14px; 
  color: #ddd;
  flex: 1;
   
`;

export const TableTitleH3 = styled.h3`
  text-align: left;
  font-size: 25px; 
  font-weight: 400; 
  color: #fff;
  margin: 10px;
  font-family: 'Arial', sans-serif; /* Usando fonte sem serifa */
`;
