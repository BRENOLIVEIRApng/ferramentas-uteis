/**
 * ============================================================================
 * PROGRESS COMPONENT - FORMATAR CSV TOOL
 * ============================================================================
 * 
 * @file        progress.js
 * @description Componente de barra de progresso para indicar o andamento de tarefas
 *              na parte de formatar o arquivo .csv
 * @author      BRENOLIVEIRApng (Breno Oliveira)
 * @created     09/12/2025
 * @modified    09/12/2025
 * @version     2.0.0
 * 
 * @module      Progress
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
 * ============================================================================
 */

class Progress {
    constructor(element) {
        this.element = typeof element === 'string' ? document.querySelector(element) : element;
        this.bar = this.element?.querySelector('.progress-bar');
    }

    set(percent) {
        if (this.bar) {
            this.bar.style.width = `${Math.min(100, Math.max(0, percent))}%`;
        }
    }

    reset() {
        this.set(0);
    }

    complete() {
        this.set(100);
    }
}

window.Progress = Progress;