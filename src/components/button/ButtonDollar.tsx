import { CotacaoDollar } from "../../services/CotacaoDollar";
import { getMostTradedStocks } from "../../services/B3Services";
import { useEffect, useState } from "react";
import * as S from "./button-styles";

const ButtonDollar = () => {
  const [dollarRate, setDollarRate] = useState<number | null>(null);
  const [currentDateTime, setCurrentDateTime] = useState<string>("");
  const [mostTradedStocks, setMostTradedStocks] = useState<{ name: string; volume: number }[]>([]);

  const dollarRateService = new CotacaoDollar();

  const getColorByPosition = (position: number) => {
    const colors = ["#FFD700", "#C0C0C0", "#CD7F32"]; // Ouro, prata e bronze
    return colors[position] || "#4CAF50"; // Verde para os demais
  };

  useEffect(() => {
    const fetchFinancialData = async () => {
      try {
        const rate = await dollarRateService.getDollarRate();
        setDollarRate(rate);

        const stocks = await getMostTradedStocks();
        const sortedStocks = stocks.sort((a, b) => b.volume - a.volume);
        setMostTradedStocks(sortedStocks);
      } catch (error) {
        console.error("Erro ao buscar dados financeiros:", error);
      }
    };

    const updateDateTime = () => {
      const now = new Date();
      const formattedDateTime = now.toLocaleString("pt-BR", {
        dateStyle: "short",
        timeStyle: "long",
      });
      setCurrentDateTime(formattedDateTime);
    };

    fetchFinancialData();
    updateDateTime();
    const intervalId = setInterval(updateDateTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <S.TableContainer>
      {currentDateTime && dollarRate !== null && (
        <div>
         
          
            <div>
            <S.TableTitle>Ações Mais Negociadas do Dia</S.TableTitle>
              <S.DollarTag>Dólar Hoje: R$ {dollarRate.toFixed(2)}</S.DollarTag>
              
              {mostTradedStocks.length > 0 ? (
                
                mostTradedStocks.map((stock, index) => (
                
                  <S.StockItem key={index}>
                    <S.OrdinalTag color={getColorByPosition(index)}>{index + 1}º </S.OrdinalTag>
                    
                    <S.StockName>{stock.name}</S.StockName>
                    <S.StockVolume> {stock.volume.toLocaleString()}</S.StockVolume>
                  </S.StockItem>
                ))
              ) : (
                <p>Carregando ações...</p>
              )}
            </div>
         
        </div>
      )}
      </S.TableContainer>
    </div>
  );
};

export default ButtonDollar;
