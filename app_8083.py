import json
import os
import re
from datetime import datetime

# --- CONFIGURAÇÕES DE DOMÍNIOS E PASTA ---
DOMINIO_LOCAL = "http://localhost:3000"
DOMINIO_DEGUSTACAO = "https://landing-g67.vercel.app"
DOMINIO_PRODUCAO = "https://meu-site.vercel.app" # Domínio final após o aceite

DIR_BASE = os.path.dirname(os.path.abspath(__file__))
CAMINHO_SRC_DATA = os.path.join(DIR_BASE, "src", "data")
ARQUIVO_MONTANTE = r"D:\geradordesite\google-maps-scraper\reservoir.json"
ARQUIVO_HISTORICO = os.path.join(DIR_BASE, "leads_processados.json")

def gerar_slug(texto):
    """Gera slugs limpos para URLs (ex: 'Clínica Renovar' -> 'clinicarenovar')"""
    texto = texto.lower()
    texto = re.sub(r'[áàãâä]', 'a', texto)
    texto = re.sub(r'[éèêë]', 'e', texto)
    texto = re.sub(r'[íìîï]', 'i', texto)
    texto = re.sub(r'[óòõôö]', 'o', texto)
    texto = re.sub(r'[úùûü]', 'u', texto)
    texto = re.sub(r'[ç]', 'c', texto)
    texto = re.sub(r'[^a-z0-9]', '', texto) # remove caracteres especiais e espaços
    return texto

def carregar_json(caminho):
    if os.path.exists(caminho):
        with open(caminho, 'r', encoding='utf-8') as f:
            return json.load(f)
    return []

def salvar_json(caminho, dados):
    os.makedirs(os.path.dirname(caminho), exist_ok=True)
    with open(caminho, 'w', encoding='utf-8') as f:
        json.dump(dados, f, ensure_ascii=False, indent=2)

def obter_ids_ja_criados():
    """
    Varre a pasta src/data para descobrir quais leads já têm JSON criado
    (inclui os ~21 leads de teste anteriores).
    """
    ids_e_slugs = set()
    if os.path.exists(CAMINHO_SRC_DATA):
        for root, _, files in os.walk(CAMINHO_SRC_DATA):
            for file in files:
                if file.endswith('.json'):
                    slug = file.replace('.json', '')
                    ids_e_slugs.add(slug)
                    
                    # Tenta ler o ID interno do lead no JSON
                    try:
                        caminho_completo = os.path.join(root, file)
                        dado = carregar_json(caminho_completo)
                        lead_id = dado.get("lead", {}).get("id")
                        if lead_id:
                            ids_e_slugs.add(str(lead_id))
                    except Exception:
                        pass
    return ids_e_slugs

def executar_processamento_8083(quantidade_sorteio=15):
    print("=== INICIANDO PROCESSAMENTO DA APLICAÇÃO 8083 ===")
    
    # 1. Carrega o montante de leads brutos
    montante = carregar_json(ARQUIVO_MONTANTE)
    historico = carregar_json(ARQUIVO_HISTORICO)
    
    if not montante:
        print("⚠️ Erro: Nenhum lead encontrado no arquivo do montante.")
        return

    # 2. Identifica quais leads JÁ FORAM CRIADOS (~21 testes + anteriores)
    ja_criados = obter_ids_ja_criados()
    print(f"🔍 Leads/Arquivos já identificados na pasta src/data: {len(ja_criados)}")

    # 3. Purga/Transfere do montante os leads que já foram processados anteriormente
    leads_nao_processados = []
    leads_transferidos_teste = []

    for item in montante:
        lead = item.get("lead", item)
        lead_id = str(lead.get("id", ""))
        slug_temp = gerar_slug(lead.get("nome", ""))

        if lead_id in ja_criados or slug_temp in ja_criados or lead.get("status") == "SITE CRIADO":
            leads_transferidos_teste.append(item)
        else:
            leads_nao_processados.append(item)

    print(f"📊 Total Inicial no Montante: {len(montante)}")
    print(f"🧹 Leads de testes passados transferidos/deduzidos: {len(leads_transferidos_teste)}")
    print(f"✅ Saldo Real Disponível no Montante: {len(leads_nao_processados)}")

    if len(leads_nao_processados) == 0:
        print("⚠️ Não há novos leads para sortear.")
        # Atualiza o montante apenas com os não processados
        salvar_json(ARQUIVO_MONTANTE, leads_nao_processados)
        return

    # 4. Sorteia os próximos 15 leads não processados
    lote_15 = leads_nao_processados[:quantidade_sorteio]
    resto_montante = leads_nao_processados[quantidade_sorteio:]

    print(f"🎲 Sorteando {len(lote_15)} novos leads para criação de site...")

    novos_sites = []

    for item in lote_15:
        lead = item.get("lead", item)
        slug = gerar_slug(lead.get("nome", "cliente"))
        nicho_pasta = item.get("nicho_pasta", "clinicas")
        template = item.get("template", "moderno-urban")

        # Links do Ciclo de Vida do Lead
        url_local = f"{DOMINIO_LOCAL}/{nicho_pasta}/{slug}/{template}"
        url_degustacao = f"{DOMINIO_DEGUSTACAO}/{nicho_pasta}/{slug}/{template}"
        url_producao = f"{DOMINIO_PRODUCAO}/{slug}" # URL final pós-venda

        payload_lead = {
            "enviado_em": datetime.now().isoformat(),
            "lead": {
                "id": lead.get("id"),
                "nome": lead.get("nome"),
                "endereco": lead.get("endereco", ""),
                "telefone": lead.get("telefone", ""),
                "nicho": nicho_pasta,
                "cidade": lead.get("cidade", ""),
                "estado": lead.get("estado", ""),
                "categoria": lead.get("categoria", ""),
                "status": "SITE CRIADO",
                "tem_site": False,
                "website": "",
                "cnpj": lead.get("cnpj", ""),
                "fotos": lead.get("fotos", []),
                "criado_em": lead.get("criado_em", datetime.now().isoformat()),
                "atualizado_em": datetime.now().isoformat(),
                "expira_em": "2026-10-20T23:59:59-03:00",
                "ativo": True
            },
            "nicho_pasta": nicho_pasta,
            "template": template,
            "slug": slug,
            "url_local": url_local,
            "url_demo": url_degustacao,        # Link de Degustação enviado no WhatsApp
            "url_oficial": url_producao       # Link final pós-aceite
        }

        # 5. Grava o JSON em src/data/<nicho>/<slug>.json
        caminho_json_cliente = os.path.join(CAMINHO_SRC_DATA, nicho_pasta, f"{slug}.json")
        salvar_json(caminho_json_cliente, payload_lead)
        novos_sites.append(payload_lead)

        print(f" -> Site Criado: {slug}")
        print(f"    Preview Local: {url_local}")
        print(f"    Degustação:    {url_degustacao}\n")

    # 6. Atualiza os arquivos de saldo
    salvar_json(ARQUIVO_MONTANTE, resto_montante)
    
    # Atualiza o histórico acumulado
    historico.extend(leads_transferidos_teste)
    historico.extend(novos_sites)
    salvar_json(ARQUIVO_HISTORICO, historico)

    print("==================================================")
    print(f"✓ Montante atualizado. Saldo restante: {len(resto_montante)} leads.")
    print(f"✓ Lote de {len(novos_sites)} sites gerados com sucesso na pasta src/data!")

if __name__ == "__main__":
    executar_processamento_8083(quantidade_sorteio=15)