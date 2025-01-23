import { CotacaoDollar } from "../../services/CotacaoDollar";
import { getMostTradedStocks } from "../../services/B3Services";
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
        timeStyle: "long", // Alterado para 'long' para mostrar a hora completa
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
      <div style={{ textAlign: "center", color: "#FFF" }}>
        {currentDateTime && dollarRate !== null && (
          <table style={{ width: "100%", color: "#FFF", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ borderBottom: "2px solid #FFF", padding: "8px" }}>Dólar: R$ {dollarRate.toFixed(2)}</th>
                <th style={{ borderBottom: "2px solid #FFF", padding: "8px" }}>
                  {currentDateTime}
                </th>
              </tr>
              <tr>
                <th style={{ borderBottom: "2px solid #FFF", padding: "8px" }}>Ação</th>
                <th style={{ borderBottom: "2px solid #FFF", padding: "8px" }}>Volume Negociado</th>
              </tr>
            </thead>
            <tbody>
              {mostTradedStocks.length > 0 ? (
                mostTradedStocks.map((stock, index) => (
                  <tr key={index}>
                    <td style={{ padding: "8px", textAlign: "left" }}>{stock.name}</td>
                    <td style={{ padding: "8px", textAlign: "right" }}>
                      {stock.volume.toLocaleString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={2} style={{ padding: "8px", textAlign: "center" }}>
                    Carregando ações...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </S.ButtonCotacao>
  );
};

export default ButtonDollar;
