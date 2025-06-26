
// modal.tsx
'use client';

import React from "react";
import './modal.css';

export type Transacao = {
  valor: number;
  descricao: string;
  tipo: 'fixo' | 'variavel';
};

type ModalProps = {
  onFechar: () => void;
  entradas: Transacao[];
  saidas: Transacao[];
};

export default function Modal({ onFechar, entradas, saidas }: ModalProps) {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2 id="cabeca">Resumo Financeiro</h2>
        <div className="conteudo">
          <header className="modal-cabeca">
            <button onClick={onFechar} className="fechar">x</button>
          </header>

          <div className="corpo-modal">
            <div className="section">
              <h3 className="subtitleh3">Entradas</h3>
              <ul>
                {entradas.map((e, index) => (
                  <li key={index}>
                    {e.descricao}: R$ {e.valor.toFixed(2)} ({e.tipo})
                  </li>
                ))}
              </ul>
            </div>

            <div className="section">
              <h3 className="subtitleh3">Saídas</h3>
              <ul>
                {saidas.map((s, index) => (
                  <li key={index}>
                    {s.descricao}: R$ {s.valor.toFixed(2)} ({s.tipo})
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
