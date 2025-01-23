import { CotacaoDollar } from "../../services/CotacaoDollar";
import * as S from "./button-styles";
import { useEffect, useState } from "react";

const ButtonDollar = () => {
  const [dollarRate, setDollarRate] = useState<number | null>(null);
  const [currentDateTime, setCurrentDateTime] = useState<string>("");
  const dollarRateService = new CotacaoDollar();

  useEffect(() => {
    const fetchDollarRate = async () => {
      try {
        const rate = await dollarRateService.getDollarRate();
        setDollarRate(rate);
      } catch (error) {
        console.error("Erro ao buscar a cotação do dólar:", error);
      }
    };

    fetchDollarRate();

    // Atualizar a hora em tempo real
    const updateDateTime = () => {
      const now = new Date();
      const formattedDateTime = now.toLocaleString("pt-BR", {
        dateStyle: "short",
        timeStyle: "medium", // Exibe horas, minutos e segundos
      });
      setCurrentDateTime(formattedDateTime);
    };

    updateDateTime();
    const intervalId = setInterval(updateDateTime, 1000); // Atualiza a cada segundo

    return () => clearInterval(intervalId); // Limpa o intervalo ao desmontar
  }, []);

  return (
    <S.ButtonCotacao bgColor="#9370DB">
      <p>{dollarRate !== null ? `R$ ${dollarRate.toFixed(2)}` : "Carregando..."}</p>
      {currentDateTime && <small>{currentDateTime}</small>}
    </S.ButtonCotacao>
  );
};

export default ButtonDollar;
