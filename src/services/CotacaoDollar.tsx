// src/infrastructure/services/DollarRateServiceImpl.ts
import axios from "axios";


export class CotacaoDollar implements DollarRateService {
  private readonly apiUrl: string;

  constructor() {
    this.apiUrl = "https://api.exchangerate-api.com/v4/latest/USD"; // URL da API
  }

  /**
   * Busca a cotação do dólar em relação ao Real (BRL).
   * @returns Cotação do dólar como número.
   */
  async getDollarRate(): Promise<number> {
    try {
      const response = await axios.get(this.apiUrl);
      const rate = response.data.rates.BRL;
      if (!rate) throw
