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
      {currentDateTime && <p><strong>{currentDateTime}</strong></p>}
      <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "10px" }}>
        <thead>
          <tr style={{ backgroundColor: "#D8BFD8", color: "#333" }}>
            <th style={{ padding: "10px", border: "1px solid #ccc" }}>Informação</th>
            <th style={{ padding: "10px", border: "1px solid #ccc" }}>Detalhes</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ backgroundColor: "#F3E5F5" }}>
            <td colSpan={2} style={{ textAlign: "center", padding: "10px", border: "1px solid #ccc" }}>
              {dollarRate !== null ? `Dólar: R$ ${dollarRate.toFixed(2)}` : "Carregando cotação do dólar..."}
            </td>
          </tr>
          {mostTradedStocks.length > 0 ? (
            mostTradedStocks.map((stock, index) => (
              <tr key={index} style={{ backgroundColor: index % 2 === 0 ? "#EDE7F6" : "#FFF" }}>
                <td style={{ padding: "10px", border: "1px solid #ccc" }}>{stock.name}</td>
                <td style={{ padding: "10px", border: "1px solid #ccc" }}>{stock.volume.toLocaleString()} negociações</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={2} style={{ textAlign: "center", padding: "10px", border: "1px solid #ccc" }}>
                Carregando ações mais negociadas...
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </S.ButtonCotacao>
  );
};

export default ButtonDollar;

