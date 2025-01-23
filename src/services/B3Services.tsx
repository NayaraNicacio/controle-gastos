import axios from "axios";

export const getMostTradedStocks = async (): Promise<{ name: string; volume: number }[]> => {
  try {
    const response = await axios.get("https://brapi.dev/api/quote/list");
    const stocks = response.data.stocks;

    // Filtra e ordena por volume negociado em ordem decrescente
    const sortedStocks = stocks
      .filter((stock: any) => stock.volume !== null)
      .sort((a: any, b: any) => b.volume - a.volume);

    // Retorna as 3 mais negociadas
    return sortedStocks.slice(0, 3).map((stock: any) => ({
      name: stock.stock,
      volume: stock.volume,
    }));
  } catch (error) {
    console.error("Erro ao buscar ações mais negociadas:", error);
    return [];
  }
};
