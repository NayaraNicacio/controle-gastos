import { CotacaoDollar } from "../../services/CotacaoDollar";
import { getMostTradedStocks } from "../../services/B3Service";
import * as S from "./button-styles";
import { useEffect, useState } from "react";

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
    <S.ButtonCotacao bgColor="#9370DB">
      <p>{dollarRate !== null ? `Dólar: R$ ${dollarRate.toFixed(2)}` : "Carregando cotação do dólar..."}</p>
      {currentDateTime && <small>{currentDateTime}</small>}
      <div>
        <h4>Ações mais negociadas hoje:</h4>
        <ul>
          {mostTradedStocks.length > 0 ? (
            mostTradedStocks.map((stock, index) => (
              <li key={index}>
                {stock.name}: {stock.volume.toLocaleString()} negociações
              </li>
            ))
          ) : (
            <p>Carregando ações...</p>
          )}
        </ul>
      </div>
    </S.ButtonCotacao>
  );
};

export default ButtonDollar;
