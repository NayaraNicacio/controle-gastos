import { CotacaoDollar } from "../../services/CotacaoDollar";
import { getMostTradedStocks } from "../../services/B3Services";
import * as S from "./button-styles";
import { useEffect, useState } from "react";
import { ButtonCotacao } from './button-styles';

const ButtonDollar = () => {
  const [dollarRate, setDollarRate] = useState<number | null>(null);
  const [currentDateTime, setCurrentDateTime] = useState<string>("");
  const [mostTradedStocks, setMostTradedStocks] = useState<{ name: string; volume: number }[]>([]);

  const dollarRateService = new CotacaoDollar();

  useEffect(() => {
    const fetchFinancialData = async () => {
      try {
        // Busca a cotação do dólar
        const rate = await dollarRateService.getDollarRate();
        setDollarRate(rate);

        // Busca as ações mais negociadas
        const stocks = await getMostTradedStocks();
        setMostTradedStocks(stocks);
      } catch (error) {
        console.error("Erro ao buscar dados financeiros:", error);
      }
    };

    // Atualiza a hora
    const updateDateTime = () => {
      const now = new Date();
      const formattedDateTime = now.toLocaleString("pt-BR", {
        dateStyle: "short",
        timeStyle: "medium",
      });
      setCurrentDateTime(formattedDateTime);
    };

    fetchFinancialData();
    updateDateTime();
    const intervalId = setInterval(updateDateTime, 1000); // Atualiza a cada segundo

    return () => clearInterval(intervalId); // Limpa o intervalo ao desmontar
  }, []);

  return (
    <S.ButtonCotacao bgColor="#DA70D6">
      <div style={{ textAlign: "center", color: "#FFF" }}>
        <p><strong>{currentDateTime}</strong></p>
        <p>
          {dollarRate !== null
            ? `Dólar: R$ ${dollarRate.toFixed(2)}`
            : "Carregando cotação do dólar..."}
        </p>
        {mostTradedStocks.length > 0 ? (
          mostTradedStocks.map((stock, index) => (
            <p key={index}>
              {stock.name}: {stock.volume.toLocaleString()} negociações
            </p>
          ))
        ) : (
          <p>Carregando ações...</p>
        )}
      </div>
    </S.ButtonCotacao>
  );
};

export default ButtonDollar;


