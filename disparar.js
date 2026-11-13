async function testar() {
  try {
    const response = await fetch('http://localhost:8083/api/prospectar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: "teste_01",
        nome: "Clinica Exemplo Curitiba",
        telefone: "5541920102238",
        foto_capa: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d",
        subdominio: "clinicaexemplo"
      })
    });
    const texto = await response.text();
    console.log("📥 Resposta Bruta do Servidor Go:", texto);
  } catch (error) {
    console.error("❌ Erro de ligação:", error.message);
  }
}
testar();