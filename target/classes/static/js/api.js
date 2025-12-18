/**
 * ============================================================================
 * API JS CLIENT
 * ============================================================================
 * 
 * @file        api.js
 * @description Módulo para comunicação com a API backend,
 *              incluindo métodos para CPF, datas, CSV e geração de comprovantes.
 * @author      BRENOLIVEIRApng (Breno Oliveira)
 * @created     09/12/2025
 * @modified    18/12/2025
 * @version     2.1.0
 * 
 * @module      ApiClient
 * 
 * @license     MIT
 * @copyright   2025 BRENOLIVEIRApng - Todos os direitos reservados
 * @access      Public
 * 
 * ============================================================================
 * NOTAS:
 * - Este módulo manipula dados localmente sem enviar para servidores externos
 * - Todos os dados são processados no navegador/servidor local
 * - Desenvolvido para auxiliar no trabalho diário com dados sensíveis
 * - Detecta automaticamente ambiente local ou produção (Render)
 * ============================================================================
 */

// Detecta automaticamente o ambiente
const getApiBaseUrl = () => {

    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        return 'http://localhost:8080';
    }

    return 'https://ferramentas-uteis.onrender.com';
};

const API_BASE_URL = getApiBaseUrl();

class ApiClient {
    constructor(baseUrl = API_BASE_URL) {
        this.baseUrl = baseUrl;
        console.log('API Base URL:', this.baseUrl);
    }

    async request(endpoint, options = {}) {
        const url = `${this.baseUrl}${endpoint}`;
        console.log('📡 Request:', url);
        
        const config = {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            ...options
        };

        try {
            const response = await fetch(url, config);

            if (options.responseType === 'blob') {
                return await response.blob();
            }

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Erro na requisição');
            }

            return data;
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }

    async get(endpoint, options = {}) {
        return this.request(endpoint, {
            method: 'GET',
            ...options
        });
    }

    async post(endpoint, body, options = {}) {
        return this.request(endpoint, {
            method: 'POST',
            body: JSON.stringify(body),
            ...options
        });
    }

    async postFile(endpoint, formData, onProgress = null) {
        const url = `${this.baseUrl}${endpoint}`;

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();

            if (onProgress) {
                xhr.upload.addEventListener('progress', (e) => {
                    if (e.lengthComputable) {
                        const percentComplete = (e.loaded / e.total) * 100;
                        onProgress(percentComplete);
                    }
                });
            }

            xhr.addEventListener('load', () => {
                if (xhr.status >= 200 && xhr.status < 300) {
                    try {
                        const data = JSON.parse(xhr.responseText);
                        resolve(data);
                    } catch (e) {
                        reject(new Error('Erro ao processar resposta'));
                    }
                } else {
                    reject(new Error('Erro no upload'));
                }
            });

            xhr.addEventListener('error', () => {
                reject(new Error('Erro de rede'));
            });

            xhr.open('POST', url);
            xhr.send(formData);
        });
    }

    async downloadFile(endpoint, fileName) {
        const url = `${this.baseUrl}${endpoint}`;

        try {
            const response = await fetch(url);
            const blob = await response.blob();

            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(link.href);
        } catch (error) {
            console.error('Download Error:', error);
            throw error;
        }
    }

    cpf = {
        validate: (cpf) => this.post('/cpf/validar', { cpf })
    };

    dates = {
        convert: (datas) => this.post('/datas/converter', { datas })
    };

    csv = {
        process: (file, onProgress) => {
            const formData = new FormData();
            formData.append('file', file);
            return this.postFile('/csv/processar', formData, onProgress);
        },
        download: (fileName) => this.downloadFile(`/csv/download/${fileName}`, fileName)
    };

    comprovante = {
        generate: async (jsonRetorno) => {
            const url = `${this.baseUrl}/comprovante/gerar`;
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ jsonRetorno })
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Erro ao gerar PDF');
            }

            const blob = await response.blob();
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = 'comprovante.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(link.href);
        }
    };
}

const api = new ApiClient();
window.api = api;