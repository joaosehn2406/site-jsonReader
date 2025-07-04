const BASE_URL =
    'https://bu.furb.br/mcardoso/progWeb/apiRestAval.php/cadastro';

export async function fetchUserById(id) {
    const res = await fetch(`${BASE_URL}/${id}`);
    if (!res.ok) {
        throw new Error('Falha na requisição');
    }

    const text = await res.text();
    if (!text) {
        throw new Error('ID inexistente. Tente novamente.');
    }

    try {
        return JSON.parse(text);
    } catch {
        throw new Error('Resposta da API inválida.');
    }
}

export async function deleteUserById(id) {
    const res = await fetch(`${BASE_URL}/${id}`, {
        method: 'DELETE',
    });
    if (!res.ok) {
        let err;
        try {
            const json = await res.json();
            err = new Error(json.mensagem || 'Erro ao excluir cadastro');
        } catch {
            err = new Error('Erro ao excluir cadastro');
        }
        throw err;
    }
    return res.json();
}

export async function updateUserById(id, data) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      nome: data.nome,
      endereco: data.endereco,
      email: data.email,
      departamento: data.departamento
    })
  });

  if (!res.ok) {
    let err;
    try {
      const json = await res.json();
      err = new Error(json.mensagem || 'Erro ao atualizar cadastro');
    } catch {
      err = new Error('Erro ao atualizar cadastro');
    }
    throw err;
  }

  return true;
}
