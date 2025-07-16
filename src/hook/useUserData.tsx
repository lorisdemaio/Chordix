import { useEffect, useState } from 'react';

interface UserData {
  nome?: string;
  indirizzo?: string;
  città?: string;
  metodoPagamento?: string;
  idUtente?: string;
  ruolo?: string;
}

export function useUserData(): [UserData, (key: keyof UserData, value: string) => void] {
  const [userData, setUserData] = useState<UserData>({});

  useEffect(() => {
    const nome = localStorage.getItem('nome') || undefined;
    const indirizzo = localStorage.getItem('indirizzo') || undefined;
    const città = localStorage.getItem('città') || undefined;
    const metodoPagamento = localStorage.getItem('metodo_pagamento') || undefined;
    const idUtente = localStorage.getItem('id') || undefined;
    const ruolo = localStorage.getItem('ruolo') || undefined;

    setUserData({ nome, indirizzo, città, metodoPagamento, idUtente, ruolo });
  }, []);

  const setUserDataValue = (key: keyof UserData, value: string) => {
    const storageKeyMap: Record<keyof UserData, string> = {
      nome: 'nome',
      indirizzo: 'indirizzo',
      città: 'città',
      metodoPagamento: 'metodo_pagamento',
      idUtente: 'id',
      ruolo: 'ruolo'
    };

    localStorage.setItem(storageKeyMap[key], value);
    setUserData(prev => ({ ...prev, [key]: value }));
  };

  return [userData, setUserDataValue];
}