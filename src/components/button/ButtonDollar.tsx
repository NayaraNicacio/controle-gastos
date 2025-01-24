import { CotacaoDollar } from "../../services/CotacaoDollar";
import { getMostTradedStocks } from "../../services/B3Services";
import { useEffect, useState } from "react";
import * as S from "./button-styles";

const ButtonDollar = () => {
  const [dollarRate, setDollarRate] = useState<number | null>(null);
  const [currentDateTime, setCurrentDateTime] = useState<string>("");
  const [mostTradedStocks, setMostTradedStocks] = useState<{ name: string; volume: number }[]>([]);

  const dollarRateService = new CotacaoDollar();

  const getOrdinal = (n: number) => {
    const suffixes = ["th", "st", "nd", "rd"];
    const value = n % 100;
    return n + (suffixes[(value - 20) % 10] || suffixes[value] || suffixes[0]);
  };

  useEffect(() => {
    const fetchFinancialData = async () => {
      try {
        // Busca a cotação do dólar
        const rate = await dollarRateService.getDollarRate();
        setDollarRate(rate);

        // Busca as ações mais negociadas
        const stocks = await getMostTradedStocks();
        
        // Ordena as ações por volume negociado em ordem decrescente
        const sortedStocks = stocks.sort((a, b) => b.volume - a.volume);
        setMostTradedStocks(sortedStocks);
      } catch (error) {
        console.error("Erro ao buscar dados financeiros:", error);
      }
    };

    // Atualiza a hora
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
    const intervalId = setInterval(updateDateTime, 1000); // Atualiza a cada segundo

    return () => clearInterval(intervalId); // Limpa o intervalo ao desmontar
  }, []);

  return (
    <div>
      {currentDateTime && dollarRate !== null && (
        <div>
           <S.TableTitleH3>Dólar Hoje: R$ {dollarRate.toFixed(2)}</S.TableTitleH3>
          <S.TableContainer>
            <S.TableTitle>Principais Ações Negociadas</S.TableTitle>
            <S.StyledTable>
              <thead>
                <tr>
                  <S.ThTd>Posição</S.ThTd>
                  <S.ThTd>Ações</S.ThTd>
                  <S.ThTd>Volume</S.ThTd>
                </tr>
              </thead>
              <tbody>
                {mostTradedStocks.length > 0 ? (
                  mostTradedStocks.map((stock, index) => (
                    <tr key={index}>
                      <S.Td>{getOrdinal(index + 1)}</S.Td> {/* Número ordinal */}
                      <S.Td>{stock.name}</S.Td>
                      <S.Td>{stock.volume.toLocaleString()}</S.Td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="loading">
                      Carregando ações...
                    </td>
                  </tr>
                )}
              </tbody>
            </S.StyledTable>
          </S.TableContainer>
        </div>
      )}
    </div>
  );
};

export default ButtonDollar;
