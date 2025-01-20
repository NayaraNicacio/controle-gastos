// 
import { useEffect, useState } from "react";
import * as S from "../styles";
import { FetchDespesas } from "../../application/useCases/FetchDespesas";
import { FetchDollarRate } from "../../application/useCases/FetchDollarRate";
import { DespesasRepositoryImpl } from "../../infrastructure/repositories/DespesasRepositoryImpl";
import { DollarRateServiceImpl } from "../../infrastructure/services/DollarRateServiceImpl";
import { Despesa } from "../../domain/entities/Despesa";

const Dashboard = () => {
  const [despesas, setDespesas] = useState<Despesa[]>([]);
  const [dollarRate, setDollarRate] = useState<number | null>(null);

  const despesasRepository = new DespesasRepositoryImpl();
  const dollarRateService = new DollarRateServiceImpl();

  const fetchDespesasUseCase = new FetchDespesas(despesasRepository);
  const fetchDollarRateUseCase = new FetchDollarRate(dollarRateService);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = "user-id-exemplo"; // Substituir pelo ID real do usuário
        const despesas = await fetchDespesasUseCase.execute(userId);
        setDespesas(despesas);

        const rate = await fetchDollarRateUseCase.execute();
        setDollarRate(rate);
      } catch (error) {
        console.error("Erro ao carregar dados:", error);
      }
    };

    fetchData();
  }, []);

  const calcularTotais = () => {
    const entradas = despesas
      .filter((d) => d.tipo === "entrada")
      .reduce((acc, d) => acc + d.valor, 0);

    const saidas = despesas
      .filter((d) => d.tipo === "saída")
      .reduce((acc, d) => acc + d.valor, 0);

    return { entradas, saidas, saldo: entradas - saidas };
  };

  const { entradas, saidas, saldo } = calcularTotais();

  return (
    <S.TableContainer>
      <S.Title>Dashboard de Finanças</S.Title>
      <S.CardsContainer>
        <S.Card bgColor="#FF8C00">
          <p>Entradas</p>
          <p>R$ {entradas.toFixed(2)}</p>
        </S.Card>
        <S.Card bgColor="#B22222">
          <p>Saídas</p>
          <p>R$ {saidas.toFixed(2)}</p>
        </S.Card>
        <S.Card bgColor="#006400">
          <p>Saldo</p>
          <p>R$ {saldo.toFixed(2)}</p>
        </S.Card>
        <S.Card bgColor="#FFC333">
          <h1>Dólar Hoje</h1>
          <p>{dollarRate ? `R$ ${dollarRate.toFixed(2)}` : "Carregando..."}</p>
        </S.Card>
      </S.CardsContainer>
    </S.TableContainer>
  );
};

export default Dashboard;