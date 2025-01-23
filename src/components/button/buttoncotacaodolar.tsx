import { CotacaoDollar } from "../../services/CotacaoDollar";
import { ButtonCotacao } from "./button-styles";
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
        const now = new Date();
        const formattedDateTime = now.toLocaleString("pt-BR", {
          dateStyle: "short",
          timeStyle: "short",
        });
        setCurrentDateTime(formattedDateTime);
      } catch (error) {
        console.error("Erro ao buscar a cotação do dólar:", error);
      }
    };

    fetchDollarRate();
  }, []);

  return (
    <S.ButtonCotacao bgColor="#9370DB">
      <p>
        {dollarRate !== null ? `R$ ${dollarRate.toFixed(2)}` : "Carregando..."}
      </p>
      {currentDateTime && <small>{currentDateTime}</small>}
    </S.ButtonCotacao>
  );
};

export default ButtonDollar;
