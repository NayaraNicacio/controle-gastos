import axios from "axios";

/**
 * Serviço para buscar a cotação do dólar em relação ao real (BRL).
 */
export class CotacaoDollar {
  private readonly apiUrl: string;

  constructor() {
    // URL da API de cotação
    this.apiUrl = "https://api.exchangerate-api.com/v4/latest/USD";
  }

  /**
   * Obtém a cotação do dólar em relação ao Real (BRL).
   * @returns Cotação do dólar como número.
   */
  async getDollarRate(): Promise<number> {
    try {
      const response = await axios.get(this.apiUrl);
      const rate = response.data.rates.BRL;

      if (!rate) {
        throw new Error("Cotação do BRL não encontrada.");
      }

      return rate;
    } catch (error) {
      console.error("Erro ao buscar a cotação do dólar:", error);
      throw new Error("Não foi possível obter a cotação do dólar.");
    }
  }
}
