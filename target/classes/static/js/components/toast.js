/**
 * ============================================================================
 * TOAST NOTIFICATIONS - NOTIFICAÇÕES FLUTUANTES
 * ============================================================================
 * 
 * @file        toast.js
 * @description Sistema de notificações toast não-intrusivas para feedback
 *              visual ao usuário (sucesso, erro, aviso, informação).
 * 
 * @author      BRENOLIVEIRApng (Breno Oliveira)
 * @created     09/12/2025
 * @modified    09/12/2025
 * @version     2.0.0
 * 
 * @class       Toast
 * 
 * @license     MIT
 * @copyright   2025 BRENOLIVEIRApng - Todos os direitos reservados
 * @access      Public
 * 
 * 
 * ============================================================================
 * TIPOS DE TOAST:
 * - toast.success()  - Notificação de sucesso (verde)
 * - toast.error()    - Notificação de erro (vermelho)
 * - toast.warning()  - Notificação de aviso (amarelo)
 * - toast.info()     - Notificação informativa (azul)
 * 
 * EXEMPLOS:
 * toast.success('Operação concluída!', 3000);
 * toast.error('Erro ao processar dados');
 * toast.warning('Atenção: arquivo muito grande');
 * toast.info('Carregando dados...');
 * ============================================================================
 */

class Toast {
    constructor() {
        this.container = this.createContainer();
    }

    createContainer() {
        let container = document.querySelector('.toast-container');
        if (!container) {
            container = document.createElement('div');
            container.className = 'toast-container';
            document.body.appendChild(container);
        }
        return container;
    }

    show(message, type = 'info', duration = 3000) {
        const toast = this.createToast(message, type);
        this.container.appendChild(toast);

        setTimeout(() => {
            this.hide(toast);
        }, duration);
    }

    createToast(message, type) {
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;

        const icon = this.getIcon(type);

        toast.innerHTML = `
            <div class="toast-icon">${icon}</div>
            <div class="toast-content">
                <div class="toast-title">${this.getTitle(type)}</div>
                <div class="toast-message">${message}</div>
            </div>
            <button class="toast-close" onclick="window.toast.hide(this.parentElement)">×</button>
        `;

        return toast;
    }

    getIcon(type) {
        const icons = {
            success: '✓',
            error: '✗',
            warning: '⚠',
            info: 'ℹ'
        };
        return icons[type] || icons.info;
    }

    getTitle(type) {
        const titles = {
            success: 'Sucesso',
            error: 'Erro',
            warning: 'Atenção',
            info: 'Informação'
        };
        return titles[type] || titles.info;
    }

    hide(toast) {
        toast.classList.add('hiding');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }

    success(message, duration) {
        this.show(message, 'success', duration);
    }

    error(message, duration) {
        this.show(message, 'error', duration);
    }

    warning(message, duration) {
        this.show(message, 'warning', duration);
    }

    info(message, duration) {
        this.show(message, 'info', duration);
    }
}

const toast = new Toast();
window.toast = toast;