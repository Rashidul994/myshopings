0ltw1import { create } from 'zustand';
import axios from 'axios';

export const useBlockchainStore = create((set) => ({
  wallet: null,
  transactions: [],
  loading: false,

  fetchWallet: async () => {
    set({ loading: true });
    const res = await axios.get('http://localhost:8000/api/wallet', { withCredentials: true });
    set({ wallet: res.data.wallet, loading: false });
  },

  fetchTransactions: async () => {
    const res = await axios.get('http://localhost:8000/api/transactions', { withCredentials: true });
    set({ transactions: res.data });
  },
}));

