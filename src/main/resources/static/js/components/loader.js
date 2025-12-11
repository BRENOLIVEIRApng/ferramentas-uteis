/**
 * ============================================================================
 * LOADER COMPONENT - INDICADOR DE CARREGAMENTO
 * ============================================================================
 * 
 * @file        loader.js
 * @description Componente Loader para indicar carregamento de dados ou processos
 * @author      BRENOLIVEIRApng (Breno Oliveira)
 * @created     09/12/2025
 * @modified    09/12/2025
 * @version     2.0.0
 * 
 * @module      Loader
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

class Loader {
    show(element) {
        if (typeof element === 'string') {
            element = document.querySelector(element);
        }
        if (element) {
            element.classList.add('active');
        }
    }

    hide(element) {
        if (typeof element === 'string') {
            element = document.querySelector(element);
        }
        if (element) {
            element.classList.remove('active');
        }
    }

    toggle(element) {
        if (typeof element === 'string') {
            element = document.querySelector(element);
        }
        if (element) {
            element.classList.toggle('active');
        }
    }
}

const loader = new Loader();
window.loader = loader;