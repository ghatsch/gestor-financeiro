'use client'

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import './page.css';
import TitleHeader from "../title";
import Modal from '../modal';

export type Transacao = {
  valor: number;
  descricao: string;
  tipo: 'fixo' | 'variavel';
};

export default function Home() {
  const [modalAberto, setModalAberto] = useState(false);

  // Formulários
  const [formEntrada, setFormEntrada] = useState({ valor: '', descricao: '', tipo: 'fixo' });
  const [formSaida, setFormSaida] = useState({ valor: '', descricao: '', tipo: 'fixo' });

  // Histórico
  const [entradas, setEntradas] = useState<Transacao[]>([]);
  const [saidas, setSaidas] = useState<Transacao[]>([]);

  async function transacaoEntrada() {
    const novaEntrada: Transacao = {
      valor: Number(formEntrada.valor),
      descricao: formEntrada.descricao,
      tipo: formEntrada.tipo as 'fixo' | 'variavel',
    };

    await fetch('/api/entradas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(novaEntrada),
    });

    setEntradas([...entradas, novaEntrada]);
    setFormEntrada({ valor: '', descricao: '', tipo: 'fixo' }); // Limpar formulário
  }

  async function transacaoSaida() {
    const novaSaida: Transacao = {
      valor: Number(formSaida.valor),
      descricao: formSaida.descricao,
      tipo: formSaida.tipo as 'fixo' | 'variavel',
    };

    await fetch('/api/saidas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(novaSaida),
    });

    setSaidas([...saidas, novaSaida]);
    setFormSaida({ valor: '', descricao: '', tipo: 'fixo' }); // Limpar formulário
  }

  return (
    <>
      <TitleHeader title="Bem-vindo ao seu gestor financeiro!" />

      <main id="all">
        <div id="container">
          <div className="around">

            {/* Entradas */}
            <div className="entradas">
              <form className="formularioEntradas">
                <h2 className="subEntradas" id="sub">Entradas</h2>
                <div className="separator"></div>

                <input
                  type="number"
                  name="valorEntrada"
                  value={formEntrada.valor}
                  onChange={(e) => setFormEntrada({ ...formEntrada, valor: e.target.value })}
                  placeholder="Valor recebido (R$)"
                  className="border p-2 rounded inserirEntrada1"
                  required
                />

                <input
                  type="text"
                  name="descricaoEntrada"
                  value={formEntrada.descricao}
                  onChange={(e) => setFormEntrada({ ...formEntrada, descricao: e.target.value })}
                  placeholder="Como foi recebido"
                  className="border p-2 rounded inserirEntrada"
                  required
                />

                <select
                  name="tipoEntrada"
                  className="border p-2 rounded check"
                  value={formEntrada.tipo}
                  onChange={(e) => setFormEntrada({ ...formEntrada, tipo: e.target.value })}
                >
                  <option value="fixo">Fixo</option>
                  <option value="variavel">Variável</option>
                </select>
              </form>
              <div className="btnboxentr btnbox">
                <button onClick={transacaoEntrada} className="box">Enviar para o fluxo de transações</button>
              </div>
            </div>

            {/* Saídas */}
            <div className="saidas">
              <form className="formularioSaidas">
                <h2 className="subSaidas" id="sub">Saídas</h2>
                <div className="separator"></div>

                <input
                  type="number"
                  name="valorSaida"
                  value={formSaida.valor}
                  onChange={(e) => setFormSaida({ ...formSaida, valor: e.target.value })}
                  placeholder="Valor gasto (R$)"
                  className="border p-2 rounded inserirSaida1"
                  required
                />

                <input
                  type="text"
                  name="descricaoSaida"
                  value={formSaida.descricao}
                  onChange={(e) => setFormSaida({ ...formSaida, descricao: e.target.value })}
                  placeholder="Como foi gasto"
                  className="border p-2 rounded inserirSaida"
                  required
                />

                <select
                  name="tipoSaida"
                  className="border p-2 rounded check"
                  value={formSaida.tipo}
                  onChange={(e) => setFormSaida({ ...formSaida, tipo: e.target.value })}
                >
                  <option value="fixo">Fixo</option>
                  <option value="variavel">Variável</option>
                </select>
              </form>
              <div className="btnboxsaid btnbox">
                <button onClick={transacaoSaida} className="box">Enviar para o fluxo de transações</button>
              </div>
            </div>

          </div>
        </div>
      </main>

      <button onClick={() => setModalAberto(true)} className="btnn">Veja a sua realidade financeira aqui</button>
      {modalAberto && (
        <Modal
          onFechar={() => setModalAberto(false)}
          entradas={entradas}
          saidas={saidas}
        />
      )}
    </>
  );
}
