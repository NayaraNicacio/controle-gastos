import { CotacaoDollar } from "../../services/CotacaoDollar";
import { getMostTradedStocks } from "../../services/B3Services";
import * as S from "./button-styles";
import { useEffect, useState } from "react";

const ButtonDollar = () => {
  const [mostTradedStocks, setMostTradedStocks] = useState<{ name: string; volume: number }[]>([]);

  const dollarRateService = new CotacaoDollar();

  useEffect(() => {
    const fetchFinancialData = async () => {
      try {
        // Busca as ações mais negociadas
        const stocks = await getMostTradedStocks();
        setMostTradedStocks(stocks);
      } catch (error) {
        console.error("Erro ao buscar dados financeiros:", error);
      }
    };

    fetchFinancialData();
  }, []);

  return (
    <S.ButtonCotacao bgColor="#9370DB">
      <div style={{ textAlign: "center", color: "#FFF" }}>
        {mostTradedStocks.length > 0 ? (
          <table style={{ width: "100%", color: "#FFF", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ borderBottom: "2px solid #FFF", padding: "8px" }}>Ação</th>
                <th style={{ borderBottom: "2px solid #FFF", padding: "8px" }}>Volume Negociado</th>
              </tr>
            </thead>
            <tbody>
              {mostTradedStocks.map((stock, index) => (
                <tr key={index}>
                  <td style={{ padding: "8px", textAlign: "left" }}>{stock.name}</td>
                  <td style={{ padding: "8px", textAlign: "right" }}>
                    {stock.volume.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Carregando ações...</p>
        )}
      </div>
    </S.ButtonCotacao>
  );
};

export default ButtonDollar;
