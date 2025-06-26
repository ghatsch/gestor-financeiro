import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
  const body = await request.json();
  const { valor, descricao, tipo } = body;

  if (
    typeof valor !== 'number' ||
    typeof descricao !== 'string' ||
    typeof tipo !== 'boolean'
  ) {
    return NextResponse.json({ error: 'Dados inválidos em entrada' }, { status: 400 });
  }

  return NextResponse.json({
    message: 'Entrada registrada com sucesso',
    data: body,
  });
}


